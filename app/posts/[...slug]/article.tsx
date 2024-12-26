"use client";

import { Heading, HStack, Icon, Stack, Text, Container, Box, Divider, Tag, Wrap, WrapItem, Link } from '@chakra-ui/react';
import { format } from 'date-fns';
import Prism from 'prismjs';
import { useEffect } from 'react';
import { AiFillCalendar, AiFillEye, AiFillFolder, AiFillTags } from 'react-icons/ai';
import NextLink from "next/link";

// @ts-ignore 处理 Prism 语言模块的类型问题
const loadPrismLanguages = async () => {
  await Promise.all([
    import('prismjs/components/prism-javascript'),
    import('prismjs/components/prism-css'),
    import('prismjs/components/prism-jsx'),
    import('prismjs/components/prism-typescript'),
    import('prismjs/components/prism-java'),
    import('prismjs/components/prism-python')
  ]);
};

interface ArticleProps {
  post: {
    attributes: {
      title: string;
      createdAt: string;
      content: string;
      views?: number;
      category?: {
        data?: {
          attributes: {
            name: string;
            slug: string;
          }
        }
      };
      tags?: {
        data: Array<{
          attributes: {
            name: string;
            slug: string;
          }
        }>
      };
    }
  }
}

function convertDate(dateString: string) {
  if (!dateString) return "";
  return format(new Date(dateString), "yyyy年MM月dd日");
}

export default function Article({ post }: ArticleProps) {
  useEffect(() => {
    loadPrismLanguages().then(() => {
      requestAnimationFrame(() => {
        Prism.highlightAll();
      });
    });
  }, []);

  const category = post?.category?.data?.attributes;
  const tags = post?.tags?.data || [];

  return (
    <Container maxW="6xl" py={10}>
      <article className="article">
        <Stack spacing={8}>
          {/* 文章标题区域 */}
          <Box textAlign="center">
            <Heading 
              as="h1" 
              size="2xl" 
              mb={6}
              bgGradient="linear(to-r, blue.400, purple.500)"
              bgClip="text"
              lineHeight="1.4"
            >
              {post?.title}
            </Heading>
            
            {/* 文章元信息 */}
            <Stack spacing={4} align="center">
              <HStack 
                spacing={6} 
                justify="center"
                color="whiteAlpha.800"
                fontSize="sm"
              >
                <HStack>
                  <Icon as={AiFillCalendar} boxSize={4} />
                  <Text>{convertDate(post?.createdAt)}</Text>
                </HStack>
                {post?.views && (
                  <HStack>
                    <Icon as={AiFillEye} boxSize={4} />
                    <Text>{post.views} 次阅读</Text>
                  </HStack>
                )}
                {category && (
                  <HStack>
                    <Icon as={AiFillFolder} boxSize={4} />
                    <Link
                      as={NextLink}
                      href={`/categories/${category.slug}`}
                      _hover={{ 
                        textDecoration: 'none',
                        color: 'blue.400'
                      }}
                    >
                      <Text>{category.name}</Text>
                    </Link>
                  </HStack>
                )}
              </HStack>

              {/* 标签区域 */}
              {tags.length > 0 && (
                <HStack spacing={2}>
                  <Icon as={AiFillTags} boxSize={4} color="whiteAlpha.800" />
                  <Wrap spacing={2} justify="center">
                    {tags.map((tag, index) => (
                      <WrapItem key={index}>
                        <Link
                          as={NextLink}
                          href={`/tags/${tag.slug}`}
                          _hover={{ textDecoration: 'none' }}
                        >
                          <Tag
                            size="md"
                            variant="subtle"
                            colorScheme="blue"
                            borderRadius="full"
                            px={3}
                            py={1}
                            bg="whiteAlpha.100"
                            color="whiteAlpha.900"
                            cursor="pointer"
                            _hover={{
                              bg: 'whiteAlpha.200',
                              transform: 'translateY(-1px)',
                              transition: 'all 0.2s'
                            }}
                          >
                            {tag.name}
                          </Tag>
                        </Link>
                      </WrapItem>
                    ))}
                  </Wrap>
                </HStack>
              )}
            </Stack>
          </Box>

          <Divider borderColor="whiteAlpha.200" />

          {/* 文章内容区域 */}
          <Box 
            className="article-content"
            sx={{
              // 文章内容的样式
              'h1, h2, h3, h4, h5, h6': {
                color: 'whiteAlpha.900',
                fontWeight: 'bold',
                mt: 8,
                mb: 4,
              },
              h1: { fontSize: '3xl', borderBottom: '1px solid', borderColor: 'whiteAlpha.200', pb: 2 },
              h2: { fontSize: '2xl', borderBottom: '1px solid', borderColor: 'whiteAlpha.200', pb: 2 },
              h3: { fontSize: 'xl' },
              h4: { fontSize: 'lg' },
              p: {
                my: 4,
                lineHeight: 1.8,
                color: 'whiteAlpha.800',
              },
              'ul, ol': {
                pl: 6,
                my: 4,
                color: 'whiteAlpha.800',
              },
              li: {
                my: 2,
              },
              a: {
                color: 'blue.400',
                textDecoration: 'none',
                _hover: {
                  textDecoration: 'underline',
                },
              },
              blockquote: {
                borderLeft: '4px solid',
                borderColor: 'blue.400',
                pl: 4,
                py: 2,
                my: 4,
                bg: 'whiteAlpha.50',
                color: 'whiteAlpha.800',
              },
              pre: {
                my: 6,
                p: 4,
                borderRadius: 'md',
                bg: 'gray.800',
                overflow: 'auto',
              },
              code: {
                fontFamily: 'mono',
                fontSize: '0.9em',
              },
              'p > code': {
                bg: 'whiteAlpha.100',
                color: 'blue.300',
                px: 2,
                py: 0.5,
                borderRadius: 'md',
                fontSize: '0.9em',
              },
              img: {
                maxW: '100%',
                h: 'auto',
                borderRadius: 'lg',
                my: 6,
              },
              table: {
                w: '100%',
                my: 6,
                borderCollapse: 'collapse',
              },
              'th, td': {
                border: '1px solid',
                borderColor: 'whiteAlpha.200',
                p: 2,
              },
              th: {
                bg: 'whiteAlpha.100',
                fontWeight: 'bold',
              }
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: post?.content }} />
          </Box>
        </Stack>
      </article>
    </Container>
  );
}
