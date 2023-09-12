import React from "react";
import NextLink from "next/link";
import axios from 'axios';
import { format } from 'date-fns';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Heading,
  Link,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";

async function getPosts() {
    // 使用 fetch 或其他方法从 API 获取文章数据
    try {
      const res = await axios.get("http://localhost:1337/api/posts");
      console.log(res.status);
      console.log(res.data.data);
      if (res.status == 200) {
          return res.data.data;
      }
    } catch(e) {

    }
   

    return [];
  }

  function covertDate(dateString) {
    const dateObject = new Date(dateString);

    // 使用 date-fns 的 format 函数来格式化日期
    const formattedDate = format(dateObject, 'yyyy年MM月dd日');
    return formattedDate;
  }


export default async function Blog() {
    const posts = await getPosts();

  return (
    <Stack  py={20} px={10}>
      <Heading mb={10}>最新文章</Heading>

      <Stack px={20}>
          {
              posts.map((post)=>(
                <HStack key={post.id}>
                <Text>{covertDate(post.attributes.createdAt)}</Text>
                <Link as={NextLink} href={`/posts/${post.attributes.slug}`}>
                    <Text as="b" fontSize="lg">{post.attributes.title}</Text>
                </Link>
              </HStack>
              ))
          }
       

        
      </Stack>
    </Stack>
  );
}


