import { Heading, HStack, Link, Stack, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { Metadata } from "next";
import NextLink from "next/link";
import api from "../axios/api";

async function getPosts() {
  // 使用 fetch 或其他方法从 API 获取文章数据
  try {
    const res = await api.get("/posts?sort[0]=createdAt:desc");
    if (res.status == 200) {
      return res.data.data;
    }
  } catch (e) {}

  return [];
}

function covertDate(dateString: string) {
  const dateObject = new Date(dateString);

  // 使用 date-fns 的 format 函数来格式化日期
  const formattedDate = format(dateObject, "yyyy年MM月dd日");
  return formattedDate;
}

export const metadata: Metadata = {
  title: "博客 - 张晓刚",
  description: "张晓刚的个人博客",
};

export default async function Blog() {
  const posts = await getPosts();

  return (
    <Stack py={20} px={10} >
      <Heading mb={10}>最新文章</Heading>

      <Stack px={20} >
        {posts.map((post: any) => (
          <HStack key={post.id} >
            <Text flexShrink={0}>{covertDate(post.attributes.createdAt)}</Text>
            <Link as={NextLink} href={`/posts/${post.attributes.slug}`} >
              <Text as="b" fontSize="lg" textOverflow="ellipsis" whiteSpace="nowrap" >
                {post.attributes.title}
              </Text>
            </Link>
          </HStack>
        ))}
      </Stack>
    </Stack>
  );
}
