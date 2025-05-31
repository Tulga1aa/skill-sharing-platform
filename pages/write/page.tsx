"use client"

import { WriteEditor } from "@/components/write-editor"
import { Header } from "@/components/header"
import { useAuth } from "@/hooks/use-auth"

export default function WritePage() {
  const { user, loading } = useAuth()

  // Don't show header for admin users (they have their own admin interface)
  const showHeader = !user || user.role !== "admin"

  return (
    <div className="min-h-screen bg-white">
      {showHeader && <Header />}
      <WriteEditor />
    </div>
  )
}
