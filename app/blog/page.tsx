"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ArrowRight, Calendar, Clock, User } from "lucide-react"
import BackButton from "@/components/back-button"

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "The Art of Showing Up: Running and Life's Daily Battles",
      excerpt: "How consistency in running mirrors success in life, and why the first step is always the hardest.",
      author: "Michael Wilson",
      date: "May 15, 2024",
      readTime: "5 min read",
      category: "Mindset",
      image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=80",
    },
    {
      id: 2,
      title: "How I Survived My First Run (And My Work Week)",
      excerpt: "A beginner's journey from couch to 5K, and the surprising parallels with professional life.",
      author: "Alyssa Jordaan",
      date: "May 12, 2024",
      readTime: "4 min read",
      category: "Beginners",
      image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80",
    },
    {
      id: 3,
      title: "Running Teaches You Patience... or How to Tolerate It",
      excerpt: "The unexpected lessons in patience that running teaches us, and how they apply to everyday life.",
      author: "Michael Wilson",
      date: "May 10, 2024",
      readTime: "6 min read",
      category: "Mindset",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    },
    {
      id: 4,
      title: "Run Now, Complain Later: My New Life Motto",
      excerpt: "Finding motivation when you'd rather stay in bed, and why the post-run feeling makes it all worth it.",
      author: "Ben Clark",
      date: "May 8, 2024",
      readTime: "4 min read",
      category: "Motivation",
      image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80",
    },
    {
      id: 5,
      title: "What Your Running Shoes Say About Your Personality",
      excerpt: "A light-hearted look at running shoe preferences and what they might reveal about your character.",
      author: "Alyssa Jordaan",
      date: "May 5, 2024",
      readTime: "3 min read",
      category: "Gear",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    },
    {
      id: 6,
      title: "The Runner's Guide to Nutrition: Fueling Your Performance",
      excerpt: "Essential nutrition tips for runners at all levels, from pre-run meals to recovery nutrition.",
      author: "Michael Wilson",
      date: "May 3, 2024",
      readTime: "7 min read",
      category: "Nutrition",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    },
  ]

  const categories = ["All Posts", "Mindset", "Training", "Nutrition", "Gear", "Race Reports", "Beginners"]

  // Scroll animations
  const { scrollY } = useScroll()
  const headerRef = useRef(null)
  const featuredRef = useRef(null)
  const categoriesRef = useRef(null)
  const postsRef = useRef(null)

  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 })
  const isFeaturedInView = useInView(featuredRef, { once: true, amount: 0.3 })
  const isCategoriesInView = useInView(categoriesRef, { once: true, amount: 0.3 })
  const isPostsInView = useInView(postsRef, { once: true, amount: 0.1 })

  // Parallax effect for featured image
  const featuredImageY = useTransform(scrollY, [0, 500], [0, 100])
  const featuredImageScale = useTransform(scrollY, [0, 500], [1, 1.1])
  const springFeaturedImageY = useSpring(featuredImageY, { stiffness: 100, damping: 30 })

  // Floating animation for search bar
  const floatY = useTransform(scrollY, [0, 200], [0, -10])
  const springFloatY = useSpring(floatY, { stiffness: 100, damping: 30 })

  // Add these new refs and hooks after the existing ones
  const scrollContainerRef = useRef(null)
  const [scrollYProgress, setScrollYProgress] = useState(0)

  // Add this new useEffect for scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return

      const scrollTop = window.scrollY
      const docHeight = document.body.offsetHeight
      const winHeight = window.innerHeight
      const scrollPercent = scrollTop / (docHeight - winHeight)
      setScrollYProgress(scrollPercent)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden" ref={scrollContainerRef}>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#2432C5] origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyNDMyQzUiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgtMXYxaDF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMi0yaDF2MWgtMXYtMXptLTItMmgxdjFoLTF2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/50 pointer-events-none"></div>
      <div className="absolute inset-0 backdrop-blur-[2px] pointer-events-none"></div>
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative">
        <BackButton />

        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12 sm:mb-16"
        >
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-[#2432C5] relative"
            >
              <span className="relative z-10">BLOG</span>
              <motion.span
                className="absolute -bottom-2 left-0 h-3 bg-[#2432C5]/20 w-full -z-10"
                initial={{ width: 0 }}
                animate={isHeaderInView ? { width: "100%" } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isHeaderInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="text-neutral-600 mt-2 text-sm sm:text-base max-w-xl"
            >
              Insights, stories, and tips from runners of all levels. Whether you're just starting out or training for
              your next marathon, we've got you covered.
            </motion.p>
          </div>
          <motion.div
            style={{ y: springFloatY }}
            className="w-full md:w-64 relative"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative max-w-xl mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <Input
                placeholder="Search articles..."
                className="pl-10 bg-neutral-50 border-neutral-200 transition-all hover:shadow-md focus:shadow-md rounded-full text-black"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Featured Post */}
        <motion.div
          ref={featuredRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isFeaturedInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isFeaturedInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center mb-6"
          >
            <h2 className="text-2xl font-bold text-[#2432C5]">Featured Article</h2>
            <motion.div
              className="h-[2px] bg-[#2432C5]/30 ml-4 flex-grow"
              initial={{ width: 0, opacity: 0 }}
              animate={isFeaturedInView ? { width: "100%", opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </motion.div>
          <div className="relative rounded-2xl overflow-hidden group shadow-lg hover:shadow-2xl transition-shadow duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 md:h-auto overflow-hidden">
                <motion.div
                  style={{
                    y: springFeaturedImageY,
                    scale: featuredImageScale,
                  }}
                  className="h-full"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=80"
                    alt="Featured Post"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFeaturedInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="absolute top-4 left-4 md:hidden"
                >
                  <span className="inline-block px-3 py-1 bg-[#2432C5] text-white text-xs rounded-full font-medium shadow-md">
                    FEATURED
                  </span>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isFeaturedInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="p-6 md:p-8 flex flex-col bg-white"
              >
                <div className="flex-1">
                  <span className="hidden md:inline-block px-3 py-1 bg-[#2432C5] text-white text-xs rounded-full mb-4 font-medium shadow-md">
                    FEATURED
                  </span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-black">
                    The Art of Showing Up: Running and Life's Daily Battles
                  </h3>
                  <p className="text-neutral-600 mb-6 text-sm sm:text-base">
                    How consistency in running mirrors success in life, and why the first step is always the hardest.
                  </p>
                  <div className="flex flex-wrap items-center text-sm text-neutral-500 mb-6 gap-y-2">
                    <div className="flex items-center mr-4">
                      <User className="h-4 w-4 mr-2" />
                      <span>Michael Wilson</span>
                    </div>
                    <div className="flex items-center mr-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>May 15, 2024</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>5 min read</span>
                    </div>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative overflow-hidden rounded-md"
                >
                  <Button className="bg-blue-700 text-white hover:bg-[#2432C5] hover:text-white transition-colors w-full md:w-auto relative z-10">
                    Read Article
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                    >
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.span>
                  </Button>
                  <motion.div
                    className="absolute inset-0 bg-[#4B5FFF]/80"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          ref={categoriesRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isCategoriesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 overflow-x-auto pb-2"
        >
          <motion.div
            className="flex items-center mb-6"
            initial={{ opacity: 0 }}
            animate={isCategoriesInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl font-bold text-[#2432C5]">Browse by Category</h2>
            <motion.div
              className="h-[2px] bg-[#2432C5]/30 ml-4 flex-grow"
              initial={{ width: 0, opacity: 0 }}
              animate={isCategoriesInView ? { width: "100%", opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
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
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0
                    ? "bg-[#2432C5] text-white shadow-md"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border border-transparent hover:border-neutral-300"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          ref={postsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={isPostsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isPostsInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{
                y: -10,
                transition: { duration: 0.2 },
              }}
              className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative">
                <div className="overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={400}
                    height={300}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <motion.div initial={{ opacity: 1 }} whileHover={{ scale: 1.05 }} className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-[#2432C5] text-white text-xs rounded-full font-medium shadow-md">
                    {post.category}
                  </span>
                </motion.div>
              </div>
              <div className="p-6">
                <h3 className="text-lg sm:text-xl font-bold text-black mb-3 line-clamp-2 group-hover:text-[#2432C5] transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-sm text-neutral-600 mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-neutral-500">
                    <User className="h-4 w-4 mr-2" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center text-sm text-neutral-500">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-neutral-500">
                    <Calendar className="h-4 w-4 mr-2 inline" />
                    {post.date}
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative overflow-hidden rounded-md"
                  >
                    <Button
                      variant="destructive"
                      className="text-white bg-blue-700 hover:bg-[#2432C5] hover:text-white transition-colors relative z-10"
                    >
                      Read More
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                      >
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </motion.span>
                    </Button>
                    <motion.div
                      className="absolute inset-0 bg-blue-700/10"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isPostsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="relative inline-block overflow-hidden rounded-md"
          >
            <Button
              variant="destructive"
              className="text-white bg-blue-700 hover:bg-[#2432C5] hover:text-white transition-colors p-3 h-auto relative z-10"
            >
              Load More Articles
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
              >
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.span>
            </Button>
            <motion.div
              className="absolute inset-0 bg-blue-700"
              initial={{ y: "100%" }}
              whileHover={{ y: 0 }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            />
          </motion.div>
        </motion.div>
        <motion.button
          className="fixed bottom-8 right-8 p-3 rounded-full bg-blue-700 text-white shadow-lg z-40"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: scrollYProgress > 0.2 ? 1 : 0,
            scale: scrollYProgress > 0.2 ? 1 : 0.8,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        </motion.button>
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="border-t border-neutral-200 py-12 mt-16 bg-neutral-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-1 mb-6 md:mb-0">
              <span className="font-bold text-[#2432C5]">Running</span>
              <span className="font-medium">Buddies Blog</span>
            </motion.div>
            <div className="flex space-x-8">
              {["Home", "Podcast", "Blog", "About", "Contact"].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="relative"
                >
                  <Link
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-sm text-neutral-600 hover:text-[#2432C5] font-medium"
                  >
                    {item}
                  </Link>
                  <motion.div
                    className="absolute -bottom-1 left-0 h-[2px] bg-[#2432C5]"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="mt-6 md:mt-0 text-sm text-neutral-500"
            >
              © {new Date().getFullYear()} Running Buddies. All rights reserved.
            </motion.div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
