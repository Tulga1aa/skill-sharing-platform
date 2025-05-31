import { ArticleView } from "@/components/article-view"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ArticlePage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ArticleView articleId={params.id} />
      <Footer />
    </div>
  )
}
