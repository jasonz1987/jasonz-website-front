import api from "../axios/api";

export async function getPosts() {
  // 使用 fetch 或其他方法从 API 获取文章数据
  try {
    const res = await api.get("/posts?sort[0]=createdAt:desc");
    if (res.status == 200) {
      return res.data.data;
    }
  } catch (e) {}

  return [];
}