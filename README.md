# Law.Docx - Legal Tools Application

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
   cd path/to/3254
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```
or 
   ```bash
   rm -rf 3254
git clone https://github.com/Blaster2121/3254.git
cd 3254
npm install
npm start
```

## 🖥️ Backend Server Setup

The backend server handles POE bot integration and must be running for the legal chat functionality to work.

1. **Navigate to the server directory**:
   ```bash
   cd server
   ```

2. **Install backend dependencies**:
   ```bash
   npm install
   ```
   
   **Note**: This will automatically install Playwright browsers during the postinstall step, which may take a few minutes.

3. **Set up environment variables**:
   
   Create a `.env` file in the `server` directory:
   ```bash
   touch .env
   ```
   
   Add the following environment variables to `.env`:
   ```env
   PORT=4000
   POE_COOKIE_STRING=your_poe_cookie_string_here
   POE_BOT_PATH=/Doccie
   ```
   
   **Important**: 
   - `POE_COOKIE_STRING` is required for the backend to authenticate with Poe. You can get this from your browser's cookies when logged into poe.com.
   - `PORT` is optional (defaults to 4000 if not specified)
   - `POE_BOT_PATH` is optional (defaults to `/Doccie` if not specified)

4. **Start the backend server**:
   ```bash
   npm start
   ```
   
   Or for development mode:
   ```bash
   npm run dev
   ```
   
   The server will start on `http://localhost:4000` by default.

5. **Verify the backend is running**:
   - You should see console output indicating the server is listening on port 4000
   - If `POE_COOKIE_STRING` is not set, you'll see a warning message, but the server will still start

**Note**: Both the frontend (port 3000) and backend (port 4000) servers need to be running simultaneously for the full application to work.

## 🔗 External Resources

- **POE Bot for Lease Analysis**: [https://poe.com/Lease_Risks](https://poe.com/Lease_Risks)
- **Hong Kong CLIC Templates**: [https://www.clic.org.hk/](https://www.clic.org.hk/)
- **Node.js Documentation**: [https://nodejs.org/docs/](https://nodejs.org/docs/)

---

**Happy Legal Document Processing! 📄⚖️**
