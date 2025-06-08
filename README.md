# PitchDeck - Create Beautiful Presentations

[![CI/CD Pipeline](https://github.com/Nadavlistingsync/pitch-slap/actions/workflows/ci.yml/badge.svg)](https://github.com/Nadavlistingsync/pitch-slap/actions/workflows/ci.yml)

PitchDeck is a modern web application that helps you create, collaborate, and present beautiful pitch decks with ease. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 Beautiful, modern UI
- 📱 Responsive design
- 🔒 User authentication
- 📊 Multiple slide types (Title, Text, Image, Chart)
- 👥 Real-time collaboration
- 📤 Export to PDF
- 📈 Analytics and feedback

## Getting Started

### Prerequisites

- Node.js 20.0.0 or later
- npm 10.0.0 or later

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pitchdeck.git
   cd pitchdeck
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your environment variables:
   ```
   NEXT_PUBLIC_API_URL=your_api_url
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── dashboard/      # Dashboard page
│   ├── editor/         # Editor page
│   ├── login/          # Login page
│   └── signup/         # Signup page
├── components/         # Reusable components
├── lib/               # Utility functions and hooks
└── types/             # TypeScript type definitions
```

## Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production application
- `npm start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Code Style

This project uses:
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type checking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Headless UI](https://headlessui.dev/)
- [Heroicons](https://heroicons.com/) 