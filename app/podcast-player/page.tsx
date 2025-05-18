"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Volume1,
  VolumeX,
  Bookmark,
  Share2,
  Download,
  MessageSquare,
} from "lucide-react"
import { Card } from "@/components/ui/card"

interface Timestamp {
  id: string
  time: number
  title: string
  description: string
}

interface Podcast {
  id: string
  title: string
  description: string
  audioUrl: string
  duration: number
  timestamps: Timestamp[]
}

const samplePodcast: Podcast = {
  id: "1",
  title: "The Future of Web Development",
  description: "Exploring the latest trends and technologies in web development.",
  audioUrl: "/podcasts/web-dev-future.mp3",
  duration: 2730, // 45:30 in seconds
  timestamps: [
    {
      id: "1",
      time: 120, // 2:00
      title: "Introduction",
      description: "Welcome to the podcast and overview of today's topics."
    },
    {
      id: "2",
      time: 600, // 10:00
      title: "Web Development Trends",
      description: "Discussion about the latest trends in web development."
    },
    {
      id: "3",
      time: 1200, // 20:00
      title: "Framework Comparison",
      description: "Comparing popular web frameworks and their use cases."
    },
    {
      id: "4",
      time: 1800, // 30:00
      title: "Future Predictions",
      description: "Predictions about the future of web development."
    }
  ]
}

export default function PodcastPlayerPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [activeTimestamp, setActiveTimestamp] = useState<Timestamp | null>(null)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressInterval = useRef<NodeJS.Timeout | null>(null)

  const episode = {
    id: 1,
    title: "Why the First Mile is Like Monday Mornings",
    description:
      "Benjamin Thomas shares his insights on overcoming the mental barriers of starting a run and how it parallels the challenges of beginning a new work week.",
    host: "Benjamin Thomas",
    guest: "",
    date: "May 18, 2023",
    duration: "28:32", // 28 minutes and 32 seconds
    image: "/placeholder.svg?height=400&width=400",
    audioUrl: "/placeholder.mp3", // This would be a real audio file in production
    timestamps: samplePodcast.timestamps
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      // Update active timestamp
      const currentTimestamp = episode.timestamps
        .slice()
        .reverse()
        .find(timestamp => audioRef.current!.currentTime >= timestamp.time)
      setActiveTimestamp(currentTimestamp || null)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const handleVolumeChange = (value: number[]) => {
    if (audioRef.current) {
      const newVolume = value[0]
      audioRef.current.volume = newVolume
      setVolume(newVolume)
      setIsMuted(newVolume === 0)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuted = !isMuted
      audioRef.current.muted = newMuted
      setIsMuted(newMuted)
    }
  }

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.currentTime + 10,
        audioRef.current.duration
      )
    }
  }

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        audioRef.current.currentTime - 10,
        0
      )
    }
  }

  const jumpToTimestamp = (timestamp: Timestamp) => {
    if (audioRef.current) {
      audioRef.current.currentTime = timestamp.time
      setCurrentTime(timestamp.time)
    }
  }

  // Simulate audio playback since we don't have a real audio file
  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setCurrentTime((prevTime) => {
          const newTime = prevTime + 1
          if (newTime >= 1712) {
            // 28:32 in seconds
            setIsPlaying(false)
            return 0
          }
          return newTime
        })
      }, 1000)
    } else if (progressInterval.current) {
      clearInterval(progressInterval.current)
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }
  }, [isPlaying])

  useEffect(() => {
    audioRef.current = new Audio(episode.audioUrl)
    audioRef.current.volume = volume

    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime)
        // Update active timestamp
        const currentTimestamp = episode.timestamps
          .slice()
          .reverse()
          .find(timestamp => audioRef.current!.currentTime >= timestamp.time)
        setActiveTimestamp(currentTimestamp || null)
      }
    }

    audioRef.current.addEventListener("timeupdate", handleTimeUpdate)
    return () => {
      audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate)
      audioRef.current?.pause()
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Podcast Player</h1>
          <p className="text-neutral-600">Listen to episodes with timestamp-linked notes and highlights.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Episode Info */}
          <div className="lg:col-span-1">
            <div className="bg-neutral-100 rounded-lg p-6">
              <div className="aspect-square relative mb-4 rounded-md overflow-hidden">
                <Image src={episode.image || "/placeholder.svg"} alt={episode.title} fill className="object-cover" />
              </div>
              <h2 className="text-2xl font-bold mb-2">{episode.title}</h2>
              <p className="text-neutral-600 mb-4">{episode.description}</p>
              <div className="flex items-center text-sm text-neutral-500 mb-6">
                <span>{episode.date}</span>
                <span className="mx-2">•</span>
                <span>{episode.duration}</span>
                <span className="mx-2">•</span>
                <span>Host: {episode.host}</span>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Bookmark className="h-4 w-4" />
                  <span>Save</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Player and Timestamps */}
          <div className="lg:col-span-2">
            {/* Audio Player */}
            <div className="bg-white border border-neutral-200 rounded-lg p-6 mb-6 shadow-sm">
              <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                src={episode.audioUrl}
                className="hidden"
              />

              <div className="mb-4">
                <Slider
                  value={[currentTime]}
                  max={1712} // 28:32 in seconds
                  step={1}
                  onValueChange={handleSeek}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-xs text-neutral-500 mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{episode.duration}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="icon" className="rounded-full" onClick={skipBackward}>
                    <SkipBack className="h-5 w-5" />
                  </Button>
                  <Button
                    onClick={togglePlayPause}
                    className="bg-black text-white hover:bg-neutral-800 rounded-full h-12 w-12 flex items-center justify-center"
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full" onClick={skipForward}>
                    <SkipForward className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex items-center space-x-2 w-32">
                  <button className="text-neutral-500" onClick={toggleMute}>
                    {isMuted ? (
                      <VolumeX className="h-5 w-5" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                  </button>
                  <Slider
                    value={[volume]}
                    max={1}
                    step={0.1}
                    onValueChange={handleVolumeChange}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Timestamps and Notes */}
            <div className="bg-white border border-neutral-200 rounded-lg shadow-sm overflow-hidden">
              <Tabs defaultValue="timestamps">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="timestamps">Timestamps</TabsTrigger>
                  <TabsTrigger value="notes">Show Notes</TabsTrigger>
                </TabsList>
                <TabsContent value="timestamps" className="p-0">
                  <div className="divide-y divide-neutral-100">
                    {episode.timestamps.map((ts) => (
                      <button
                        key={ts.id}
                        onClick={() => jumpToTimestamp(ts)}
                        className={`w-full text-left p-4 hover:bg-neutral-50 transition-colors ${
                          activeTimestamp?.id === ts.id ? "bg-neutral-100" : ""
                        }`}
                      >
                        <div className="flex items-start">
                          <span className="text-sm font-mono text-neutral-500 w-12">{formatTime(ts.time)}</span>
                          <div className="ml-4">
                            <p className="font-medium">{ts.title}</p>
                            <p className="text-sm text-neutral-600 mt-1">{ts.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="notes" className="p-6">
                  <div className="prose prose-neutral max-w-none">
                    <h3>Episode Notes</h3>
                    <p>
                      In this episode, Benjamin Thomas explores the psychological similarities between starting a run
                      and beginning a new work week. He discusses strategies for overcoming initial resistance and
                      building momentum that carries you through challenges.
                    </p>
                    <h4>Key Points</h4>
                    <ul>
                      <li>The psychological barriers that make the first mile of a run challenging</li>
                      <li>How Monday mornings create similar feelings of resistance</li>
                      <li>Practical techniques to overcome the inertia of starting</li>
                      <li>The science behind momentum and how it affects performance</li>
                      <li>Transferring running mindset strategies to other areas of life</li>
                    </ul>
                    <h4>Resources Mentioned</h4>
                    <ul>
                      <li>
                        <a href="#">"The Power of Habit" by Charles Duhigg</a>
                      </li>
                      <li>
                        <a href="#">Morning Routine Worksheet</a> (Free Download)
                      </li>
                      <li>
                        <a href="#">Runner's World Article on Mental Training</a>
                      </li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Comments Section */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Comments</h3>
                <span className="text-sm text-neutral-500">12 comments</span>
              </div>

              <div className="bg-white border border-neutral-200 rounded-lg p-6 mb-4">
                <div className="flex gap-4">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex-1">
                    <textarea
                      placeholder="Add a comment..."
                      className="w-full p-3 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      rows={3}
                    ></textarea>
                    <div className="flex justify-end mt-2">
                      <Button className="bg-black text-white hover:bg-neutral-800">Post Comment</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white border border-neutral-200 rounded-lg p-4">
                  <div className="flex gap-4">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Sarah Johnson</span>
                        <span className="text-xs text-neutral-500">2 days ago</span>
                      </div>
                      <p className="mt-2 text-neutral-700">
                        This episode really resonated with me. I've always struggled with Monday mornings and the first
                        mile of my runs. The mental strategies Benjamin shared have already helped me this week!
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-neutral-500">
                        <button className="flex items-center gap-1 hover:text-black">
                          <MessageSquare className="h-4 w-4" /> Reply
                        </button>
                        <span>3 likes</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-neutral-200 rounded-lg p-4">
                  <div className="flex gap-4">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Michael Torres</span>
                        <span className="text-xs text-neutral-500">3 days ago</span>
                      </div>
                      <p className="mt-2 text-neutral-700">
                        Great episode! I'd love to hear more about how these principles apply to other sports as well.
                        Do you think the same mental barriers exist in cycling or swimming?
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-neutral-500">
                        <button className="flex items-center gap-1 hover:text-black">
                          <MessageSquare className="h-4 w-4" /> Reply
                        </button>
                        <span>1 like</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-neutral-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-1 mb-4 md:mb-0">
              <span className="font-bold">Running</span>
              <span>Buddies Podcast</span>
            </div>
            <div className="flex space-x-6">
              <a href="/" className="text-sm text-neutral-500 hover:text-black">
                Home
              </a>
              <a href="/podcast" className="text-sm text-neutral-500 hover:text-black">
                Podcast
              </a>
              <a href="/blog" className="text-sm text-neutral-500 hover:text-black">
                Blog
              </a>
              <a href="/about" className="text-sm text-neutral-500 hover:text-black">
                About
              </a>
              <a href="/contact" className="text-sm text-neutral-500 hover:text-black">
                Contact
              </a>
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
