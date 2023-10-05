import api from "./axios/api";
 
const URL = "https://www.jason-z.com";

async function getPosts() {
    // 使用 fetch 或其他方法从 API 获取文章数据
    try {
      const res = await api.get("/posts?sort[0]=createdAt:desc");
      console.log(res);
      if (res.status == 200) {
        return res.data.data;
      }
    } catch (e) {}
  
    return [];
  }
 
export default async function sitemap() {
    const postsData = await getPosts();

    console.log(postsData);

    const posts = postsData.map(({ id, attributes}) => ({
        url: `${URL}/posts/${attributes?.slug}`,
        lastModified: attributes?.updatedAt,
    }));
    
 
    const routes = ["","/blog"].map((route) => ({
        url: `${URL}${route}`,
        lastModified: new Date().toISOString(),
    }));
    
    return [...routes, ...posts];
}