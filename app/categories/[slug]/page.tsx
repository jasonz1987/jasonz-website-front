import { Metadata } from "next";
import { notFound } from "next/navigation";
import api from "../../axios/api";
import CategoryPosts from "./category-posts";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

async function getCategory(slug: string) {
  try {
    const res = await api.get(`/categories/${slug}?populate=*`);
    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.error('Failed to fetch category:', error);
  }
  return null;
}

async function getCategoryPosts(slug: string) {
  try {
    const res = await api.get(`/posts`, {
      params: {
        'filters[category][slug][$eq]': slug,
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
    console.error('Failed to fetch category posts:', error);
  }
  return { data: [], meta: { pagination: { total: 0 } } };
}

export async function generateMetadata(
  { params }: CategoryPageProps
): Promise<Metadata> {
  const category = await getCategory(params.slug);
  
  return {
    title: `${category?.attributes?.name || '分类'} - 张晓刚的个人网站`,
    description: `查看分类 ${category?.attributes?.name} 下的所有文章`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await getCategory(params.slug);
  const { data: posts, meta } = await getCategoryPosts(params.slug);

  if (!category) {
    notFound();
  }

  return <CategoryPosts category={category} posts={posts} meta={meta} />;
} 