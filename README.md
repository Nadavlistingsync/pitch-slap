# Pitch Slap

A modern web application that helps users transform their pitch decks with AI-powered design suggestions. Built with Next.js 15 and Tailwind CSS.

## Features

- PDF upload and processing
- AI-powered layout suggestions
- Custom branding options
- Multiple design templates
- Interactive preview and customization
- Export to PPTX format

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Framer Motion
- React Dropzone
- React Colorful

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

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

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