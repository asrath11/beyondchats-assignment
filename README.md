# BeyondChats - Full Stack Web Developer Assignment

## 🎯 Overview

This project implements a complete article enhancement platform with AI-powered content improvement. The system consists of three main components:

1. **Backend API** - Node.js CRUD API for article management
2. **Automation Script** - Node.js script that enhances articles using Google search and AI
3. **Frontend** - ReactJS application to display original and enhanced articles

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend    │    │   Automation     │    │    Backend     │
│    (React)    │◄──►│    (Node.js)    │◄──►│  (Laravel/Node) │
│               │    │                 │    │               │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Data Flow

1. **Backend** stores articles in database and provides CRUD APIs
2. **Automation** fetches articles → searches Google → scrapes content → enhances with AI → updates articles
3. **Frontend** displays articles with comparison between original and enhanced versions

## 📁 Project Structure

```
beyondchats-assignment/
├── backend/                 # Laravel/Node.js API
│   ├── controllers/         # Article controllers
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   └── scraper/           # Web scraping utilities
├── automation/             # Node.js enhancement script
│   ├── src/
│   │   ├── services/       # Google search, LLM, API services
│   │   └── scraper/       # Content scraping
│   └── .env              # Environment variables
├── client/                 # ReactJS frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/       # API service
│   │   └── types/         # TypeScript definitions
│   └── package.json       # Dependencies
└── README.md              # This file
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Git
- Google Gemini API key
- SerpAPI key

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env  # Configure your database and API keys
npm run dev          # Start backend server (usually on port 3000)
```

### 2. Automation Script Setup

```bash
cd automation
npm install
# Configure .env with:
# - GOOGLE_GEMINI_API_KEY=your_gemini_api_key
# - SERP_API_KEY=your_serp_api_key
# - API_BASE_URL=http://localhost:3000/api
npm run dev            # Run enhancement script
```

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev             # Start frontend (usually on port 5173)
```

## 🔧 Environment Variables

### Backend (.env)

```
DATABASE_URL=your_database_url
PORT=3000
```

### Client (.env)

```
VITE_API_URL=your-backend-api-url
```

### Automation (.env)

```
GOOGLE_GEMINI_API_KEY=your_google_gemini_api_key
SERP_API_KEY=your_serp_api_key
API_BASE_URL=http://localhost:3000/api
```

## 📋 Features Implementation

### ✅ Phase 1 - Backend API (Moderate Difficulty)

- [x] Scrape 5 oldest articles from BeyondChats blogs
- [x] Store articles in database
- [x] Create CRUD APIs (CREATE, READ, UPDATE, DELETE)
- [x] Article management endpoints

### ✅ Phase 2 - Automation Script (Very Difficult)

- [x] Fetch articles from Phase 1 API
- [x] Search each article title on Google
- [x] Fetch first two Google search results
- [x] Scrape main content from reference articles
- [x] Call LLM API to enhance articles
- [x] Publish enhanced articles via CRUD APIs
- [x] Cite reference articles at bottom

### ✅ Phase 3 - Frontend (Very Easy)

- [x] ReactJS application
- [x] Fetch articles from Laravel APIs
- [x] Display original and updated versions
- [x] Responsive, professional UI with shadcn/ui
- [x] Side-by-side article comparison
- [x] Tab-based navigation (All, Enhanced, Original)

## 🎨 Frontend Features

- **Modern UI**: Built with React, TypeScript, Tailwind CSS, shadcn/ui
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Article Comparison**: Side-by-side view of original vs enhanced
- **Smart Filtering**: Tabs for All, Enhanced, and Original articles
- **Interactive**: Click articles to view detailed comparison
- **Error Handling**: Comprehensive loading and error states
- **Type Safety**: Full TypeScript implementation

## 🔌 API Endpoints

### Articles API

```
GET    /api/articles          # Get all articles
GET    /api/articles/:id      # Get single article
POST   /api/articles          # Create article
PUT    /api/articles/:id      # Update article
DELETE /api/articles/:id      # Delete article
```

## 🤖 AI Enhancement Process

1. **Fetch** original article from database
2. **Search** Google for similar articles using title
3. **Scrape** content from top 2 search results
4. **Analyze** writing style, tone, and formatting from references
5. **Generate** enhanced version using Google Gemini AI
6. **Update** article in database with enhanced content
7. **Cite** reference articles at the bottom

## 🧪 Testing

### Frontend

```bash
cd client
npm run dev     # Development server
npm run build   # Production build
npm run preview # Preview production build
```

### Automation

```bash
cd automation
npm run dev     # Run enhancement script
```

### Backend

```bash
cd backend
npm run dev     # Development server
npm run build   # Production build
```

## 📱 Live Demo

**Frontend**: https://beyondchats-assignment-kappa.vercel.app/
**Backend API**: https://beyondchats-assignment-production-683a.up.railway.app/

## 🛠️ Technologies Used

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Prisma** - Database ORM
- **TypeScript** - Type safety

### Automation

- **Node.js** - Runtime environment
- **Google Gemini AI** - Content enhancement
- **SerpAPI** - Google search results
- **Cheerio** - Web scraping
- **Axios** - HTTP client

### Frontend

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **Lucide React** - Icons
- **Vite** - Build tool

## 🤝 Contributing

This is an assignment project. For contributions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project remains the property of the developer. BeyondChats will not use any part of this submission unless the developer is selected for the position.
