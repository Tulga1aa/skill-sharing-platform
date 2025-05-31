"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react"

interface Article {
  id: string
  title: string
  content: string
  author: {
    name: string
    avatar: string
    reputation: number
  }
  submittedAt: string
  tags: string[]
}

export default function ArticlePreviewPage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/signin")
      return
    }

    if (user.role !== "admin") {
      toast({
        title: "Хандах эрхгүй",
        description: "Танд админ эрх байхгүй байна.",
        variant: "destructive",
      })
      router.push("/")
      return
    }

    // Нийтлэл авах
    const fetchArticle = () => {
      setLoading(true)
      try {
        // localStorage-с нийтлэлүүд хайх
        const savedArticles = localStorage.getItem("articles")
        const articles = savedArticles ? JSON.parse(savedArticles) : []

        // Нийтлэл хайх
        const foundArticle = articles.find((article: any) => article.id === params.id)

        if (foundArticle) {
          setArticle(foundArticle)
        } else {
          // Хэрэв нийтлэл олдохгүй бол mock data ашиглах
          setArticle({
            id: params.id,
            title: "Next.js 15-ийн шинэ боломжууд",
            content: `
# Next.js 15-ийн шинэ боломжууд

Next.js 15 нь React фреймворкийн хамгийн сүүлийн хувилбар бөгөөд олон шинэ боломжуудыг авчирсан. Энэ нийтлэлд бид Next.js 15-ийн гол шинэчлэлүүдийг авч үзэх болно.

## App Router сайжруулалт

App Router нь Next.js 13-аас эхлэн нэвтрүүлсэн шинэ routing систем юм. Next.js 15-д энэ нь илүү сайжирч:

- Хурдан хуудас ачаалалт
- Илүү сайн кэш менежмент
- Серверийн компонентуудын оновчлол

## Turbopack сайжруулалт

Turbopack нь Webpack-ийн оронд ашиглагдах Rust дээр бичигдсэн шинэ bundler юм:

- 10x хурдан dev build
- 4x хурдан production build
- Илүү сайн memory ашиглалт

## Server Actions

Server Actions нь серверийн талд ажиллах функцуудыг шууд дуудах боломжийг олгодог:

\`\`\`jsx
// app/actions.js
'use server'

export async function submitForm(formData) {
  // Server-side logic
  const name = formData.get('name')
  await saveToDatabase(name)
  return { success: true }
}
\`\`\`

## Middleware сайжруулалт

Middleware нь хүсэлт бүрийг боловсруулах боломжийг олгодог:

\`\`\`jsx
// middleware.js
export function middleware(request) {
  const currentUser = request.cookies.get('currentUser')
  
  if (!currentUser && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
\`\`\`

## Дүгнэлт

Next.js 15 нь веб хөгжүүлэлтийн ирээдүй юм. Энэ технологийг ашиглаж сурснаар илүү хурдан, найдвартай веб аппликейшн бүтээх боломжтой болно.
          `,
            author: {
              name: "Сарангэрэл",
              avatar: "/placeholder.svg?height=40&width=40",
              reputation: 980,
            },
            submittedAt: "2024-05-25",
            tags: ["Next.js", "React", "Web Development"],
          })
        }
      } catch (error) {
        console.error("Error fetching article:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [user, router, toast, params.id])

  // Нийтлэл батлах үйлдэл
  const approveArticle = () => {
    try {
      // localStorage-с нийтлэлүүд хайх
      const savedArticles = localStorage.getItem("articles")
      const articles = savedArticles ? JSON.parse(savedArticles) : []

      // Нийтлэлийн статусыг шинэчлэх
      const updatedArticles = articles.map((article: any) => {
        if (article.id === params.id) {
          return {
            ...article,
            status: "published",
            publishedAt: new Date().toISOString(),
          }
        }
        return article
      })

      // localStorage-д хадгалах
      localStorage.setItem("articles", JSON.stringify(updatedArticles))

      toast({
        title: "Нийтлэл батлагдлаа",
        description: "Нийтлэл амжилттай батлагдаж, үндсэн сайт дээр нийтлэгдлээ.",
      })

      // Redirect back to admin panel
      setTimeout(() => {
        router.push("/admin")
      }, 1500)
    } catch (error) {
      console.error("Error approving article:", error)
      toast({
        title: "Алдаа гарлаа",
        description: "Нийтлэл батлахад алдаа гарлаа.",
        variant: "destructive",
      })
    }
  }

  // Нийтлэл цуцлах үйлдэл
  const rejectArticle = () => {
    try {
      // localStorage-с нийтлэлүүд хайх
      const savedArticles = localStorage.getItem("articles")
      const articles = savedArticles ? JSON.parse(savedArticles) : []

      // Нийтлэлийн статусыг шинэчлэх
      const updatedArticles = articles.map((article: any) => {
        if (article.id === params.id) {
          return {
            ...article,
            status: "rejected",
            rejectedAt: new Date().toISOString(),
          }
        }
        return article
      })

      // localStorage-д хадгалах
      localStorage.setItem("articles", JSON.stringify(updatedArticles))

      toast({
        title: "Нийтлэл цуцлагдлаа",
        description: "Нийтлэл цуцлагдаж, зохиогчид мэдэгдэл илгээгдлээ.",
      })

      // Redirect back to admin panel
      setTimeout(() => {
        router.push("/admin")
      }, 1500)
    } catch (error) {
      console.error("Error rejecting article:", error)
      toast({
        title: "Алдаа гарлаа",
        description: "Нийтлэл цуцлахад алдаа гарлаа.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Нийтлэл олдсонгүй</h1>
          <p className="text-gray-600">Уучлаарай, хайж байгаа нийтлэл олдсонгүй.</p>
          <Button className="mt-4" onClick={() => router.push("/admin")}>
            Буцах
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.push("/admin")} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Буцах
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Нийтлэл хянах</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={article.author.avatar || "/placeholder.svg"} alt={article.author.name} />
                  <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-900">{article.author.name}</p>
                  <p className="text-sm text-gray-500">Reputation: {article.author.reputation}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">Илгээсэн: {article.submittedAt}</div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="border-t border-b border-gray-200 py-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">{article.title}</h1>
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, "<br>") }} />
              </div>
            </div>

            <div className="flex items-center justify-end gap-4">
              <Button variant="destructive" onClick={rejectArticle} className="flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                Цуцлах
              </Button>
              <Button onClick={approveArticle} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Батлах
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
