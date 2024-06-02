import type { Metadata } from "next";
import { Luckiest_Guy } from "next/font/google";
import "./globals.css";

const lucky = Luckiest_Guy({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Roll the Dice",
  description: "Play againts the computer rolling the dice!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={lucky.className}>{children}</body>
    </html>
  );
}
