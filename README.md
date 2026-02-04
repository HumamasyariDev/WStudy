# 📚 WStudy - Modern Learning Platform

![WStudy Banner](public/logo_text_transparent.png)

> **WStudy** is a next-generation interactive learning platform designed to connect students with expert mentors and high-quality educational content. Built with modern web technologies and powered by AI, it offers a seamless, engaging, and responsive experience for all users.

---

## 🚀 Features

### 🎓 For Students
- **Interactive Dashboard**: Track your learning progress, streak, and points.
- **Course Management**: Enroll in courses, view video lessons, and download resources.
- **Quiz System**: Take interactive quizzes with real-time feedback and scoring.
- **Certificate Generation**: Earn and download certificates upon course completion.

### 👨‍🏫 For Teachers & Mentors
- **AI-Powered Course Creator**: Generate course structures with AI assistance or create manually.
- **AI Quiz Builder**: Automatically generate quizzes based on course topics.
- **Student Management**: Monitor student progress and performance.

### 🤖 AI Features
- **AI Course Generation**: Automatically generate comprehensive course structures from simple prompts.
- **AI Quiz Generation**: Create intelligent quizzes tailored to your course content.
- **AI Customer Support**: 24/7 intelligent chatbot to assist users with questions.
- **Smart Recommendations**: AI-powered course and content suggestions.

### 🛡️ For Admins
- **User Management**: Approve or block users (students/teachers).
- **Course Oversight**: Review and approve courses before publishing.
- **Platform Analytics**: View key metrics and platform health.

---

## 🛠️ Technology Stack

- **Frontend Framework**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **AI Integration**: [OpenAI GPT-4](https://openai.com/) for course generation and customer support

---

## 🏁 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [OpenAI API Key](https://platform.openai.com/api-keys) (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/HumamasyariDev/WStudy.git
   cd WStudy
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your OpenAI API key:
   ```env
   # OpenAI API Key for AI features
   # Get your API key from: https://platform.openai.com/api-keys
   VITE_OPENAI_API_KEY=sk-proj-your-actual-api-key-here
   ```
   
   **Important Notes:**
   - Replace `sk-proj-your-actual-api-key-here` with your actual OpenAI API key
   - The API key must start with `sk-proj-` or `sk-`
   - Do NOT commit the `.env` file to git (it's already in `.gitignore`)
   - Without an API key, AI features will use fallback responses

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   
   **Note:** If you add or change environment variables, you must restart the dev server for changes to take effect.

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

---

## 📂 Project Structure

```bash
WStudy/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── layout/       # Layout components (Sidebar, DashboardLayout)
│   │   ├── ui/           # UI components (Modals, Cards, etc.)
│   │   └── course/       # Course-specific components
│   ├── pages/            # Page components
│   │   ├── admin/        # Admin dashboard pages
│   │   ├── student/      # Student dashboard pages
│   │   ├── teacher/      # Teacher dashboard pages
│   │   ├── auth/         # Authentication pages
│   │   └── landing-page/ # Landing page components
│   ├── services/         # API services
│   │   ├── aiService.ts        # AI course generation service
│   │   ├── quizAiService.ts    # AI quiz generation service
│   │   └── chatAiService.ts    # AI chatbot service
│   ├── store/            # State management (Zustand stores)
│   ├── lib/              # Utility functions and helpers
│   ├── App.tsx           # Main application component & Routing
│   └── main.tsx          # Entry point
├── public/               # Static assets (images, logos)
├── .env                  # Environment variables (not committed)
├── .env.example          # Environment variables template
└── index.html            # HTML entry point
```

---

## 🤖 AI Features Usage

### Course Generation
1. Navigate to **Teacher Dashboard** → **Course Creator**
2. Click **"Generate with AI"**
3. Enter a course description (e.g., "Introduction to Python Programming")
4. AI will generate:
   - Course title and description
   - Course category
   - Module structure with lessons
   - Estimated duration

### Quiz Generation
1. Navigate to **Teacher Dashboard** → **Quiz Builder**
2. Click **"Generate with AI"**
3. Enter quiz topic and parameters
4. AI will generate:
   - Quiz questions
   - Multiple choice options
   - Correct answers
   - Point values

### AI Customer Support
- Click the **green chat button** in the bottom-right corner
- Ask questions about:
  - Course information
  - Pricing plans
  - Platform features
  - General support
- AI provides intelligent, context-aware responses

---

## 🔧 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_OPENAI_API_KEY` | OpenAI API key for AI features | No* | Fallback mode |

**Note:** AI features will work without an API key but will use pre-defined fallback responses instead of intelligent AI-generated content.

### Getting an OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to [API Keys](https://platform.openai.com/api-keys)
4. Click **"Create new secret key"**
5. Copy the key (starts with `sk-proj-` or `sk-`)
6. Add it to your `.env` file
7. **Restart the dev server** for changes to take effect

---

## 🐛 Troubleshooting

### AI Features Not Working

**Problem:** Chatbot or course generation shows fallback responses

**Solutions:**
1. **Check API Key:**
   - Open browser console (F12)
   - Look for: `🔑 API Key check: { exists: true }`
   - If `exists: false`, API key is not loaded

2. **Verify .env File:**
   - Ensure `.env` file exists in root directory
   - Check format: `VITE_OPENAI_API_KEY=sk-proj-...`
   - No spaces, no quotes around the value

3. **Restart Dev Server:**
   - Stop server (Ctrl+C)
   - Run `npm run dev` again
   - Vite doesn't auto-reload environment variables

4. **Check API Key Validity:**
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Verify key is active and has credits
   - Check usage limits

### Build Errors

**Problem:** TypeScript compilation errors

**Solution:**
```bash
npm run build
```
Check error messages and fix TypeScript issues.

### Port Already in Use

**Problem:** `Port 5173 is already in use`

**Solution:**
```bash
# Kill process on port 5173
npx kill-port 5173
# Or use a different port
npm run dev -- --port 3000
```

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Deploy to Vercel

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com/)
3. Import your repository
4. Add environment variables in Vercel dashboard:
   - `VITE_OPENAI_API_KEY`: Your OpenAI API key
5. Deploy!

### Important Notes for Deployment

- ✅ `.env` file is in `.gitignore` (never commit API keys)
- ✅ `dist/` folder is in `.gitignore` (build files not committed)
- ✅ Set environment variables in your hosting platform
- ✅ AI features will gracefully fallback if API key is missing

---

## 🤝 Contributing

Contributions are always welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/HumamasyariDev">HumamasyariDev</a>
</p>
