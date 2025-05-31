"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, UserPlus, Mail, Ban, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Author {
  id: string
  name: string
  email: string
  avatar: string
  reputation: number
  articlesCount: number
  status: "active" | "banned" | "pending"
  joinedAt: string
  lastActive: string
}

export default function AuthorsPage() {
  const { toast } = useToast()
  const [authors, setAuthors] = useState<Author[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAuthors = () => {
      setLoading(true)
      try {
        // localStorage-с зохиогчдын мэдээлэл авах
        const savedArticles = localStorage.getItem("articles")
        const articles = savedArticles ? JSON.parse(savedArticles) : []

        // Зохиогчдын жагсаалт гаргах
        const authorsMap = new Map()

        articles.forEach((article: any) => {
          if (article.author) {
            const authorId = article.author.id
            if (authorsMap.has(authorId)) {
              const author = authorsMap.get(authorId)
              author.articlesCount += 1
            } else {
              authorsMap.set(authorId, {
                id: authorId,
                name: article.author.name,
                email: `${article.author.name.toLowerCase()}@techblog.com`,
                avatar: article.author.avatar,
                reputation: article.author.reputation || 0,
                articlesCount: 1,
                status: "active",
                joinedAt: "2024-01-01",
                lastActive: "2024-05-25",
              })
            }
          }
        })

        // Mock зохиогчид нэмэх
        if (authorsMap.size === 0) {
          const mockAuthors = [
            {
              id: "1",
              name: "Батбаяр",
              email: "batbayar@techblog.com",
              avatar: "/placeholder.svg?height=40&width=40",
              reputation: 1250,
              articlesCount: 8,
              status: "active",
              joinedAt: "2024-01-15",
              lastActive: "2024-05-25",
            },
            {
              id: "2",
              name: "Сарангэрэл",
              email: "sarangerel@techblog.com",
              avatar: "/placeholder.svg?height=40&width=40",
              reputation: 980,
              articlesCount: 5,
              status: "active",
              joinedAt: "2024-02-10",
              lastActive: "2024-05-24",
            },
            {
              id: "3",
              name: "Энхбаяр",
              email: "enhbayar@techblog.com",
              avatar: "/placeholder.svg?height=40&width=40",
              reputation: 1580,
              articlesCount: 12,
              status: "active",
              joinedAt: "2024-01-05",
              lastActive: "2024-05-25",
            },
          ]
          setAuthors(mockAuthors)
        } else {
          setAuthors(Array.from(authorsMap.values()))
        }
      } catch (error) {
        console.error("Error fetching authors:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAuthors()
  }, [])

  const filteredAuthors = authors.filter(
    (author) =>
      author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      author.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const banAuthor = (authorId: string) => {
    setAuthors((prev) =>
      prev.map((author) => (author.id === authorId ? { ...author, status: "banned" as const } : author)),
    )
    toast({
      title: "Зохиогч хориглогдлоо",
      description: "Зохиогч амжилттай хориглогдлоо.",
    })
  }

  const unbanAuthor = (authorId: string) => {
    setAuthors((prev) =>
      prev.map((author) => (author.id === authorId ? { ...author, status: "active" as const } : author)),
    )
    toast({
      title: "Хориг цуцлагдлаа",
      description: "Зохиогчийн хориг амжилттай цуцлагдлаа.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Идэвхтэй</Badge>
      case "banned":
        return <Badge variant="destructive">Хориглогдсон</Badge>
      case "pending":
        return <Badge variant="secondary">Хүлээгдэж буй</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Зохиогчид</h1>
          <p className="text-gray-600">Бүртгэлтэй зохиогчдын жагсаалт</p>
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Зохиогчид</h1>
          <p className="text-gray-600">Бүртгэлтэй зохиогчдын жагсаалт ({authors.length})</p>
        </div>
        <Button className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Зохиогч нэмэх
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Зохиогчдын удирдлага</CardTitle>
          <CardDescription>Зохиогчдын мэдээлэл, статус удирдах</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Зохиогч хайх..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Зохиогч</TableHead>
                <TableHead>И-мэйл</TableHead>
                <TableHead>Reputation</TableHead>
                <TableHead>Нийтлэл</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Сүүлд идэвхтэй</TableHead>
                <TableHead className="text-right">Үйлдэл</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAuthors.map((author) => (
                <TableRow key={author.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
                        <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{author.name}</div>
                        <div className="text-sm text-gray-500">Нэгдсэн: {author.joinedAt}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{author.email}</TableCell>
                  <TableCell>
                    <span className="font-medium text-green-600">{author.reputation}</span>
                  </TableCell>
                  <TableCell>{author.articlesCount}</TableCell>
                  <TableCell>{getStatusBadge(author.status)}</TableCell>
                  <TableCell>{author.lastActive}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-1" />
                        И-мэйл
                      </Button>
                      {author.status === "active" ? (
                        <Button variant="destructive" size="sm" onClick={() => banAuthor(author.id)}>
                          <Ban className="h-4 w-4 mr-1" />
                          Хориглох
                        </Button>
                      ) : (
                        <Button variant="default" size="sm" onClick={() => unbanAuthor(author.id)}>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Хориг цуцлах
                        </Button>
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
