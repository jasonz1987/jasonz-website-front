
import NextLink from "next/link";
import {
  Box,
  Container,
  Heading,
  Text,
  Link,
  Avatar,
  VStack,
  HStack,
  Stack,
  Icon,
} from "@chakra-ui/react";

export default function Footer() {
  return (
    <Stack as={Box} textAlign="center" py={40}>
      <Text>© 1987 - 2023 {process.env.NEXT_PUBLIC_SITE_NAME} 版权所有</Text>
      <Link as={NextLink} href="https://beian.miit.gov.cn/" target="_blank">浙ICP备16002143号-1</Link>
      <Link as={NextLink} href="https://www.jason-z.com/sitemap.xml" target="_blank">网站地图</Link>
    </Stack>
  );
}
