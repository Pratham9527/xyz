"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import BackButton from "@/components/back-button"

export default function AddBlogPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [author, setAuthor] = useState("")
  const [tags, setTags] = useState("")
  const [imageUrl, setImageUrl] = useState("/placeholder.svg?height=400&width=600")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real app, you would send this data to your backend
    // For now, we'll store it in localStorage
    const newPost = {
      id: Date.now(),
      title,
      excerpt,
      content,
      author,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      readTime: `${Math.max(1, Math.ceil(content.length / 1000))} min read`,
      tags: tags.split(",").map((tag) => tag.trim()),
      image: imageUrl,
    }

    // Get existing posts or initialize empty array
    const existingPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]")

    // Add new post and save back to localStorage
    localStorage.setItem("blogPosts", JSON.stringify([newPost, ...existingPosts]))

    // Redirect to blog page
    setTimeout(() => {
      router.push("/blog")
    }, 500)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BackButton />

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Add New Blog Post</h1>
          <p className="text-neutral-600">Share your running experiences and insights with the community.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a catchy title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Write a brief summary (1-2 sentences)"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog post content here..."
              className="min-h-[200px]"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="author">Author Name</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Motivation, Training, etc. (comma separated)"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-xs text-neutral-500">Leave as is to use a placeholder image</p>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" className="bg-black text-white hover:bg-neutral-800" disabled={isSubmitting}>
              {isSubmitting ? "Publishing..." : "Publish Post"}
            </Button>
          </div>
        </form>
      </main>

      <footer className="border-t border-neutral-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-1 mb-4 md:mb-0">
              <span className="font-bold">Running</span>
              <span>Buddies Podcast</span>
            </div>
            <div className="flex space-x-6">
              <Link href="/" className="text-sm text-neutral-500 hover:text-black">
                Home
              </Link>
              <Link href="/podcast" className="text-sm text-neutral-500 hover:text-black">
                Podcast
              </Link>
              <Link href="/blog" className="text-sm text-neutral-500 hover:text-black">
                Blog
              </Link>
              <Link href="/about" className="text-sm text-neutral-500 hover:text-black">
                About
              </Link>
              <Link href="/contact" className="text-sm text-neutral-500 hover:text-black">
                Contact
              </Link>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-neutral-500">
              © {new Date().getFullYear()} Running Buddies. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
