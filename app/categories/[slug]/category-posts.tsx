"use client";

import { Box, Container, Heading, Link, Stack, Text, HStack, Icon } from "@chakra-ui/react";
import NextLink from "next/link";
import { AiFillCalendar } from "react-icons/ai";
import { format } from "date-fns";

interface CategoryPostsProps {
  category: {
    attributes: {
      name: string;
      description?: string;
    };
  };
  posts: Array<{
    id: string;
    attributes: {
      title: string;
      slug: string;
      createdAt: string;
    };
  }>;
  meta: {
    pagination: {
      total: number;
    };
  };
}

function convertDate(dateString: string) {
  if (!dateString) return "";
  return format(new Date(dateString), "yyyy年MM月dd日");
}

export default function CategoryPosts({ category, posts, meta }: CategoryPostsProps) {
  return (
    <Container maxW="5xl" py={20}>
      <Stack spacing={12}>
        {/* 分类信息 */}
        <Box textAlign="center">
          <Heading 
            size="2xl" 
            mb={4}
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
          >
            {category.attributes.name}
          </Heading>
          <Text color="whiteAlpha.800" fontSize="lg">
            共 {meta.pagination.total} 篇文章
          </Text>
        </Box>

        {/* 文章列表 */}
        <Stack spacing={6}>
          {posts.map((post) => (
            <Link
              key={post.id}
              as={NextLink}
              href={`/posts/${post.attributes.slug}`}
              _hover={{ textDecoration: 'none' }}
            >
              <Box
                p={6}
                borderRadius="lg"
                border="1px solid"
                borderColor="whiteAlpha.200"
                transition="all 0.2s"
                bg="whiteAlpha.50"
                _hover={{
                  transform: 'translateY(-2px)',
                  shadow: 'md',
                  borderColor: 'blue.500',
                  bg: 'whiteAlpha.100'
                }}
              >
                <Stack spacing={3}>
                  <Text
                    fontSize="xl"
                    fontWeight="600"
                    color="whiteAlpha.900"
                  >
                    {post.attributes.title}
                  </Text>
                  <HStack spacing={4} color="whiteAlpha.800">
                    <HStack>
                      <Icon as={AiFillCalendar} boxSize={4} />
                      <Text fontSize="sm">
                        {convertDate(post.attributes.createdAt)}
                      </Text>
                    </HStack>
                  </HStack>
                </Stack>
              </Box>
            </Link>
          ))}
        </Stack>

        {posts.length === 0 && (
          <Box textAlign="center" py={10}>
            <Text color="whiteAlpha.800">
              暂无文章
            </Text>
          </Box>
        )}
      </Stack>
    </Container>
  );
} 