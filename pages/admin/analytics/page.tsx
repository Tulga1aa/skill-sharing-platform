"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Users, Eye, Heart, MessageCircle, Calendar } from "lucide-react"

interface AnalyticsData {
  totalViews: number
  totalLikes: number
  totalComments: number
  totalAuthors: number
  popularArticles: Array<{
    id: string
    title: string
    views: number
    likes: number
    author: string
  }>
  monthlyStats: Array<{
    month: string
    articles: number
    views: number
    likes: number
  }>
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = () => {
      setLoading(true)
      try {
        // localStorage-с мэдээлэл авах
        const savedArticles = localStorage.getItem("articles")
        const articles = savedArticles ? JSON.parse(savedArticles) : []

        // Статистик тооцоолох
        const totalViews = articles.reduce((sum: number, article: any) => sum + (article.views || 0), 0)
        const totalLikes = articles.reduce((sum: number, article: any) => sum + (article.likes || 0), 0)
        const totalComments = articles.reduce((sum: number, article: any) => sum + (article.comments?.length || 0), 0)

        // Зохиогчдын тоо
        const authors = new Set(articles.map((article: any) => article.author?.id))
        const totalAuthors = authors.size

        // Алдартай нийтлэлүүд
        const popularArticles = articles
          .sort((a: any, b: any) => (b.views || 0) - (a.views || 0))
          .slice(0, 5)
          .map((article: any) => ({
            id: article.id,
            title: article.title,
            views: article.views || 0,
            likes: article.likes || 0,
            author: article.author?.name || "Тодорхойгүй",
          }))

        // Сарын статистик (mock data)
        const monthlyStats = [
          { month: "1-р сар", articles: 8, views: 12500, likes: 450 },
          { month: "2-р сар", articles: 12, views: 18200, likes: 680 },
          { month: "3-р сар", articles: 15, views: 22100, likes: 820 },
          { month: "4-р сар", articles: 18, views: 28500, likes: 950 },
          { month: "5-р сар", articles: 22, views: 35200, likes: 1200 },
        ]

        setAnalytics({
          totalViews,
          totalLikes,
          totalComments,
          totalAuthors,
          popularArticles,
          monthlyStats,
        })
      } catch (error) {
        console.error("Error fetching analytics:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Статистик</h1>
          <p className="text-gray-600">Платформын дэлгэрэнгүй статистик</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Статистик</h1>
          <p className="text-gray-600">Мэдээлэл олдсонгүй</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Статистик</h1>
        <p className="text-gray-600">Платформын дэлгэрэнгүй статистик мэдээлэл</p>
      </div>

      {/* Ерөнхий статистик */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Нийт үзэлт</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% өмнөх сараас</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Нийт like</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalLikes.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8% өмнөх сараас</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Нийт сэтгэгдэл</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalComments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+15% өмнөх сараас</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Нийт зохиогч</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalAuthors}</div>
            <p className="text-xs text-muted-foreground">+3 энэ сараас</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Алдартай нийтлэлүүд */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Алдартай нийтлэлүүд
            </CardTitle>
            <CardDescription>Хамгийн их үзэлттэй нийтлэлүүд</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.popularArticles.map((article, index) => (
                <div key={article.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">#{index + 1}</Badge>
                      <span className="font-medium text-sm">{article.title}</span>
                    </div>
                    <p className="text-xs text-gray-500">Зохиогч: {article.author}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{article.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        <span>{article.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Сарын статистик */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Сарын статистик
            </CardTitle>
            <CardDescription>Сүүлийн 5 сарын үзүүлэлт</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.monthlyStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="font-medium">{stat.month}</div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <BarChart3 className="h-3 w-3" />
                      <span>{stat.articles} нийтлэл</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{stat.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      <span>{stat.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
