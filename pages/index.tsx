"use client"

import { useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
// If the default export is used in header.tsx:
import Header from "@/components/header"
import Hero from "@/components/hero"
import { ArticleList } from "@/components/article-list"
import { Footer } from "@/components/footer"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Хэрэв хэрэглэгч нэвтэрсэн бол articles хуудас руу чиглүүлэх
    if (user && !loading) {
      if (user.role === "admin") {
        router.push("/admin")
      } else {
        router.push("/articles")
      }
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {user ? (
        // Show Hero section for logged-in users
        <>
          <Hero />
          <ArticleList />
        </>
      ) : (
        // Show articles directly for non-logged-in users
        <div className="py-8">
          <ArticleList />
        </div>
      )}
      <Footer />
    </div>
  )
}
