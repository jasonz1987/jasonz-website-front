
import api from "../axios/api";
import Rss from "rss";
import { getPosts } from "../data/post.data";

const SITE_URL = "https://www.jason-z.com";

function truncateHTML(htmlString, maxLength) {
    // 移除所有 HTML 标签
    const plainText = htmlString.replace(/<[^>]*>/g, '');
  
    // 截取前 maxLength 个字符
    const truncatedText = plainText.substring(0, maxLength);
  
    return truncatedText;
  }

export async function GET() {
    const posts = await getPosts();
  
    const feed = new Rss({
      title: "张晓刚的博客",
      description: "学习，记录，思考，分享",
      feed_url: `${SITE_URL}/rss.xml`,
      site_url: SITE_URL,
      language: "en",
    });
  
    posts.forEach((post) => {
      feed.item({
        title: post.attributes.title,
        description: truncateHTML(post.attributes.content,100),
        url: `${SITE_URL}/posts/${post.attributes.slug}`,
        guid: `${SITE_URL}/posts/${post.id}`,
        date: post.publishedAt,
      });
    });
  
    return new Response(feed.xml(), {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  }