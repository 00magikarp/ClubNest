import type {Metadata} from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import ThemeContextProvider from '@/contexts/theme-context';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const testFont = Poppins({
  variable: "--font-testing",
  subsets: ["latin"],
  weight: '400',
})

export const metadata: Metadata = {
  title: "ClubNest",
  description: "View and manage clubs in your school!",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
    <body className={`${testFont.className} antialiased`}>
    <ThemeContextProvider>
      {children}
    </ThemeContextProvider>
    </body>
    </html>
  );
}
