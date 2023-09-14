import {
  Heading,


  Stack
} from "@chakra-ui/react";
import { format } from "date-fns";
import api from "../axios/api";


async function getPage() {
  // 使用 fetch 或其他方法从 API 获取文章数据
  try {
    const res = await api.get("/about");

    console.log(res);
  
    if (res.status == 200) {
      return res.data.data;
    }
  } catch (e) {
    console.log(e);
  }
 

  return null;
}

function covertDate(dateString:string) {
  const dateObject = new Date(dateString);

  // 使用 date-fns 的 format 函数来格式化日期
  const formattedDate = format(dateObject, "yyyy年MM月dd日");
  return formattedDate;
}

// export async function generateStaticParams(): Promise<PostProps["params"][]> {
//   return allPosts.map((post) => ({
//     slug: post.slugAsParams.split("/"),
//   }))
// }

export default async function Blog() {
  const page = await getPage();

  return (
    <article className="article">
      <Stack py={20} px={5}>
        <Heading mb={10}>{page?.attributes?.title || ""}</Heading>

        {page?.attributes?.content && (
          <Stack mt={10}>
            <div
              dangerouslySetInnerHTML={{ __html: page.attributes.content }}
            />
          </Stack>
        )}
      </Stack>
    </article>
  );
}
