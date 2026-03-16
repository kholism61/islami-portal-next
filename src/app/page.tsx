import HomeClient from "@/components/core/HomeClient";
import { listArticles } from "@/lib/articles";

export default function Home() {
  const articles = listArticles("id").slice(0, 18);
  return <HomeClient articles={articles} />;
}
