// tattoomi/app/layout.tsx

import { Poppins, Varela_Round, } from "next/font/google";
import "./globals.css";

const poppinsFont = Poppins({
  variable: "--font-poppins-font",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const varelaRoundFont = Varela_Round({
  variable: "--font-varela-round",
  weight: ["400"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${poppinsFont.variable} ${varelaRoundFont.variable} antialiased sm:min-h-screen min-h-svh sm:min-w-screen min-w-svw`}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
