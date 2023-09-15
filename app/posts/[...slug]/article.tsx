"use client";

import { Heading, HStack, Icon, Stack, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import Prism from 'prismjs';
import { useEffect } from 'react';
import { AiFillCalendar } from 'react-icons/ai';

require('prismjs/components/prism-javascript')
require('prismjs/components/prism-css')
require('prismjs/components/prism-jsx')
require('prismjs/components/prism-typescript')

interface ArticleProps  {
    post: any
}

function covertDate(dateString: string) {
  if (dateString) {
    const dateObject = new Date(dateString);

    // 使用 date-fns 的 format 函数来格式化日期
    const formattedDate = format(dateObject, "yyyy年MM月dd日");
    return formattedDate;
  }

  return "";
}

export default function Article(props: ArticleProps) {
    
    const {post} = props;
  
    useEffect(() => {
     
      Prism.highlightAll();
    
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
            <div dangerouslySetInnerHTML={{ __html: post?.attributes?.content }} />
          </Stack>
        </Stack>
      </article>
    );
  }
