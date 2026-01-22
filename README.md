# R.E.M.A.S.

**Resource Management & Assignment System**

An AI-powered consultant assignment and resource management application for Palo Alto Networks Technical Services.

---

## 🎯 Purpose

REMAS helps Project Managers intelligently match consultants to customer projects by analyzing:
- Consultant skillsets and expertise levels
- Real-time availability (via Google Calendar)
- Current workload and utilization
- Existing project assignments (via Clarizen)

## 🔗 Related Applications

| Application | Description | Link |
|-------------|-------------|------|
| **NOVA** | Next-Gen Operations & Virtual Advisor - Customer-facing security advisory | [Open NOVA](../cloud-security-ai-advisor%20(6)/index.html) |
| **REMAS** | Resource Management & Assignment System (this app) | Current |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Google Gemini API key

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Start development server
npm run dev
```

### Environment Variables

```env
API_KEY=your_gemini_api_key
GOOGLE_CALENDAR_CLIENT_ID=your_client_id
CLARIZEN_API_KEY=your_clarizen_key
```

## 📁 Project Structure

```
remas/
├── docs/                    # Documentation
│   └── ARCHITECTURE.md      # Full architecture documentation
├── components/              # React components
├── services/                # API and AI services
├── hooks/                   # Custom React hooks
├── types/                   # TypeScript type definitions
├── prompts/                 # AI prompt templates
└── ...config files
```

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS
- **AI:** Google Gemini (via @google/genai)
- **Build:** Vite
- **Integrations:** Google Calendar API, Clarizen API

## 📖 Documentation

See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) for full architecture details including:
- System architecture diagrams
- Data models
- AI agent design
- Integration specifications
- Implementation roadmap

## 🤝 Contributing

1. Follow the existing code style from NOVA
2. Maintain consistent UI/UX between NOVA and REMAS
3. Document new features in ARCHITECTURE.md

## 📄 License

Internal use only - Palo Alto Networks Technical Services
