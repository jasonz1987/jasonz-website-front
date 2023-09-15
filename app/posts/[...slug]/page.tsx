import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import api from "../../axios/api";
import Article from "./article";

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



export async function generateMetadata(
  { params }: PostProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const res = await api.get("/posts/" + slug);

  let post = null;

  if (res?.status == 200) {
    post = res.data.data;
  }

  return {
    title: `${post?.attributes?.title}  - 张晓刚的个人网站`,
  };
}

export default async function Post({params}: PostProps) {
  const slug = params.slug;
  const res = await api.get("/posts/" + slug);

  let post = null;

  if (res?.status == 200) {
    post = res.data.data;
  }

  if (!res.status) {
    notFound();
  }

  return <Article post={post} />
}
