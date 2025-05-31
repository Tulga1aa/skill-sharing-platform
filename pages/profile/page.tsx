"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Camera, Save } from "lucide-react"

interface Profile {
  name: string
  email: string
  avatar: string
  bio: string
  website: string
  twitter: string
  github: string
}

export default function ProfilePage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push("/signin")
      return
    }

    // Профайл мэдээлэл авах
    const fetchProfile = () => {
      setLoading(true)
      try {
        // localStorage-с профайл хайх
        const savedProfile = localStorage.getItem(`profile_${user.id}`)

        if (savedProfile) {
          setProfile(JSON.parse(savedProfile))
        } else {
          // Хэрэв профайл байхгүй бол хэрэглэгчийн мэдээллээс үүсгэх
          setProfile({
            name: user.name,
            email: user.email,
            avatar: user.avatar || "/placeholder.svg?height=100&width=100",
            bio: "Технологийн блогер, веб хөгжүүлэгч. React, Next.js, TypeScript-д дуртай.",
            website: "https://example.com",
            twitter: "techblogger",
            github: "techblogger",
          })
        }
      } catch (error) {
        console.error("Error fetching profile:", error)

        // Алдаа гарвал хэрэглэгчийн мэдээллээс үүсгэх
        setProfile({
          name: user.name,
          email: user.email,
          avatar: user.avatar || "/placeholder.svg?height=100&width=100",
          bio: "Технологийн блогер, веб хөгжүүлэгч. React, Next.js, TypeScript-д дуртай.",
          website: "https://example.com",
          twitter: "techblogger",
          github: "techblogger",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user, router])

  // Профайл хадгалах үйлдэл
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!profile || !user) return

    try {
      // localStorage-д хадгалах
      localStorage.setItem(`profile_${user.id}`, JSON.stringify(profile))

      // Хэрэглэгчийн нэрийг шинэчлэх
      const updatedUser = {
        ...user,
        name: profile.name,
        avatar: profile.avatar,
      }
      localStorage.setItem("user", JSON.stringify(updatedUser))

      toast({
        title: "Профайл шинэчлэгдлээ",
        description: "Таны профайл амжилттай шинэчлэгдлээ.",
      })
    } catch (error) {
      console.error("Error saving profile:", error)
      toast({
        title: "Алдаа гарлаа",
        description: "Профайл хадгалахад алдаа гарлаа.",
        variant: "destructive",
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile((prev) => (prev ? { ...prev, [name]: value } : null))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-32 bg-gray-200 rounded mb-8"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-3xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Профайл олдсонгүй</h1>
          <p className="text-gray-600">Уучлаарай, профайл мэдээлэл олдсонгүй.</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Профайл</h1>
          <p className="text-gray-600">Хувийн мэдээллээ шинэчлэх</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Профайл зураг</CardTitle>
              <CardDescription>Таны профайл зураг бүх нийтлэл дээр харагдана</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                  <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <Button type="button" variant="outline" className="flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Зураг солих
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">JPG, PNG, GIF зөвшөөрнө. Хамгийн ихдээ 2MB.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Хувийн мэдээлэл</CardTitle>
              <CardDescription>Таны үндсэн мэдээлэл</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Нэр</Label>
                  <Input id="name" name="name" value={profile.name} onChange={handleChange} placeholder="Таны нэр" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">И-мэйл</Label>
                  <Input
                    id="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    disabled
                  />
                  <p className="text-xs text-gray-500">И-мэйл хаягийг өөрчлөх боломжгүй</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Био</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  placeholder="Өөрийн тухай товч танилцуулга"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Сошиал холбоосууд</CardTitle>
              <CardDescription>Таны сошиал хаягууд</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="website">Вэбсайт</Label>
                <Input
                  id="website"
                  name="website"
                  value={profile.website}
                  onChange={handleChange}
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    name="twitter"
                    value={profile.twitter}
                    onChange={handleChange}
                    placeholder="@username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    name="github"
                    value={profile.github}
                    onChange={handleChange}
                    placeholder="username"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Хадгалах
            </Button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  )
}
