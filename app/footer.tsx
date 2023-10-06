
import {
  Box,



  Link,


  HStack,
  Stack, Text
} from "@chakra-ui/react";
import NextLink from "next/link";
import {MdRssFeed} from "react-icons/md";

export default function Footer() {
  return (
    <Stack as={Box} textAlign="center" py={40}>
      <Text>© 1987 - 2023 {process.env.NEXT_PUBLIC_SITE_NAME} 版权所有</Text>
      <Link as={NextLink} href="https://beian.miit.gov.cn/" target="_blank">浙ICP备16002143号-1</Link>
      <HStack textAlign="center" justifyContent="center">
        <Link as={NextLink} href="https://www.jason-z.com/sitemap.xml" target="_blank">网站地图</Link>
        <Link as={NextLink} href="https://www.jason-z.com/rss.xml" target="_blank"><MdRssFeed color = "#ee802f" size = " 30px" /></Link>
      </HStack>
    </Stack>
  );
}
