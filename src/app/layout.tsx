import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brat Generator",
  description: "Brat Generator with emojis support and you can download the image",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.bunny.net" crossOrigin="anonymous" />
        <link href="https://fonts.bunny.net/css?family=Poppins:100,200,300,400,500,600,700,800&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
