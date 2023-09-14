"use client";

import { Heading, HStack, Stack, Text, Icon } from "@chakra-ui/react";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import api from "../../axios/api";
import Prism from 'prismjs';
import { useEffect } from "react";
import { useState } from "react";
import {
  AiFillCalendar,AiFillDatabase,AiFillTag
} from "react-icons/ai";

require('prismjs/components/prism-javascript')
require('prismjs/components/prism-css')
require('prismjs/components/prism-jsx')
require('prismjs/components/prism-typescript')


interface PostProps {
  params: {
    slug: string;
  };
}

async function getPost(slug: string) {
  // 使用 fetch 或其他方法从 API 获取文章数据
  const res = await api.get("/posts/" + slug);
  console.log(res.status);
  console.log(res.data.data);
  if (res.status == 200) {
    return res.data.data;
  }

  return [];
}

function covertDate(dateString: string) {
  if (dateString) {
    const dateObject = new Date(dateString);

    // 使用 date-fns 的 format 函数来格式化日期
    const formattedDate = format(dateObject, "yyyy年MM月dd日");
    return formattedDate;
  }
 
  return '';
}

// export async function generateStaticParams(): Promise<PostProps["params"][]> {
//   return allPosts.map((post) => ({
//     slug: post.slugAsParams.split("/"),
//   }))
// }

export default  function Post({ params }: PostProps) {
  const [post, setPost] = useState(null);



  useEffect(async () => {
    let data = await getPost(params.slug);
    if (!data) {
      notFound();
    }

    setPost(data);
   
    setTimeout(()=>{
      Prism.highlightAll();
    }, 2000)
  }, [])

  return (
    <article className="article">
      <Stack py={20} px={10}>
        <Heading mb={2}>{post?.attributes?.title}</Heading>
        <HStack gap={4}>
          <HStack>
            <Icon boxSize={6} as={AiFillCalendar} />
            <Text>{covertDate(post?.attributes?.createdAt)}</Text>
          </HStack>

          {/* <HStack>
            <Icon boxSize={6} as={AiFillDatabase} />
            <Text>开发日志</Text>
          </HStack>

          <HStack>
            <Icon boxSize={6} as={AiFillTag} />
            <Text>标签</Text>
          </HStack> */}
         
        </HStack>
        <Stack>
          <div dangerouslySetInnerHTML={{ __html: post?.attributes.content }} />
        </Stack>
      </Stack>
    </article>
  );
}
