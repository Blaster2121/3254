# DocuSign - Legal Tools Application

A comprehensive legal tools application featuring lease generation and legal chat functionality with PDF upload capabilities.

## 🚀 Features

### For Landlords (Lease Generation)
- **Hong Kong Tenancy Agreement Generator**: Create professional lease agreements based on CLIC templates
- **Interactive Form**: Step-by-step form to fill in all required lease details
- **PDF Export**: Generate downloadable PDF lease agreements
- **Template Compliance**: Based on official Hong Kong tenancy agreement standards

### For Tenants (Legal Chat)
- **PDF Upload**: Upload lease documents for viewing and analysis
- **Legal Chat Interface**: Ask legal questions and get responses
- **POE Bot Integration**: Connect to specialized lease risk analysis bot
- **Document Viewer**: Clean PDF display without cluttered analysis

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)

## 🔧 Installation & Setup

### Method 1: Clone from GitHub (Recommended)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Blaster2121/3254.git
   cd 3254
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

### Method 2: Download ZIP File

1. **Download the project**:
   - Go to the GitHub repository
   - Click the green "Code" button
   - Select "Download ZIP"
   - Extract the ZIP file to your desired location

2. **Open terminal/command prompt** and navigate to the project folder:
   ```bash
   cd path/to/legal-tools
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```

## 🎯 How to Use

### For Landlords - Lease Generation

1. **Access Lease Generation**:
   - Open the application in your browser
   - Click "Landlord (Lease Generation)" button

2. **Fill Out the Form**:
   - Complete all required fields step by step
   - Navigate through sections using "Next" and "Previous" buttons
   - Add additional terms in Section 9 if needed

3. **Generate PDF**:
   - Click "Generate Lease" after completing all sections
   - The PDF will automatically download to your computer

### For Tenants - Legal Chat & PDF Analysis

1. **Access Legal Chat**:
   - Click "Tenant (Legal Chat)" button
   - You'll see the chat interface on the left and results panel on the right

2. **Upload Lease Documents**:
   - Click "📄 Upload Lease PDF" button
   - Select your lease document
   - The PDF will appear in the results panel on the right

3. **Get Risk Analysis**:
   - After uploading, you'll receive a message with a link to our specialized POE bot
   - Visit [https://poe.com/Lease_Risks](https://poe.com/Lease_Risks) for detailed risk analysis

4. **Ask Legal Questions**:
   - Type your legal questions in the chat input
   - Get responses and analysis in the results panel

## 🔧 Configuration (Optional)

### POE Bot Integration

To connect your own POE bot for enhanced legal chat:

1. **Create a `.env` file** in the project root:
   ```bash
   REACT_APP_POE_API_URL=https://poe.com/your-bot-name
   REACT_APP_POE_API_KEY=your-api-key
   REACT_APP_POE_BOT_ID=your-bot-id
   ```

2. **Restart the development server**:
   ```bash
   npm start
   ```

## 🛠️ Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## 📁 Project Structure

```
legal-tools/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   ├── pdf.worker.min.js    # PDF.js worker file
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── ChatPanel/       # Legal chat interface
│   │   ├── ResultsPanel/    # Analysis results display
│   │   └── LeaseForm/       # Lease generation form
│   ├── hooks/
│   │   └── useChat.ts       # Chat state management
│   ├── services/
│   │   ├── clicTemplate.ts  # Lease template definitions
│   │   ├── clicPdfGenerator.ts # PDF generation
│   │   ├── pdfService.ts    # PDF text extraction
│   │   └── poeService.ts    # POE bot integration
│   ├── types/
│   │   └── index.ts         # TypeScript type definitions
│   ├── App.tsx              # Main application component
│   └── index.tsx            # Application entry point
├── .env                     # Environment variables (create this)
├── package.json
└── README.md
```

## 🐛 Troubleshooting

### Common Issues

1. **"Something is already running on port 3000"**:
   ```bash
   # Kill existing processes on port 3000
   lsof -ti:3000 | xargs kill -9
   # Then restart
   npm start
   ```

2. **PDF upload not working**:
   - Ensure you're uploading a valid PDF file
   - Check browser console for any error messages
   - Verify the `pdf.worker.min.js` file exists in the `public` folder

3. **Build errors**:
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm start
   ```

4. **POE integration not working**:
   - Check that your `.env` file is properly formatted
   - Ensure environment variables don't have leading spaces
   - Restart the development server after making changes

### Browser Compatibility

- **Chrome** (recommended)
- **Firefox**
- **Safari**
- **Edge**

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Search existing GitHub issues
3. Create a new issue with detailed information about your problem

## 🔗 External Resources

- **POE Bot for Lease Analysis**: [https://poe.com/Lease_Risks](https://poe.com/Lease_Risks)
- **Hong Kong CLIC Templates**: [https://www.clic.org.hk/](https://www.clic.org.hk/)
- **Node.js Documentation**: [https://nodejs.org/docs/](https://nodejs.org/docs/)

---

**Happy Legal Document Processing! 📄⚖️**
