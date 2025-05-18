"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function BackButton() {
  const router = useRouter()

  return (
    <Button
      variant="default"
      size="sm"
      className="flex items-center gap-1 mb-4 bg-black text-white hover:bg-neutral-800 transition-colors"
      onClick={() => router.back()}
    >
      <ArrowLeft className="h-4 w-4" />
      <span>Back</span>
    </Button>
  )
}
