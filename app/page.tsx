"use client";

import { Avatar, Box, HStack, Icon, Link, Stack, Text } from "@chakra-ui/react";
import { Metadata } from "next";
import { AiFillGithub } from "react-icons/ai";

// export const metadata: Metadata = {
//   title: process.env.NEXT_PUBLIC_SITE_NAME + "学习，记录，思考",
// };

export default function Home() {
  return (
    <Stack spacing="36px" as={Box} align="center" justify="center" py={40}>
      <Avatar size={"2xl"} src={"images/avatar.png"} />

      <Stack align="center">
  <Text fontSize="2xl">{process.env.NEXT_PUBLIC_SITE_NAME}</Text>
        <Text fontSize="xl">学习，记录，思考</Text>
      </Stack>

      <HStack spacing="24px">
        <Link href="https://github.com/jasonz1987" target="_blank">
          <Icon boxSize={12} as={AiFillGithub} />
        </Link>
        {/* <Icon boxSize={12} as={AiFillWeiboCircle} />
        <Icon boxSize={12} as={AiFillTwitterCircle} /> */}
      </HStack>
    </Stack>
  );
}
