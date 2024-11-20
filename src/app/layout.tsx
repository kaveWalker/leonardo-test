import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Provider } from "@/components/ui/provider";
import { AuthProvider } from "@/lib/auth-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // added suppressHydrationWarning by following the docs: https://www.chakra-ui.com/docs/get-started/frameworks/next-app#setup-provider
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider>
          <AuthProvider>
            <main>{children}</main>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
