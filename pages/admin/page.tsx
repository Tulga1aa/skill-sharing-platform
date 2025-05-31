"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, Clock, Users, DollarSign, Eye, BarChart3, FileText, TrendingUp } from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  totalArticles: number
  pendingArticles: number
  totalAuthors: number
  totalViews: number
  monthlyEarnings: number
  todayViews: number
}

interface RecentActivity {
  id: string
  type: "article_submitted" | "article_approved" | "author_joined"
  title: string
  author: string
  time: string
}

export default function AdminDashboard() {
  const { toast } = useToast()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const calculateStats = () => {
      try {
        const savedArticles = localStorage.getItem("articles")
        const articles = savedArticles ? JSON.parse(savedArticles) : []

        const totalArticles = articles.length
        const pendingArticles = articles.filter((a: any) => a.status === "pending").length
        const publishedArticles = articles.filter((a: any) => a.status === "published").length

        // Зохиогчдын тоо тооцоолох
        const authors = new Set(articles.map((a: any) => a.author?.id)).size

        // Нийт үзэлт тооцоолох
        const totalViews = articles.reduce((sum: number, a: any) => sum + (a.views || 0), 0)

        setStats({
          totalArticles,
          pendingArticles,
          totalAuthors: authors,
          totalViews,
          monthlyEarnings: publishedArticles * 10000,
          todayViews: Math.floor(totalViews * 0.1),
        })
      } catch (error) {
        console.error("Error calculating stats:", error)
      }
    }

    calculateStats()
  }, [])

  useEffect(() => {
    // Mock data loading
    setTimeout(() => {
      setRecentActivity([
        {
          id: "1",
          type: "article_submitted",
          title: "Next.js 15-ийн шинэ боломжууд",
          author: "Сарангэрэл",
          time: "2 цагийн өмнө",
        },
        {
          id: "2",
          type: "article_approved",
          title: "React Server Components",
          author: "Батбаяр",
          time: "4 цагийн өмнө",
        },
        {
          id: "3",
          type: "author_joined",
          title: "Шинэ зохиогч бүртгүүллээ",
          author: "Болдбаяр",
          time: "6 цагийн өмнө",
        },
        {
          id: "4",
          type: "article_submitted",
          title: "TypeScript Advanced Types",
          author: "Энхбаяр",
          time: "8 цагийн өмнө",
        },
      ])

      setLoading(false)
    }, 1000)
  }, [])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "article_submitted":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "article_approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "author_joined":
        return <Users className="h-4 w-4 text-blue-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  const getActivityText = (type: string) => {
    switch (type) {
      case "article_submitted":
        return "Нийтлэл илгээгдлээ"
      case "article_approved":
        return "Нийтлэл батлагдлаа"
      case "author_joined":
        return "Шинэ зохиогч"
      default:
        return "Үйл ажиллагаа"
    }
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Хяналтын самбар</h1>
          <p className="text-gray-600">Админ удирдлагын ерөнхий мэдээлэл</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Хяналтын самбар</h1>
        <p className="text-gray-600">Админ удирдлагын ерөнхий мэдээлэл</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Нийт нийтлэл</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalArticles}</div>
            <p className="text-xs text-muted-foreground">+5 энэ сараас</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Хүлээгдэж буй</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.pendingArticles}</div>
            <p className="text-xs text-muted-foreground">Хянах шаардлагатай</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Нийт зохиогч</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalAuthors}</div>
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
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/admin/articles/pending">
          <Button className="w-full h-16 flex flex-col items-center justify-center">
            <Clock className="h-5 w-5 mb-1" />
            Хүлээгдэж буй нийтлэлүүд
          </Button>
        </Link>
        <Link href="/admin/authors">
          <Button variant="outline" className="w-full h-16 flex flex-col items-center justify-center">
            <Users className="h-5 w-5 mb-1" />
            Зохиогчид
          </Button>
        </Link>
        <Link href="/admin/payments">
          <Button variant="outline" className="w-full h-16 flex flex-col items-center justify-center">
            <DollarSign className="h-5 w-5 mb-1" />
            Цалин бодолт
          </Button>
        </Link>
        <Link href="/admin/analytics">
          <Button variant="outline" className="w-full h-16 flex flex-col items-center justify-center">
            <BarChart3 className="h-5 w-5 mb-1" />
            Статистик
          </Button>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Сүүлийн үйл ажиллагаа</CardTitle>
            <CardDescription>Системийн сүүлийн үйл ажиллагаанууд</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{getActivityText(activity.type)}</p>
                    <p className="text-sm text-gray-500 truncate">
                      {activity.title} - {activity.author}
                    </p>
                  </div>
                  <div className="text-sm text-gray-400">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Энэ сарын статистик</CardTitle>
            <CardDescription>2024 оны 5-р сарын үзүүлэлт</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Өнөөдрийн үзэлт</span>
                </div>
                <span className="text-sm font-bold">{stats?.todayViews.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Сарын цалин</span>
                </div>
                <span className="text-sm font-bold">₮{stats?.monthlyEarnings.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium">Шинэ нийтлэл</span>
                </div>
                <span className="text-sm font-bold">8</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">Шинэ зохиогч</span>
                </div>
                <span className="text-sm font-bold">3</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
