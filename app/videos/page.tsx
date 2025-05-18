"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Play, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  videoUrl: string
  tags: string[]
  duration: string
}

const sampleVideos: Video[] = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    description: "Learn the basics of Next.js and build your first application.",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=example1",
    tags: ["Next.js", "React", "Web Development"],
    duration: "15:30"
  },
  {
    id: "2",
    title: "Advanced TypeScript Patterns",
    description: "Explore advanced TypeScript patterns and best practices.",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=example2",
    tags: ["TypeScript", "Programming"],
    duration: "22:45"
  },
  // Add more sample videos as needed
]

export default function VideosPage() {
  const [videos, setVideos] = useState(sampleVideos)
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const allTags = Array.from(new Set(videos.flatMap(video => video.tags)))

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.every(tag => video.tags.includes(tag))
    return matchesSearch && matchesTags
  })

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Video Gallery</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          placeholder="Search videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {allTags.map(tag => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map(video => (
          <div
            key={video.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedVideo(video)}
          >
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Play className="h-12 w-12 text-white" />
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                {video.duration}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{video.description}</p>
              <div className="flex flex-wrap gap-2">
                {video.tags.map(tag => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedVideo?.title}</DialogTitle>
          </DialogHeader>
          <div className="relative pt-[56.25%]">
            <iframe
              src={selectedVideo?.videoUrl.replace("watch?v=", "embed/")}
              className="absolute top-0 left-0 w-full h-full"
              allowFullScreen
            />
          </div>
          <div className="mt-4">
            <p className="text-gray-600">{selectedVideo?.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedVideo?.tags.map(tag => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No videos found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
