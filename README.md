# Entra ID Role Finder

An AI-powered tool to help users discover and understand Microsoft Entra ID (formerly Azure AD) roles and permissions through intelligent search and recommendations.

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

### Backend & Automation
- **Workflow Engine**: n8n (self-hosted or n8n Cloud)
- **Database**: PostgreSQL (connected via n8n)
- **AI Integration**: n8n AI nodes (OpenAI, Claude, etc.)
- **Search**: n8n workflows with vector database integration
- **API**: n8n webhook endpoints + REST API calls
- **Caching**: Redis integration for frequent queries

## 🔧 Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js App   │───▶│   n8n Webhook   │───▶│  AI Processing  │
│   (Frontend)    │    │   (API Layer)   │    │   (OpenAI/      │
└─────────────────┘    └─────────────────┘    │   Claude)       │
                                              └─────────────────┘
                                                       │
                                                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    Response     │◀───│   PostgreSQL    │◀───│ Database Query  │
│   (JSON/UI)     │    │   (Role Data)   │    │   & Vector      │
└─────────────────┘    └─────────────────┘    │   Search        │
                                              └─────────────────┘
```

### Request Flow
1. **User Search Request** → Frontend captures user query
2. **n8n Webhook** → Receives and processes the request
3. **AI Processing** → Analyzes query using OpenAI/Claude
4. **Database Query** → Searches PostgreSQL + vector database
5. **Response** → Returns structured role information

## 🚀 Key n8n Workflows

### 1. Search Handler Workflow
**Purpose**: Main search functionality
- **Trigger**: Webhook endpoint
- **Process**: AI Agent → Database lookup → Response formatting
- **Output**: Role recommendations with explanations

### 2. Data Ingestion Workflow
**Purpose**: Keep role mappings current
- **Trigger**: Scheduled (daily/weekly)
- **Process**: Fetch latest Entra ID documentation → Parse roles → Update database
- **Output**: Updated role database

### 3. AI Chain Workflow
**Purpose**: Complex reasoning and multi-step queries
- **Trigger**: Complex search requests
- **Process**: Multiple AI nodes for context building and reasoning
- **Output**: Detailed role analysis and recommendations

### 4. Caching Workflow
**Purpose**: Optimize performance for frequent queries
- **Trigger**: All search requests
- **Process**: Redis cache check → Serve cached or process new
- **Output**: Faster response times

## 📁 Project Structure

```
entraidrolefinder/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utility functions and API calls
│   ├── types/               # TypeScript type definitions
│   └── styles/              # Global styles
├── public/                  # Static assets
├── n8n-workflows/           # n8n workflow exports
├── docs/                    # Documentation
└── README.md
```

## 🛠️ Features

### Core Functionality
- **Intelligent Role Search**: Natural language queries to find appropriate Entra ID roles
- **Permission Mapping**: Detailed breakdown of permissions for each role
- **Role Recommendations**: AI-powered suggestions based on user requirements
- **Comparison Tools**: Side-by-side role comparisons
- **Search History**: Track and revisit previous searches

### AI Capabilities
- **Natural Language Processing**: Understand user intent and context
- **Contextual Recommendations**: Suggest roles based on job functions, responsibilities
- **Explanation Generation**: AI-generated explanations for why certain roles are recommended
- **Query Expansion**: Enhance simple queries with related terms and concepts

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- n8n instance (self-hosted or cloud)
- PostgreSQL database
- Redis (for caching)

### Frontend Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### n8n Configuration
1. Import workflows from `n8n-workflows/` directory
2. Configure database connection credentials
3. Set up AI node API keys (OpenAI, Claude)
4. Configure webhook endpoints
5. Set up scheduled triggers for data ingestion

### Database Setup
```sql
-- Create roles table
CREATE TABLE entra_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    permissions JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create search index
CREATE INDEX idx_roles_search ON entra_roles USING gin(to_tsvector('english', name || ' ' || description));
```

## 📊 API Endpoints

### n8n Webhook Endpoints
- `POST /webhook/search` - Main search functionality
- `POST /webhook/compare` - Role comparison
- `GET /webhook/roles` - List all roles
- `POST /webhook/feedback` - User feedback collection

## 🎯 Deployment

### Frontend (Vercel)
```bash
# Connect to Vercel
vercel

# Deploy
vercel --prod
```

### Backend (n8n)
- **n8n Cloud**: Import workflows and configure credentials
- **Self-hosted**: Deploy n8n with Docker or traditional hosting

## 📈 Monitoring & Analytics

- **n8n Workflow Metrics**: Track execution times and success rates
- **User Analytics**: Search patterns and popular queries
- **AI Performance**: Response quality and accuracy metrics
- **Database Performance**: Query optimization and caching effectiveness

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For questions about setup or usage, please open an issue in the GitHub repository.
