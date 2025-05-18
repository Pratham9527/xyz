"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Play, Clock, Calendar, ArrowRight, Pause, Download, Share2, Bookmark, Volume2, VolumeX, MessageSquare } from "lucide-react"
import BackButton from "@/components/back-button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import Lenis from "lenis"

interface Podcast {
  id: string;
  title: string;
  description: string;
  duration: string;
  date: string;
  audioUrl: string;
  image?: string;
  category: string;
  host: string;
  fullDescription?: string;
  topics?: string[];
  transcript?: string;
  relatedEpisodes?: string[];
  showNotes?: string[];
  hostImage?: string;
}

const samplePodcasts: Podcast[] = [
  {
    id: "1",
    title: "Why the First Mile is Like Monday Mornings",
    description: "Exploring the parallels between starting your run and starting your week, and how to make both easier.",
    duration: "45:32",
    date: "May 15, 2024",
    audioUrl: "https://example.com/podcasts/first-mile.mp3",
    image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=1200&q=80",
    category: "Mindset",
    host: "Michael Wilson",
    hostImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    fullDescription: "In this episode, we dive deep into the psychology of starting your run and how it mirrors the challenges we face on Monday mornings. We discuss practical strategies to overcome the initial resistance and build momentum for both your running and your week.",
    topics: ["Running Psychology", "Monday Motivation", "Habit Formation", "Mental Toughness"],
    transcript: "Michael: Welcome to the Running Mind podcast. Today we're talking about something that every runner can relate to - that first mile...",
    showNotes: [
      "Book Mentioned: Atomic Habits by James Clear",
      "App Recommendation: Strava",
      "Website: runningmind.com/first-mile"
    ],
    relatedEpisodes: ["2", "3"]
  },
  {
    id: "2",
    title: "Nutrition for Long Distance Runners",
    description: "A comprehensive guide to fueling your body for optimal performance during long runs.",
    duration: "52:18",
    date: "May 12, 2024",
    audioUrl: "https://example.com/podcasts/nutrition.mp3",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=80",
    category: "Nutrition",
    host: "Sarah Chen",
    hostImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    fullDescription: "Sports nutritionist Sarah Chen shares her expert advice on proper nutrition for long-distance runners. Learn about pre-run meals, during-run fueling, and post-run recovery nutrition.",
    topics: ["Sports Nutrition", "Carb Loading", "Hydration", "Recovery Foods"],
    transcript: "Sarah: Hello runners! Today we're going to talk about one of the most important aspects of long-distance running - nutrition...",
    showNotes: [
      "Recipe: Homemade Energy Bars",
      "Hydration Calculator: runningmind.com/hydration",
      "Nutrition Guide PDF: runningmind.com/nutrition-guide"
    ],
    relatedEpisodes: ["1", "4"]
  },
  {
    id: "3",
    title: "Essential Gear for Trail Running",
    description: "Your complete guide to the must-have equipment for safe and enjoyable trail running adventures.",
    duration: "38:45",
    date: "May 10, 2024",
    audioUrl: "https://example.com/podcasts/trail-gear.mp3",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80",
    category: "Gear",
    host: "Alex Rodriguez",
    hostImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    fullDescription: "Trail running expert Alex Rodriguez breaks down the essential gear every trail runner needs, from shoes to hydration packs and everything in between.",
    topics: ["Trail Shoes", "Hydration Packs", "Safety Gear", "Weather Protection"],
    transcript: "Alex: Welcome to the trail! Today we're going to talk about the gear that will make your trail running experience safer and more enjoyable...",
    showNotes: [
      "Gear Review: Salomon Speedcross 5",
      "Trail Map App: AllTrails",
      "Safety Checklist: runningmind.com/trail-safety"
    ],
    relatedEpisodes: ["1", "5"]
  },
  {
    id: "4",
    title: "Mental Health Benefits of Running",
    description: "Discover how running can improve your mental wellbeing and help manage stress and anxiety.",
    duration: "41:20",
    date: "May 8, 2024",
    audioUrl: "https://example.com/podcasts/mental-health.mp3",
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=1200&q=80",
    category: "Mental Health",
    host: "Dr. Emily Thompson",
    hostImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80",
    fullDescription: "Clinical psychologist Dr. Emily Thompson discusses the profound impact running can have on mental health, including stress reduction, improved mood, and better sleep.",
    topics: ["Stress Management", "Anxiety Relief", "Sleep Quality", "Mindfulness"],
    transcript: "Dr. Thompson: As a psychologist and runner, I've seen firsthand how running can transform mental health...",
    showNotes: [
      "Research Paper: Running and Mental Health",
      "Meditation App: Headspace",
      "Support Group: runningmind.com/community"
    ],
    relatedEpisodes: ["2", "6"]
  },
  {
    id: "5",
    title: "Beginner's Guide to Running",
    description: "Everything you need to know to start your running journey, from proper form to building endurance.",
    duration: "48:15",
    date: "May 5, 2024",
    audioUrl: "https://example.com/podcasts/beginners.mp3",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&q=80",
    category: "Beginners",
    host: "James Wilson",
    hostImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    fullDescription: "Running coach James Wilson provides a comprehensive guide for beginners, covering everything from proper running form to creating a sustainable training plan.",
    topics: ["Running Form", "Training Plans", "Injury Prevention", "Progress Tracking"],
    transcript: "James: Welcome to the world of running! Whether you're completely new to running or getting back into it...",
    showNotes: [
      "Training Plan: Couch to 5K",
      "Form Video: runningmind.com/form",
      "Progress Tracker: runningmind.com/tracker"
    ],
    relatedEpisodes: ["3", "7"]
  },
  {
    id: "6",
    title: "Advanced Training Techniques",
    description: "Take your running to the next level with these professional training methods and strategies.",
    duration: "55:30",
    date: "May 3, 2024",
    audioUrl: "https://example.com/podcasts/advanced-training.mp3",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&q=80",
    category: "Training",
    host: "Coach Mark Davis",
    hostImage: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&q=80",
    fullDescription: "Olympic coach Mark Davis shares advanced training techniques used by elite runners, including interval training, tempo runs, and recovery strategies.",
    topics: ["Interval Training", "Tempo Runs", "Recovery", "Performance Metrics"],
    transcript: "Coach Davis: Today we're going to dive into some advanced training techniques that can help you break through plateaus...",
    showNotes: [
      "Training Calculator: runningmind.com/calculator",
      "Performance Metrics Guide",
      "Elite Training Plans"
    ],
    relatedEpisodes: ["4", "5"]
  }
];

export default function PodcastPage() {
  const [podcasts, setPodcasts] = useState(samplePodcasts);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [showFunctionPanel, setShowFunctionPanel] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [notes, setNotes] = useState<{ [key: string]: string[] }>({});
  const [timestamps, setTimestamps] = useState<{ [key: string]: number[] }>({});
  const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const filteredPodcasts = podcasts.filter(podcast =>
    podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    podcast.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePlay = (podcastId: string, audioUrl: string) => {
    if (currentlyPlaying === podcastId) {
      // Pause current podcast
      audioElement?.pause();
      setCurrentlyPlaying(null);
      setAudioElement(null);
    } else {
      // Stop any currently playing podcast
      if (audioElement) {
        audioElement.pause();
      }

      // Play new podcast
      const audio = new Audio(audioUrl);
      audio.play();
      setAudioElement(audio);
      setCurrentlyPlaying(podcastId);

      // Handle audio end
      audio.onended = () => {
        setCurrentlyPlaying(null);
        setAudioElement(null);
      };
    }
  };

  const categories = ["All Episodes", "Mindset", "Training", "Nutrition", "Gear", "Beginners", "Mental Health"]

  // Scroll animations
  const { scrollY } = useScroll()
  const headerRef = useRef(null)
  const featuredRef = useRef(null)
  const categoriesRef = useRef(null)
  const episodesRef = useRef(null)

  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 })
  const isFeaturedInView = useInView(featuredRef, { once: true, amount: 0.3 })
  const isCategoriesInView = useInView(categoriesRef, { once: true, amount: 0.3 })
  const isEpisodesInView = useInView(episodesRef, { once: true, amount: 0.1 })

  // Parallax effect for featured image
  const featuredImageY = useTransform(scrollY, [0, 500], [0, 100])
  const featuredImageScale = useTransform(scrollY, [0, 500], [1, 1.1])
  const springFeaturedImageY = useSpring(featuredImageY, { stiffness: 100, damping: 30 })

  // Floating animation for search bar
  const floatY = useTransform(scrollY, [0, 200], [0, -10])
  const springFloatY = useSpring(floatY, { stiffness: 100, damping: 30 })

  const handleVolumeChange = (newVolume: number) => {
    if (audioElement) {
      audioElement.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const handleMuteToggle = () => {
    if (audioElement) {
      audioElement.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handlePlaybackSpeedChange = (speed: number) => {
    if (audioElement) {
      audioElement.playbackRate = speed;
      setPlaybackSpeed(speed);
    }
  };

  const handleDownload = (podcastId: string) => {
    const podcast = podcasts.find(p => p.id === podcastId);
    if (podcast) {
      const link = document.createElement('a');
      link.href = podcast.audioUrl;
      link.download = `${podcast.title}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = (podcastId: string) => {
    const podcast = podcasts.find(p => p.id === podcastId);
    if (podcast && navigator.share) {
      navigator.share({
        title: podcast.title,
        text: podcast.description,
        url: window.location.href
      });
    }
  };

  const handleAddNote = (podcastId: string, note: string) => {
    setNotes(prev => ({
      ...prev,
      [podcastId]: [...(prev[podcastId] || []), note]
    }));
  };

  const handleAddTimestamp = (podcastId: string) => {
    if (audioElement) {
      setTimestamps(prev => ({
        ...prev,
        [podcastId]: [...(prev[podcastId] || []), audioElement.currentTime]
      }));
    }
  };

  const handlePodcastClick = (podcast: Podcast) => {
    setSelectedPodcast(podcast);
    setShowDetails(true);
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // @ts-ignore
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <BackButton />

        {/* Function Panel */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card className="p-4 bg-white shadow-lg">
            <Tabs defaultValue="playback" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="playback">Playback</TabsTrigger>
                <TabsTrigger value="download">Download</TabsTrigger>
                <TabsTrigger value="share">Share</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>
              <TabsContent value="playback" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full"
                      onClick={handleMuteToggle}
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                      className="w-24"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full"
                      onClick={() => handlePlaybackSpeedChange(playbackSpeed === 1 ? 1.5 : 1)}
                    >
                      <Clock className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">{playbackSpeed}x</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="download" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full"
                      onClick={() => currentlyPlaying && handleDownload(currentlyPlaying)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">Download Episode</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full"
                      onClick={() => currentlyPlaying && handleAddTimestamp(currentlyPlaying)}
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">Save for Later</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="share" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full"
                      onClick={() => currentlyPlaying && handleShare(currentlyPlaying)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">Share Episode</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full"
                      onClick={() => currentlyPlaying && handleAddNote(currentlyPlaying, "New note")}
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">Send to Friend</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="notes" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full"
                      onClick={() => currentlyPlaying && handleAddTimestamp(currentlyPlaying)}
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">Add Timestamp</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full"
                      onClick={() => currentlyPlaying && handleAddNote(currentlyPlaying, "New note")}
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">Add Note</span>
                  </div>
                </div>
                {currentlyPlaying && (
                  <div className="mt-4 space-y-2">
                    <h4 className="font-medium">Notes:</h4>
                    {notes[currentlyPlaying]?.map((note, index) => (
                      <div key={index} className="text-sm text-neutral-600">{note}</div>
                    ))}
                    <h4 className="font-medium mt-4">Timestamps:</h4>
                    {timestamps[currentlyPlaying]?.map((time, index) => (
                      <div key={index} className="text-sm text-neutral-600">
                        {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>

        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 sm:mb-12"
        >
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-black"
            >
              PODCAST
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isHeaderInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="text-neutral-600 mt-2 text-sm sm:text-base"
            >
              Join us for conversations about running, life, and everything in between. New episodes every Monday and
              Thursday.
            </motion.p>
          </div>
          <motion.div style={{ y: springFloatY }} className="w-full md:w-64 relative">
            <div className="relative max-w-xl mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <Input
                placeholder="Search episodes..."
                className="pl-10 bg-neutral-50 border-neutral-200 transition-all hover:shadow-md focus:shadow-md text-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Featured Episode */}
        <motion.div
          ref={featuredRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isFeaturedInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            animate={isFeaturedInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl font-bold text-[#2432C5] mb-6"
          >
            Featured Episode
          </motion.h2>
          <div className="relative rounded-2xl overflow-hidden group">
            <motion.div
              style={{
                y: springFeaturedImageY,
                scale: featuredImageScale,
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=1200&q=80"
                alt="Featured episode"
                width={1200}
                height={600}
                className="w-full h-[400px] object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isFeaturedInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute bottom-0 left-0 p-8 text-white"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="inline-block px-3 py-1 bg-[#2432C5] text-white text-sm rounded-full mb-4"
              >
                Latest Episode
              </motion.span>
              <h3 className="text-3xl sm:text-4xl font-bold mb-4">Why the First Mile is Like Monday Mornings</h3>
              <p className="text-neutral-200 mb-6 max-w-2xl">
                Exploring the parallels between starting your run and starting your week, and how to make both easier.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
                  <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
                    alt="Michael Wilson"
                    width={40}
                    height={40}
                    className="h-8 w-8 rounded-full mr-2 object-cover"
                  />
                  <span>Michael Wilson</span>
                </motion.div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>May 15, 2024</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>45:32</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          ref={categoriesRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isCategoriesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-10 overflow-x-auto pb-2"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={isCategoriesInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 4px 12px rgba(36, 50, 197, 0.15)",
                }}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0 ? "bg-[#2432C5] text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Episodes List */}
        <motion.div ref={episodesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPodcasts.map((podcast, index) => (
            <motion.article
              key={podcast.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isEpisodesInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{
                y: -10,
                transition: { duration: 0.2 },
              }}
              className="group bg-white rounded-xl p-4 hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => handlePodcastClick(podcast)}
            >
              <div className="relative rounded-xl overflow-hidden mb-4">
                <Image
                  src={podcast.image || "/placeholder.svg"}
                  alt={podcast.title}
                  width={400}
                  height={400}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-0 left-0 p-4 text-white"
                >
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlay(podcast.id, podcast.audioUrl);
                    }}
                    variant={currentlyPlaying === podcast.id ? "secondary" : "default"}
                    className="bg-[#2432C5] text-white hover:bg-[#4B5FFF]"
                  >
                    {currentlyPlaying === podcast.id ? (
                      <Pause className="mr-2 h-4 w-4" />
                    ) : (
                      <Play className="mr-2 h-4 w-4" />
                    )}
                  </Button>
                </motion.div>
              </div>
              <div className="space-y-2">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="inline-block px-3 py-1 bg-[#2432C5]/10 text-[#2432C5] text-sm rounded-full"
                >
                  {podcast.category}
                </motion.span>
                <h3 className="text-xl font-bold text-black">{podcast.title}</h3>
                <p className="text-black line-clamp-2">{podcast.description}</p>
                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center gap-2">
                    <Image
                      src={podcast.hostImage || "/placeholder.svg?height=40&width=40"}
                      alt={podcast.host}
                      width={40}
                      height={40}
                      className="h-8 w-8 rounded-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg?height=40&width=40";
                      }}
                    />
                    <span className="text-sm font-medium text-black">{podcast.host}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-neutral-500">
                    <span>{podcast.date}</span>
                    <span>{podcast.duration}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Podcast Details Dialog */}
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
            {selectedPodcast && (
              <div className="flex flex-col h-full">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">{selectedPodcast.title}</DialogTitle>
                  <DialogDescription className="text-neutral-600">
                    {selectedPodcast.description}
                  </DialogDescription>
                </DialogHeader>
                
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-6 py-4">
                    {/* Episode Image */}
                    <div className="relative w-full h-[300px] rounded-xl overflow-hidden">
                      <Image
                        src={selectedPodcast.image || "/placeholder.svg"}
                        alt={selectedPodcast.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Episode Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h3 className="font-semibold">Host</h3>
                        <p className="text-neutral-600">{selectedPodcast.host}</p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold">Category</h3>
                        <p className="text-neutral-600">{selectedPodcast.category}</p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold">Duration</h3>
                        <p className="text-neutral-600">{selectedPodcast.duration}</p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold">Date</h3>
                        <p className="text-neutral-600">{selectedPodcast.date}</p>
                      </div>
                    </div>

                    {/* Episode Description */}
                    <div className="space-y-2">
                      <h3 className="font-semibold">About this Episode</h3>
                      <p className="text-neutral-600 leading-relaxed">
                        {selectedPodcast.fullDescription}
                      </p>
                    </div>

                    {/* Topics */}
                    <div className="space-y-2">
                      <h3 className="font-semibold">Topics Covered</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedPodcast.topics?.map((topic, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-[#2432C5]/10 text-[#2432C5] rounded-full text-sm"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Transcript */}
                    <div className="space-y-2">
                      <h3 className="font-semibold">Episode Transcript</h3>
                      <div className="bg-neutral-50 p-4 rounded-lg">
                        <pre className="whitespace-pre-wrap text-sm text-neutral-600 font-mono">
                          {selectedPodcast.transcript}
                        </pre>
                      </div>
                    </div>

                    {/* Show Notes */}
                    {selectedPodcast.showNotes && selectedPodcast.showNotes.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="font-semibold">Show Notes</h3>
                        <div className="space-y-2">
                          {selectedPodcast.showNotes.map((note, index) => (
                            <a
                              key={index}
                              href={note.split(': ')[1]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
                            >
                              {note}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Related Episodes */}
                    {selectedPodcast.relatedEpisodes && selectedPodcast.relatedEpisodes.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="font-semibold">Related Episodes</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {selectedPodcast.relatedEpisodes.map((episodeId) => {
                            const relatedEpisode = podcasts.find(p => p.id === episodeId);
                            if (!relatedEpisode) return null;
                            return (
                              <div
                                key={episodeId}
                                className="p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
                                onClick={() => {
                                  setSelectedPodcast(relatedEpisode);
                                }}
                              >
                                <h4 className="font-medium">{relatedEpisode.title}</h4>
                                <p className="text-sm text-neutral-600">{relatedEpisode.duration}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Episode Notes */}
                    {notes[selectedPodcast.id] && notes[selectedPodcast.id].length > 0 && (
                      <div className="space-y-2">
                        <h3 className="font-semibold">Your Notes</h3>
                        <div className="space-y-2">
                          {notes[selectedPodcast.id].map((note, index) => (
                            <div key={index} className="p-3 bg-neutral-50 rounded-lg">
                              {note}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Episode Timestamps */}
                    {timestamps[selectedPodcast.id] && timestamps[selectedPodcast.id].length > 0 && (
                      <div className="space-y-2">
                        <h3 className="font-semibold">Your Timestamps</h3>
                        <div className="space-y-2">
                          {timestamps[selectedPodcast.id].map((time, index) => (
                            <div key={index} className="p-3 bg-neutral-50 rounded-lg flex items-center justify-between">
                              <span>{Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (audioElement) {
                                    audioElement.currentTime = time;
                                    audioElement.play();
                                  }
                                }}
                              >
                                <Play className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlay(selectedPodcast.id, selectedPodcast.audioUrl);
                        }}
                        className="flex-1"
                      >
                        {currentlyPlaying === selectedPodcast.id ? (
                          <>
                            <Pause className="mr-2 h-4 w-4" />
                            Pause Episode
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            Play Episode
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(selectedPodcast.id);
                        }}
                        className="flex-1"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(selectedPodcast.id);
                        }}
                        className="flex-1"
                      >
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isEpisodesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="destructive"
              className="text-white bg-blue-700 hover:bg-[#2432C5] hover:text-white transition-colors"
            >
              Load More Episodes
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
              >
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.span>
            </Button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
