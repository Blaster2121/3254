import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { chromium } from 'playwright'
import { exec as _exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs'
import os from 'os'
import path from 'path'

const exec = promisify(_exec)

// Ensure Playwright installs browsers locally to the project
process.env.PLAYWRIGHT_BROWSERS_PATH = process.env.PLAYWRIGHT_BROWSERS_PATH || '0'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: '1mb' }))

const PORT = process.env.PORT || 4000
const POE_COOKIE_STRING = process.env.POE_COOKIE_STRING || ''
const POE_BOT_PATH = process.env.POE_BOT_PATH || '/Doccie'
const POE_URL = `https://poe.com${POE_BOT_PATH}`

if (!POE_COOKIE_STRING) {
  console.warn('Warning: POE_COOKIE_STRING is not set. Backend will not be able to login to Poe.')
}

// Track active requests to prevent duplicates
const activeRequests = new Set()

app.post('/api/poe/ask', async (req, res) => {
  const { message, timeoutMs = 60000, botPath } = req.body || {}
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'message is required' })
  }

  // Prevent duplicate requests
  const requestId = `${Date.now()}-${Math.random()}`
  if (activeRequests.size > 0) {
    return res.status(429).json({ error: 'Request already in progress' })
  }
  activeRequests.add(requestId)

  const targetUrl = `https://poe.com${botPath || POE_BOT_PATH}`

  let browser
  try {
    // Try launching; if binaries are missing, install and retry once
    try {
      browser = await chromium.launch({ headless: true })
    } catch (e) {
      const msg = (e && e.message) || ''
      if (msg.includes('Executable') || msg.includes('playwright install')) {
        console.warn('[POE] Browser missing, installing Chromium via Playwright...')
        try {
          await exec('npx --yes playwright install chromium')
        } catch (installErr) {
          console.error('[POE] Playwright install failed:', installErr)
        }
        browser = await chromium.launch({ headless: true })
      } else {
        throw e
      }
    }
    const context = await browser.newContext()
    // Prefer header cookies over env cookies
    const headerCookieString = typeof req.headers['x-poe-cookies'] === 'string' ? req.headers['x-poe-cookies'] : ''
    const cookieSource = headerCookieString && headerCookieString.trim().length ? headerCookieString : POE_COOKIE_STRING
    const cookies = cookieSource.split(';').map(p => p.trim()).filter(Boolean)
    if (cookies.length) {
      await context.addCookies(cookies.map(c => {
        const [name, ...rest] = c.split('=')
        return {
          name,
          value: rest.join('='),
          domain: 'poe.com',
          path: '/',
          httpOnly: false,
          secure: true
        }
      }))
    }

    const page = await context.newPage()
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 45000 })
    console.log('[POE] Page loaded')

    // Wait for input area; Poe often uses a textarea for chat input
    const composerSelectors = [
      '[data-testid="ChatComposer"] textarea',
      '[data-testid="ChatComposer"] div[contenteditable="true"]',
      'textarea[placeholder*="message" i]',
      'textarea',
      'div[contenteditable="true"]'
    ]
    const inputSelector = composerSelectors.join(', ')
    await page.waitForSelector(inputSelector, { timeout: 30000 })
    console.log('[POE] Input detected')

    // Type the message
    // Prefer programmatic value set to ensure Poe detects the input event
    let inputMethod = 'programmatic'
    const filled = await page.evaluate((args) => {
      const { selectors, msg } = args
      const dispatch = (el) => {
        el.dispatchEvent(new Event('input', { bubbles: true }))
        el.dispatchEvent(new Event('change', { bubbles: true }))
      }
      for (const sel of selectors) {
        const el = document.querySelector(sel)
        if (!el) continue
        if (el.tagName === 'TEXTAREA') {
          el.value = msg
          dispatch(el)
          el.focus()
          return 'textarea'
        }
        if (el.getAttribute('contenteditable') === 'true') {
          el.focus()
          const range = document.createRange()
          range.selectNodeContents(el)
          range.collapse(false)
          const selObj = window.getSelection()
          selObj.removeAllRanges()
          selObj.addRange(range)
          el.textContent = msg
          dispatch(el)
          return 'contenteditable'
        }
      }
      return null
    }, { selectors: composerSelectors, msg: message })

    if (!filled) {
      // Fallback to type
      inputMethod = 'keyboard'
      await page.focus('textarea').catch(async () => {
        await page.focus('div[contenteditable="true"]')
      })
      await page.keyboard.type(message)
    } else {
      inputMethod = filled
    }
    console.log('[POE] Typed message via:', inputMethod)

    // Press Enter to send (Shift+Enter usually inserts newline; Enter sends)
    await page.keyboard.press('Enter').catch(() => {})
    
    // Wait a moment to see if Enter worked
    await page.waitForTimeout(1000)
    
    // Check if message was sent by looking for the message in the chat
    const messageSent = await page.evaluate((msg) => {
      const allText = document.body.textContent || ''
      return allText.includes(msg.trim())
    }, message)
    
    // Only try clicking send button if Enter didn't work
    if (!messageSent) {
      console.log('[POE] Enter didn\'t work, trying send button...')
      const sendButtonSelectors = [
        '[data-testid="send_button"]',
        'button[type="submit"]',
        'button[aria-label*="send" i]',
        'button:has(svg)'
      ]
      for (const sel of sendButtonSelectors) {
        const btn = await page.$(sel)
        if (btn) {
          await btn.click().catch(() => {})
          break
        }
      }
    } else {
      console.log('[POE] Message sent successfully via Enter key')
    }

    // Clear the input field to prevent duplicate sends
    await page.evaluate(() => {
      const textarea = document.querySelector('textarea')
      const contentEditable = document.querySelector('div[contenteditable="true"]')
      if (textarea) {
        textarea.value = ''
        textarea.dispatchEvent(new Event('input', { bubbles: true }))
      }
      if (contentEditable) {
        contentEditable.textContent = ''
        contentEditable.dispatchEvent(new Event('input', { bubbles: true }))
      }
    })

    // Wait for message to be sent and processed
    await page.waitForTimeout(3000)

    // Wait for bot reply to appear (no web HTML dumps)
    await page.waitForTimeout(3000)

    // Extract latest bot response; prefer markdown container text
    const { chatText, markdownText: doccieMarkdown } = await page.evaluate((userMessage) => {
      const userMsg = (userMessage || '').toString().trim().toLowerCase()
      // Chatbot latest message from main chat stream
      const chatSelectors = [
        '.ChatMessage_chatMessage__xkgHx',
        '.ChatMessage_messageRow__DHlnq',
        '.ChatMessage_messageWrapper__4Ugd6'
      ]
      let chat = ''
      for (const sel of chatSelectors) {
        const els = Array.from(document.querySelectorAll(sel))
        for (let i = els.length - 1; i >= 0; i--) {
          const t = (els[i].textContent || '').trim()
          if (t && !t.toLowerCase().includes(userMsg)) { chat = t; break }
        }
        if (chat) break
      }
      // Analysis markdown from sidebar preview (first is latest)
      const preview = document.querySelector('.ChatHistoryListItem_previewText__onOvU.ChatHistoryListItem_textOverflow__vMchf.ChatHistoryListItem_seenPreviewText__TSd4u')
      const md = preview && preview.textContent ? preview.textContent.trim() : ''
      return { chatText: chat, markdownText: md }
    }, message)
    
    console.log('[POE] Extracted chat text length:', chatText?.length || 0)
    if (chatText) {
      console.log('[POE] Extracted chat text preview:', chatText.substring(0, 200) + (chatText.length > 200 ? '...' : ''))
    } else if (doccieMarkdown) {
      console.log('[POE] Extracted markdown preview:', (doccieMarkdown || '').substring(0, 200))
    } else {
      console.log('[POE] No response content found')
    }
    
    // Clean markdown
    const cleanMarkdown = (md) => {
      if (!md) return md
      let out = md
      out = out.replace(/^\s*Doccie:\s*/i, '')
      out = out.replace(/^\s*\[doc_\d+\]:\s*https?:\/\/poe\.com\/citation\?[^\n]*citation=\d+\s*$/gmi, '')
      out = out.replace(/\n{3,}/g, '\n\n')
      return out.trim()
    }

    const cleaned = cleanMarkdown(doccieMarkdown || '')
    const reply = chatText || cleaned || 'No response content found'

    res.json({ message: reply, markdown: cleaned })
  } catch (err) {
    console.error('Poe automation error:', err)
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' })
  } finally {
    // Clean up
    activeRequests.delete(requestId)
    if (browser) {
      await browser.close().catch(() => {})
    }
  }
})

app.get('/health', (_req, res) => res.json({ ok: true }))

// Compile LaTeX to PDF and stream it back without persisting
app.post('/api/pdf/generate', async (req, res) => {
  const { latex, filename = 'Tenancy_Agreement' } = req.body || {}
  if (!latex || typeof latex !== 'string') {
    return res.status(400).json({ error: 'latex is required' })
  }
  const tmpDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'latex-'))
  const texPath = path.join(tmpDir, `${filename}.tex`)
  const pdfPath = path.join(tmpDir, `${filename}.pdf`)
  try {
    await fs.promises.writeFile(texPath, latex, 'utf8')
    await exec(`pdflatex -interaction=nonstopmode -halt-on-error -output-directory ${tmpDir} ${texPath}`)
    const pdf = await fs.promises.readFile(pdfPath)
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="${filename}.pdf"`)
    res.send(pdf)
  } catch (e) {
    console.error('[PDF] Error:', e)
    res.status(500).json({ error: e instanceof Error ? e.message : 'Unknown error' })
  } finally {
    // Best-effort cleanup
    try { await fs.promises.rm(tmpDir, { recursive: true, force: true }) } catch {}
  }
})

// Lightweight auth status endpoint for frontend
app.get('/api/poe/status', (req, res) => {
  const headerCookies = req.headers['x-poe-cookies']
  if (typeof headerCookies === 'string' && headerCookies.trim().length > 0) {
    return res.json({ authenticated: true, loginInProgress: false, source: 'session' })
  }
  if (POE_COOKIE_STRING && POE_COOKIE_STRING.trim().length > 0) {
    return res.json({ authenticated: true, loginInProgress: false, source: 'environment' })
  }
  return res.json({ authenticated: false, loginInProgress: false, source: 'none' })
})

app.listen(PORT, () => {
  console.log(`Poe backend listening on port ${PORT}. Target bot: ${POE_URL}`)
})


