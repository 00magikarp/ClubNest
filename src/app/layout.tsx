import type {Metadata} from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ThemeContextProvider from '@/contexts/theme-context';

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: '400',
})

export const metadata: Metadata = {
  title: "ClubNest",
  description: "View and manage clubs in your school!",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
    <head>
      <script
        dangerouslySetInnerHTML={{
          __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'dark';
                  document.documentElement.className = theme === 'dark' ? 'dark' : '';
                } catch (e) {
                  document.documentElement.className = 'dark';
                }
              })();
            `,
        }}
      />
    </head>
    <body className={`${poppins.className} antialiased`}>
    <ThemeContextProvider>
      {children}
    </ThemeContextProvider>
    </body>
    </html>
  );
}
