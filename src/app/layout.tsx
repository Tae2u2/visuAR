import type { Metadata } from "next";
import { Inter, Noto_Sans, Roboto } from "next/font/google";
import "./globals.css";
import Provider from "@/components/layout/Provider";

export const roboto = Roboto({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const inter = Inter({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const notoSansKR = Noto_Sans({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VisuAR",
  description: "카메라 필터와 그 사용량 분석 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.variable} ${inter.variable} ${notoSansKR.variable} font-sans`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
