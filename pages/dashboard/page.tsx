"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { PenTool, Eye, Heart, MessageCircle, TrendingUp, Clock, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"

interface DashboardStats {
  totalArticles: number
  totalViews: number
  totalLikes: number
  totalComments: number
  reputation: number
  monthlyEarnings: number
}

interface Article {
  id: string
  title: string
  status: "published" | "pending" | "draft"
  views: number
  likes: number
  comments: number
  publishedAt: string
}

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/signin")
      return
    }

    // Mock data loading
    setLoading(true)
    try {
      // localStorage-с хэрэглэгчийн нийтлэлүүд хайх
      const savedArticles = localStorage.getItem("articles")
      const allArticles = savedArticles ? JSON.parse(savedArticles) : []

      // Хэрэглэгчийн нийтлэлүүдийг шүүх
      const userArticles = allArticles.filter((article: any) => article.author?.id === user.id)

      if (userArticles.length > 0) {
        setArticles(userArticles)

        // Статистик тооцоолох
        const totalViews = userArticles.reduce((sum: number, article: any) => sum + (article.views || 0), 0)
        const totalLikes = userArticles.reduce((sum: number, article: any) => sum + (article.likes || 0), 0)
        const totalComments = userArticles.reduce(
          (sum: number, article: any) => sum + (article.comments?.length || 0),
          0,
        )

        setStats({
          totalArticles: userArticles.length,
          totalViews: totalViews,
          totalLikes: totalLikes,
          totalComments: totalComments,
          reputation: user.reputation,
          monthlyEarnings: totalLikes * 500 + totalComments * 200, // Орлого тооцоолох
        })
      } else {
        // Хэрэв нийтлэл байхгүй бол mock data ашиглах
        setStats({
          totalArticles: 12,
          totalViews: 15420,
          totalLikes: 892,
          totalComments: 234,
          reputation: user.reputation,
          monthlyEarnings: 45000,
        })

        setArticles([
          {
            id: "1",
            title: "React Server Components-ийн ашиглалт",
            status: "published",
            views: 1420,
            likes: 89,
            comments: 23,
            publishedAt: "2024-01-15",
          },
          {
            id: "2",
            title: "Next.js 15-ийн шинэ боломжууд",
            status: "pending",
            views: 0,
            likes: 0,
            comments: 0,
            publishedAt: "",
          },
          {
            id: "3",
            title: "TypeScript-ийн Advanced Types",
            status: "draft",
            views: 0,
            likes: 0,
            comments: 0,
            publishedAt: "",
          },
        ])
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error)

      // Алдаа гарвал mock data ашиглах
      setStats({
        totalArticles: 12,
        totalViews: 15420,
        totalLikes: 892,
        totalComments: 234,
        reputation: user.reputation,
        monthlyEarnings: 45000,
      })

      setArticles([
        {
          id: "1",
          title: "React Server Components-ийн ашиглалт",
          status: "published",
          views: 1420,
          likes: 89,
          comments: 23,
          publishedAt: "2024-01-15",
        },
        {
          id: "2",
          title: "Next.js 15-ийн шинэ боломжууд",
          status: "pending",
          views: 0,
          likes: 0,
          comments: 0,
          publishedAt: "",
        },
        {
          id: "3",
          title: "TypeScript-ийн Advanced Types",
          status: "draft",
          views: 0,
          likes: 0,
          comments: 0,
        },
      ])
    } finally {
      setLoading(false)
    }
  }, [user, router])

  const editArticle = (articleId: string) => {
    router.push(`/write?edit=${articleId}`)
  }

  const deleteArticle = (articleId: string) => {
    try {
      const savedArticles = localStorage.getItem("articles")
      const articles = savedArticles ? JSON.parse(savedArticles) : []

      const updatedArticles = articles.filter((article: any) => article.id !== articleId)
      localStorage.setItem("articles", JSON.stringify(updatedArticles))

      setArticles((prev) => prev.filter((article) => article.id !== articleId))

      toast({
        title: "Нийтлэл устгагдлаа",
        description: "Нийтлэл амжилттай устгагдлаа.",
      })
    } catch (error) {
      toast({
        title: "Алдаа гарлаа",
        description: "Нийтлэл устгахад алдаа гарлаа.",
        variant: "destructive",
      })
    }
  }

  if (!user) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "draft":
        return <XCircle className="h-4 w-4 text-gray-500" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "published":
        return "Нийтлэгдсэн"
      case "pending":
        return "Хүлээгдэж байгаа"
      case "draft":
        return "Ноорог"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Хяналтын самбар</h1>
          <p className="text-gray-600">Сайн байна уу, {user.name}! Таны статистикийг харцгаая.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Нийт нийтлэл</CardTitle>
              <PenTool className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalArticles}</div>
              <p className="text-xs text-muted-foreground">+2 энэ сараас</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Нийт үзэлт</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% өмнөх сараас</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reputation</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.reputation}</div>
              <p className="text-xs text-muted-foreground">+45 энэ сараас</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Сарын орлого</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₮{stats?.monthlyEarnings.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+8% өмнөх сараас</p>
            </CardContent>
          </Card>
        </div>

        {/* Articles Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Миний нийтлэлүүд</CardTitle>
                <CardDescription>Таны бичсэн нийтлэлүүдийн жагсаалт</CardDescription>
              </div>
              <Link href="/write">
                <Button>
                  <PenTool className="h-4 w-4 mr-2" />
                  Шинэ нийтлэл
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">Бүгд</TabsTrigger>
                <TabsTrigger value="published">Нийтлэгдсэн</TabsTrigger>
                <TabsTrigger value="pending">Хүлээгдэж байгаа</TabsTrigger>
                <TabsTrigger value="draft">Ноорог</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {articles.map((article) => (
                  <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(article.status)}
                        <Badge
                          variant={
                            article.status === "published"
                              ? "default"
                              : article.status === "pending"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {getStatusText(article.status)}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{article.title}</h3>
                      {article.status === "published" && (
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{article.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            <span>{article.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" />
                            <span>{article.comments}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => editArticle(article.id)}>
                        Засах
                      </Button>
                      {article.status === "published" && (
                        <Link href={`/articles/${article.id}`}>
                          <Button variant="ghost" size="sm">
                            Харах
                          </Button>
                        </Link>
                      )}
                      <Button variant="destructive" size="sm" onClick={() => deleteArticle(article.id)}>
                        Устгах
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="published">
                {articles
                  .filter((a) => a.status === "published")
                  .map((article) => (
                    <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{article.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{article.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            <span>{article.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" />
                            <span>{article.comments}</span>
                          </div>
                        </div>
                      </div>
                      <Link href={`/articles/${article.id}`}>
                        <Button variant="ghost" size="sm">
                          Харах
                        </Button>
                      </Link>
                      <Button variant="destructive" size="sm" onClick={() => deleteArticle(article.id)}>
                        Устгах
                      </Button>
                    </div>
                  ))}
              </TabsContent>

              <TabsContent value="pending">
                {articles
                  .filter((a) => a.status === "pending")
                  .map((article) => (
                    <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{article.title}</h3>
                        <p className="text-sm text-gray-500">Хянагдаж байна...</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => editArticle(article.id)}>
                        Засах
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => deleteArticle(article.id)}>
                        Устгах
                      </Button>
                    </div>
                  ))}
              </TabsContent>

              <TabsContent value="draft">
                {articles
                  .filter((a) => a.status === "draft")
                  .map((article) => (
                    <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{article.title}</h3>
                        <p className="text-sm text-gray-500">Ноорог</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => editArticle(article.id)}>
                          Засах
                        </Button>
                        <Button size="sm">Нийтлэх</Button>
                        <Button variant="destructive" size="sm" onClick={() => deleteArticle(article.id)}>
                          Устгах
                        </Button>
                      </div>
                    </div>
                  ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
