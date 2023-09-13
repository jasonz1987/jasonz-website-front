import {
  Heading, HStack,









  Link,

  Stack, Text
} from "@chakra-ui/react";
import { format } from 'date-fns';
import NextLink from "next/link";
import React from "react";
import api from "../axios/api";

async function getPosts() {
    // 使用 fetch 或其他方法从 API 获取文章数据
    try {
      const res = await api.get("/posts");
      console.log(res.status);
      console.log(res.data.data);
      if (res.status == 200) {
          return res.data.data;
      }
    } catch(e) {

    }
   

    return [];
  }

  function covertDate(dateString: string) {
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
              posts.map((post: any)=>(
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


