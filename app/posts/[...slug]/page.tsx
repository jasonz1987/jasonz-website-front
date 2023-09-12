import NextLink from "next/link";
import axios from "axios";
import { format } from "date-fns";
import { notFound } from "next/navigation";

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

interface PostProps {
  params: {
    slug: string;
  };
}

async function getPost(slug:string) {
  // 使用 fetch 或其他方法从 API 获取文章数据
  const res = await axios.get("http://localhost:1337/api/posts/" + slug);
  console.log(res.status);
  console.log(res.data.data);
  if (res.status == 200) {
    return res.data.data;
  }

  return [];

  // if (!res.ok) {
  //     // This will activate the closest `error.js` Error Boundary
  //     throw new Error('Failed to fetch data')
  //   }

  //   return res.json()
}

function covertDate(dateString: string) {
  const dateObject = new Date(dateString);

  // 使用 date-fns 的 format 函数来格式化日期
  const formattedDate = format(dateObject, "yyyy年MM月dd日");
  return formattedDate;
}

// export async function generateStaticParams(): Promise<PostProps["params"][]> {
//   return allPosts.map((post) => ({
//     slug: post.slugAsParams.split("/"),
//   }))
// }

export default async function Blog({ params }: PostProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="article">
      <Stack py={20} px={10}>
        <Heading mb={10}>{post.attributes.title}</Heading>
        <HStack>
          <Text>{covertDate(post.attributes.createdAt)}</Text>
        </HStack>
        <Stack mt={20}>
          <div dangerouslySetInnerHTML={{ __html: post.attributes.content }} />
        </Stack>
      </Stack>
    </article>
  );
}
