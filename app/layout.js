import { Inter, Playfair_Display } from 'next/font/google';
import '../src/index.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-display',
    display: 'swap',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-serif',
    display: 'swap',
});

export const metadata = {
    title: 'FitVision — AI Fitness Coach',
    description:
        'AI-powered real-time exercise form correction using computer vision. Get instant feedback on your squats, push-ups, bicep curls, and jumping jacks.',
    icons: {
        icon: '/vite.svg',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
            <head>
                <link
                    href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
                    rel="stylesheet"
                />
            </head>
            <body>{children}</body>
        </html>
    );
}
