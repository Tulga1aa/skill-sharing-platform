"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, XCircle, Clock, Eye } from "lucide-react"
import Link from "next/link"

interface Article {
  id: string
  title: string
  author: {
    name: string
    id: string
  }
  status: "published" | "pending" | "rejected"
  submittedAt: string
  views: number
  excerpt: string
}

export default function PendingArticlesPage() {
  const { toast } = useToast()
  const [pendingArticles, setPendingArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Хүлээгдэж буй нийтлэлүүд авах
    const fetchPendingArticles = () => {
      setLoading(true)
      try {
        // localStorage-с нийтлэлүүд хайх
        const savedArticles = localStorage.getItem("articles")
        const articles = savedArticles ? JSON.parse(savedArticles) : []

        // Зөвхөн хүлээгдэж буй нийтлэлүүдийг шүүх
        const pendingArticles = articles.filter((article: any) => article.status === "pending")

        if (pendingArticles.length > 0) {
          setPendingArticles(pendingArticles)
        } else {
          // Хэрэв нийтлэл байхгүй бол mock data ашиглах
          setPendingArticles([
            {
              id: "1",
              title: "Next.js 15-ийн шинэ боломжууд",
              author: {
                name: "Сарангэрэл",
                id: "2",
              },
              status: "pending",
              submittedAt: "2024-05-25",
              views: 0,
              excerpt: "Next.js 15 хувилбарт орсон шинэ боломжууд, App Router-ийн сайжруулалт...",
            },
            {
              id: "2",
              title: "TypeScript-ийн Advanced Types",
              author: {
                name: "Энхбаяр",
                id: "3",
              },
              status: "pending",
              submittedAt: "2024-05-24",
              views: 0,
              excerpt: "TypeScript-ийн нарийн төвөгтэй төрлүүд, Generic constraints...",
            },
            {
              id: "3",
              title: "MongoDB vs PostgreSQL: Аль нь илүү сайн?",
              author: {
                name: "Батбаяр",
                id: "1",
              },
              status: "pending",
              submittedAt: "2024-05-23",
              views: 0,
              excerpt: "Өгөгдлийн сангийн сонголт хийхэд анхаарах ёстой зүйлс...",
            },
          ])
        }
      } catch (error) {
        console.error("Error fetching pending articles:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPendingArticles()
  }, [])

  // Нийтлэл батлах үйлдэл
  const approveArticle = (articleId: string) => {
    try {
      // localStorage-с нийтлэлүүд хайх
      const savedArticles = localStorage.getItem("articles")
      const articles = savedArticles ? JSON.parse(savedArticles) : []

      // Нийтлэлийн статусыг шинэчлэх
      const updatedArticles = articles.map((article: any) => {
        if (article.id === articleId) {
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

      // UI шинэчлэх
      setPendingArticles((prev) =>
        prev.map((article) => (article.id === articleId ? { ...article, status: "published" as const } : article)),
      )

      toast({
        title: "Нийтлэл батлагдлаа",
        description: "Нийтлэл амжилттай батлагдаж, нийтлэгдлээ.",
      })
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
  const rejectArticle = (articleId: string) => {
    try {
      // localStorage-с нийтлэлүүд хайх
      const savedArticles = localStorage.getItem("articles")
      const articles = savedArticles ? JSON.parse(savedArticles) : []

      // Нийтлэлийн статусыг шинэчлэх
      const updatedArticles = articles.map((article: any) => {
        if (article.id === articleId) {
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

      // UI шинэчлэх
      setPendingArticles((prev) =>
        prev.map((article) => (article.id === articleId ? { ...article, status: "rejected" as const } : article)),
      )

      toast({
        title: "Нийтлэл цуцлагдлаа",
        description: "Нийтлэл цуцлагдлаа.",
      })
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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Хүлээгдэж буй нийтлэлүүд</h1>
          <p className="text-gray-600">Хянах шаардлагатай нийтлэлүүд</p>
        </div>
        <Card className="animate-pulse">
          <CardContent className="p-6">
            <div className="h-64 bg-gray-200 rounded"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Хүлээгдэж буй нийтлэлүүд</h1>
        <p className="text-gray-600">Хянах шаардлагатай нийтлэлүүд ({pendingArticles.length})</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Нийтлэлүүдийг хянах</CardTitle>
          <CardDescription>Нийтлэлүүдийг хянаж, батлах эсвэл цуцлах</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Гарчиг</TableHead>
                <TableHead>Зохиогч</TableHead>
                <TableHead>Огноо</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Үйлдэл</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingArticles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{article.title}</div>
                      <div className="text-sm text-gray-500 mt-1">{article.excerpt}</div>
                    </div>
                  </TableCell>
                  <TableCell>{article.author.name}</TableCell>
                  <TableCell>{article.submittedAt}</TableCell>
                  <TableCell>
                    {article.status === "pending" ? (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-yellow-500 mr-1" />
                        <span>Хүлээгдэж буй</span>
                      </div>
                    ) : article.status === "published" ? (
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        <span>Батлагдсан</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <XCircle className="h-4 w-4 text-red-500 mr-1" />
                        <span>Цуцлагдсан</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/preview/${article.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Харах
                        </Button>
                      </Link>
                      {article.status === "pending" && (
                        <>
                          <Button variant="default" size="sm" onClick={() => approveArticle(article.id)}>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Батлах
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => rejectArticle(article.id)}>
                            <XCircle className="h-4 w-4 mr-1" />
                            Цуцлах
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
