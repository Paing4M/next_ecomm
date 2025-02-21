import React from "react";
import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import {ClerkProvider} from "@clerk/nextjs";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "Ecomm | %s",
    default: 'Ecomm'
  },
  description: "What do you want to buy?. We got everything.",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
      >
      <div className='max-w-[1300px] mx-auto px-2 md:px-3'>
        <Header/>
        <div className='min-h-screen'>
          {children}
        </div>
      </div>

      <div className='bg-black text-white'>
        <Footer/>
      </div>

      </body>
      </html>
    </ClerkProvider>
  );
}
