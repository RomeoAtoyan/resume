# Next.js Boilerplate

A modern, production-ready Next.js 15 boilerplate with authentication, database, and UI components.

## ✨ Features

- **Next.js 15** with App Router and Turbopack
- **TypeScript** for type safety
- **Authentication** with NextAuth.js and GitHub OAuth
- **Database** with Prisma ORM and PostgreSQL
- **Styling** with Tailwind CSS and shadcn/ui components
- **State Management** with Zustand
- **UI Components** with Lucide icons and Framer Motion
- **Error Handling** with global error boundaries
- **Loading States** with skeleton components
- **Route Protection** with middleware
- **Development Tools** with ESLint and TypeScript

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- GitHub OAuth app (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd skeleton
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/your_database"
   
   # NextAuth
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   
   # GitHub OAuth
   GITHUB_CLIENT_ID="your-github-client-id"
   GITHUB_CLIENT_SECRET="your-github-client-secret"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
skeleton/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── auth/          # NextAuth.js routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
│   ├── auth/             # Authentication config
│   ├── generated/        # Prisma generated types
│   ├── prisma.ts         # Database client
│   └── utils.ts          # Utility functions
├── providers/            # React context providers
├── public/              # Static assets
├── prisma/              # Database schema
│   └── schema.prisma    # Prisma schema
└── types/               # TypeScript type definitions
```

## 🔧 Configuration

### Authentication

The boilerplate includes NextAuth.js with GitHub OAuth. To add more providers:

1. Install the provider package:
   ```bash
   npm install @auth/google-provider
   ```

2. Add to `lib/auth/auth.ts`:
   ```typescript
   import GoogleProvider from "next-auth/providers/google"
   
   providers: [
     GitHubProvider({...}),
     GoogleProvider({
       clientId: process.env.GOOGLE_CLIENT_ID!,
       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
     }),
   ]
   ```

### Database

The boilerplate uses Prisma with PostgreSQL. To modify the schema:

1. Edit `prisma/schema.prisma`
2. Run `npx prisma db push` to apply changes
3. Run `npx prisma generate` to update the client

### Styling

The boilerplate uses Tailwind CSS with shadcn/ui. To add new components:

```bash
npx shadcn@latest add button
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js | Yes |
| `NEXTAUTH_URL` | Your app's URL | Yes |
| `GITHUB_CLIENT_ID` | GitHub OAuth client ID | Yes |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth client secret | Yes |

## 🎨 UI Components

This boilerplate includes shadcn/ui components with:
- **Lucide React** icons
- **Framer Motion** animations
- **Tailwind CSS** for styling
- **Class Variance Authority** for component variants

## 📦 Dependencies

### Core
- `next@15.4.5` - React framework
- `react@19.1.0` - UI library
- `typescript@5` - Type safety

### Authentication & Database
- `next-auth@4.24.11` - Authentication
- `@prisma/client@6.13.0` - Database ORM
- `@next-auth/prisma-adapter@1.0.7` - NextAuth adapter

### UI & Styling
- `tailwindcss@3.4.17` - CSS framework
- `class-variance-authority@0.7.1` - Component variants
- `lucide-react@0.536.0` - Icons
- `framer-motion@12.23.12` - Animations

### State Management
- `zustand@5.0.7` - State management

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The boilerplate works with any platform that supports Next.js:
- Netlify
- Railway
- Render
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Prisma](https://prisma.io/) - Database ORM
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
