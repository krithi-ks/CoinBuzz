import type { Metadata } from "next";
import "./globals.css";
import { DemoModeProvider } from "@/contexts/DemoModeContext";

export const metadata: Metadata = {
  title: "CoinBuzz — AI Crypto Trend Intelligence",
  description: "From Social Buzz to Smarter Crypto Signals. CoinBuzz transforms noisy social media chatter into explainable, actionable meme coin intelligence.",
  keywords: "crypto, meme coins, sentiment analysis, social intelligence, DOGE, PEPE, BONK",
  openGraph: {
    title: "CoinBuzz — AI Crypto Trend Intelligence",
    description: "Hype forensics, pre-pump detection, narrative tracking, and explainable AI for meme coins.",
    type: "website",
  },
};

import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <DemoModeProvider>
          {children}
        </DemoModeProvider>
      </body>
    </html>
  );
}
