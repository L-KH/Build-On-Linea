import type { ReactNode } from "react";

import "@/styles/globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";

const open_sans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ImaginAIryNFTs",
  applicationName: "ImaginAIryNFTs",
  description: "Your Prompt, Your art, Your NFT",
  authors: {
    name: "ImaginAIryNFTs",
    url: "",
  },
  icons: "favicon.ico",
  manifest: "site.webmanifest",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={open_sans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
