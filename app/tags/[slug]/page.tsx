import { Metadata } from "next";
import { notFound } from "next/navigation";
import api from "../../axios/api";
import TagPosts from "./tag-posts";

interface TagPageProps {
  params: {
    slug: string;
  };
}

async function getTag(slug: string) {
  try {
    const res = await api.get(`/tags/${slug}?populate=*`);
    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.error('Failed to fetch tag:', error);
  }
  return null;
}

async function getTagPosts(slug: string) {
  try {
    const res = await api.get(`/posts`, {
      params: {
        'filters[tags][slug][$eq]': slug,
        'sort[0]': 'createdAt:desc',
        'populate': '*'
      }
    });
    if (res.status === 200) {
      return {
        data: res.data.data,
        meta: res.data.meta
      };
    }
  } catch (error) {
    console.error('Failed to fetch tag posts:', error);
  }
  return { data: [], meta: { pagination: { total: 0 } } };
}

export async function generateMetadata(
  { params }: TagPageProps
): Promise<Metadata> {
  const tag = await getTag(params.slug);
  
  return {
    title: `${tag?.attributes?.name || '标签'} - 张晓刚的个人网站`,
    description: `查看标签 ${tag?.attributes?.name} 下的所有文章`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const tag = await getTag(params.slug);
  const { data: posts, meta } = await getTagPosts(params.slug);

  if (!tag) {
    notFound();
  }

  return <TagPosts tag={tag} posts={posts} meta={meta} />;
} 