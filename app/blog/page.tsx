import { Heading, HStack, Link, Stack, Text, Button, Flex, Box, Container } from "@chakra-ui/react";
import { format } from "date-fns";
import { Metadata } from "next";
import NextLink from "next/link";
import api from "../axios/api";
import { getPageRange } from "./utils/pagination";

const POSTS_PER_PAGE = 10;

async function getPosts(page: number = 1) {
  try {
    const res = await api.get(`/posts`, {
      params: {
        'sort[0]': 'createdAt:desc',
        // 'pagination[page]': page,
        // 'pagination[pageSize]': POSTS_PER_PAGE,
      }
    });
    
    if (res.status === 200) {
      return {
        data: res.data.data,
        meta: res.data.meta
      };
    }
  } catch (e) {
    console.error('Failed to fetch posts:', e);
  }

  return { data: [], meta: { pagination: { total: 0, pageCount: 0 } } };
}

function convertDate(dateString: string) {
  if (!dateString) return "";
  return format(new Date(dateString), "yyyy年MM月dd日");
}

export const metadata: Metadata = {
  title: "博客 - 张晓刚",
  description: "张晓刚的个人博客",
};

interface SearchParams {
  page?: string;
}

export default async function Blog({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const currentPage = Number(await Promise.resolve(searchParams.page)) || 1;
  const { data: posts, meta } = await getPosts(currentPage);
  const totalPages = meta.pagination?.pageCount || 1;
  const pageRange = getPageRange(currentPage, totalPages);

  return (
    <Container maxW="5xl" py={20}>
      <Stack spacing={12}>
        {/* 页面标题 */}
        <Box textAlign="center">
          <Heading 
            size="2xl" 
            mb={4}
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
          >
            最新文章
          </Heading>
          <Text color="whiteAlpha.800" fontSize="lg">
            分享技术见解和个人思考
          </Text>
        </Box>

        {/* 文章列表 */}
        <Stack spacing={6}>
          {posts.map((post: any) => (
            <Link
              key={post.id}
              as={NextLink}
              href={`/posts/${post?.slug}`}
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
                overflow="hidden"
              >
                <HStack spacing={4} width="100%" overflow="hidden">
                  {/* 日期 */}
                  <Text
                    fontSize="sm"
                    color="whiteAlpha.800"
                    fontFamily="mono"
                    flexShrink={0}
                    width="140px"
                  >
                    {convertDate(post?.createdAt)}
                  </Text>
                  
                  {/* 标题 */}
                  <Box flex="1" overflow="hidden">
                    <Text
                      fontSize="lg"
                      fontWeight="600"
                      color="whiteAlpha.900"
                      _groupHover={{ color: 'blue.400' }}
                      textOverflow="ellipsis"
                      overflow="hidden"
                      whiteSpace="nowrap"
                      maxWidth="100%"
                    >
                      {post?.title}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            </Link>
          ))}
        </Stack>

        {/* 分页 */}
        <Flex justify="center" gap={2}>
          <Button
            isDisabled={currentPage <= 1}
            as={NextLink}
            href={`/blog?page=${currentPage - 1}`}
            variant="outline"
            size="lg"
            colorScheme="blue"
            _hover={{
              transform: 'translateY(-1px)',
              shadow: 'sm',
              bg: 'whiteAlpha.100'
            }}
            color="white"
            borderColor="whiteAlpha.400"
          >
            上一页
          </Button>
          
          {pageRange[0] > 1 && (
            <>
              <Button
                as={NextLink}
                href="/blog?page=1"
                variant="outline"
                size="lg"
                colorScheme="blue"
              >
                1
              </Button>
              {pageRange[0] > 2 && (
                <Text alignSelf="center" color="gray.500" px={2}>
                  ...
                </Text>
              )}
            </>
          )}
          
          {pageRange.map((pageNum) => (
            <Button
              key={pageNum}
              as={NextLink}
              href={`/blog?page=${pageNum}`}
              variant={pageNum === currentPage ? "solid" : "outline"}
              colorScheme="blue"
              size="lg"
              color={pageNum === currentPage ? "white" : "white"}
              borderColor="whiteAlpha.400"
              _hover={{
                transform: pageNum !== currentPage ? 'translateY(-1px)' : 'none',
                shadow: pageNum !== currentPage ? 'sm' : 'none',
                bg: pageNum !== currentPage ? 'whiteAlpha.100' : undefined
              }}
            >
              {pageNum}
            </Button>
          ))}
          
          {pageRange[pageRange.length - 1] < totalPages && (
            <>
              {pageRange[pageRange.length - 1] < totalPages - 1 && (
                <Text alignSelf="center" color="gray.500" px={2}>
                  ...
                </Text>
              )}
              <Button
                as={NextLink}
                href={`/blog?page=${totalPages}`}
                variant="outline"
                size="lg"
                colorScheme="blue"
              >
                {totalPages}
              </Button>
            </>
          )}

          <Button
            isDisabled={currentPage >= totalPages}
            as={NextLink}
            href={`/blog?page=${currentPage + 1}`}
            variant="outline"
            size="lg"
            colorScheme="blue"
            _hover={{
              transform: 'translateY(-1px)',
              shadow: 'sm',
              bg: 'whiteAlpha.100'
            }}
            color="white"
            borderColor="whiteAlpha.400"
          >
            下一页
          </Button>
        </Flex>
      </Stack>
    </Container>
  );
}
