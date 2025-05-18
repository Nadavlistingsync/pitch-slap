# PitchSlap - Brutally Honest VC Feedback

Get brutally honest feedback on your pitch deck from AI-powered VCs. No sugar coating, just straight talk to help you raise your next round.

## Features

- Upload and analyze pitch decks
- Get feedback from different VC personalities
- Choose your preferred feedback intensity
- Modern, responsive UI with smooth animations

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- OpenAI GPT-4
- Framer Motion

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pitch-slap.git
cd pitch-slap
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
DATABASE_URL="your-postgresql-url"
OPENAI_API_KEY="your-openai-api-key"
NEXT_PUBLIC_APP_URL="your-app-url"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The project is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel and set up the environment variables.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Landing page
│   ├── upload/            # Upload & analyze page
│   ├── branding/          # Branding customization
│   ├── style/             # Template selection
│   ├── processing/        # Processing animation
│   └── preview/           # Preview & download
├── components/            # Reusable components
├── lib/                   # Utility functions
└── types/                # TypeScript types
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for the smooth animations 