"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Save, Globe, Mail, Shield, Database } from "lucide-react"

export default function AdminSettingsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    siteName: "TechBlog",
    siteDescription: "Технологийн мэдээлэл, туршлага, санаануудыг хуваалцах платформ",
    adminEmail: "admin@techblog.com",
    allowRegistration: true,
    requireApproval: true,
    enableComments: true,
    enableNotifications: true,
    maxFileSize: "5",
    allowedFileTypes: "jpg,png,gif,pdf",
  })

  const handleSave = () => {
    try {
      localStorage.setItem("adminSettings", JSON.stringify(settings))
      toast({
        title: "Тохиргоо хадгалагдлаа",
        description: "Админ тохиргоо амжилттай шинэчлэгдлээ.",
      })
    } catch (error) {
      toast({
        title: "Алдаа гарлаа",
        description: "Тохиргоо хадгалахад алдаа гарлаа.",
        variant: "destructive",
      })
    }
  }

  const handleChange = (field: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Тохиргоо</h1>
        <p className="text-gray-600">Системийн ерөнхий тохиргоо</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Сайтын тохиргоо */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Сайтын тохиргоо
            </CardTitle>
            <CardDescription>Сайтын үндсэн мэдээлэл</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Сайтын нэр</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => handleChange("siteName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteDescription">Тайлбар</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => handleChange("siteDescription", e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminEmail">Админ и-мэйл</Label>
              <Input
                id="adminEmail"
                type="email"
                value={settings.adminEmail}
                onChange={(e) => handleChange("adminEmail", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Хэрэглэгчийн тохиргоо */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Хэрэглэгчийн тохиргоо
            </CardTitle>
            <CardDescription>Хэрэглэгчийн эрх, хяналт</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Бүртгэл зөвшөөрөх</Label>
                <p className="text-sm text-gray-500">Шинэ хэрэглэгч бүртгүүлэх боломж</p>
              </div>
              <Switch
                checked={settings.allowRegistration}
                onCheckedChange={(checked) => handleChange("allowRegistration", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Нийтлэл батлах</Label>
                <p className="text-sm text-gray-500">Нийтлэл нийтлэхээс өмнө батлах</p>
              </div>
              <Switch
                checked={settings.requireApproval}
                onCheckedChange={(checked) => handleChange("requireApproval", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Сэтгэгдэл зөвшөөрөх</Label>
                <p className="text-sm text-gray-500">Нийтлэл дээр сэтгэгдэл бичих боломж</p>
              </div>
              <Switch
                checked={settings.enableComments}
                onCheckedChange={(checked) => handleChange("enableComments", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Мэдэгдлийн тохиргоо */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Мэдэгдлийн тохиргоо
            </CardTitle>
            <CardDescription>И-мэйл мэдэгдэл, алдаа мэдээлэх</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Мэдэгдэл идэвхжүүлэх</Label>
                <p className="text-sm text-gray-500">Системийн мэдэгдэл илгээх</p>
              </div>
              <Switch
                checked={settings.enableNotifications}
                onCheckedChange={(checked) => handleChange("enableNotifications", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Файлын тохиргоо */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Файлын тохиргоо
            </CardTitle>
            <CardDescription>Файл оруулах хязгаар, төрөл</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="maxFileSize">Хамгийн их файлын хэмжээ (MB)</Label>
              <Input
                id="maxFileSize"
                type="number"
                value={settings.maxFileSize}
                onChange={(e) => handleChange("maxFileSize", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="allowedFileTypes">Зөвшөөрөгдсөн файлын төрөл</Label>
              <Input
                id="allowedFileTypes"
                value={settings.allowedFileTypes}
                onChange={(e) => handleChange("allowedFileTypes", e.target.value)}
                placeholder="jpg,png,gif,pdf"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Хадгалах
        </Button>
      </div>
    </div>
  )
}
