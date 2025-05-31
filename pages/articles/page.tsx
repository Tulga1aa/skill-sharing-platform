"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArticleList } from "@/components/article-list"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter } from "lucide-react"

const categories = ["Бүгд", "React", "JavaScript", "TypeScript", "Next.js", "Frontend", "Backend"]

// Mock articles data (replace with your actual data source)
const mockArticles = [
  {
    id: 1,
    title: "React-ийн талаархи бүх зүйл",
    excerpt: "React бол хэрэглэгчийн интерфейс бүтээхэд зориулагдсан JavaScript сан юм.",
    tags: ["React", "JavaScript"],
  },
  {
    id: 2,
    title: "Next.js-ийн гайхалтай онцлогууд",
    excerpt: "Next.js нь React дээр суурилсан вэб фрэймворк юм.",
    tags: ["Next.js", "React", "JavaScript"],
  },
  {
    id: 3,
    title: "TypeScript-ийн давуу талууд",
    excerpt: "TypeScript нь JavaScript-ийн суперсет бөгөөд статик төрлийн шалгалт хийх боломжийг олгодог.",
    tags: ["TypeScript", "JavaScript"],
  },
  {
    id: 4,
    title: "Backend хөгжүүлэлтийн үндэс",
    excerpt: "Backend хөгжүүлэлт нь серверийн талын логик, өгөгдлийн сан, API-г хамардаг.",
    tags: ["Backend"],
  },
  {
    id: 5,
    title: "Frontend хөгжүүлэлтийн чиг хандлага",
    excerpt: "Frontend хөгжүүлэлт нь хэрэглэгчийн интерфейс, хэрэглэгчийн туршлагыг сайжруулахад чиглэгддэг.",
    tags: ["Frontend"],
  },
  {
    id: 6,
    title: "JavaScript-ийн шинэ боломжууд",
    excerpt: "JavaScript нь жил бүр шинэ боломжуудаар баяжиж байдаг.",
    tags: ["JavaScript"],
  },
]

export default function ArticlesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Бүгд")
  const [filteredArticles, setFilteredArticles] = useState<any[]>([])

  useEffect(() => {
    // Нийтлэлүүдийг шүүх
    let filtered = mockArticles

    // Хайлтаар шүүх
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Категориор шүүх
    if (selectedCategory !== "Бүгд") {
      filtered = filtered.filter((article) => article.tags.includes(selectedCategory))
    }

    setFilteredArticles(filtered)
  }, [searchTerm, selectedCategory])

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Бүх нийтлэлүүд</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Технологийн хамгийн сүүлийн үеийн мэдээлэл, туршлага, санаануудыг олоорой
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Нийтлэл хайх..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Шүүлтүүр
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="py-8">
        <ArticleList articles={filteredArticles.length > 0 ? filteredArticles : undefined} />
      </div>

      <Footer />
    </div>
  )
}
