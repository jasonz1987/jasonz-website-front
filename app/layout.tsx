import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

import Navbar from "./navbar";
import Footer from "./footer";
import theme from "./theme";
import { Container, Box, ColorModeScript } from "@chakra-ui/react";
import "prismjs/themes/prism-tomorrow.css";

// import "./prismjs.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME + ' - 学习，记录，思考',
  description: "张晓刚的个人网站，主要用于记录和分享日常学习，生活，集合博客，作品，个人信息展示。",
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
    <html lang="en" suppressHydrationWarning>
      <body >
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
