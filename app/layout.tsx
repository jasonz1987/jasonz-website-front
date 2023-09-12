import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";

import { Container, Box } from "@chakra-ui/react";

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
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
        <Container maxW="6xl" >
          <Navbar />
          <Box minHeight="60vh" > 
            {children}
            </Box>
            <Footer />
         </Container>
        </Providers>
      </body>
    </html>
  );
}
