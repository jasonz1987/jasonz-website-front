import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import theme from "./theme";
import { Container, Box, ColorModeScript } from "@chakra-ui/react";
import "prismjs/themes/prism-dark.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "张晓刚的个人网站",
  description: "张晓刚的个人网站学习，记录，思考",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const getBdAnalyticsTag = () => {
    return {
      __html: `
      var _hmt = _hmt || [];
      (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?9df80c64395dc22f25b7879090db0805";
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(hm, s);
      })();`,
    }
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Providers>
          <Container maxW="6xl">
            <Navbar />
            <Box minHeight="60vh">{children}</Box>
            <Footer />
          </Container>
        </Providers>
        <script dangerouslySetInnerHTML={getBdAnalyticsTag()}/>
      </body>
    </html>
  );
}
