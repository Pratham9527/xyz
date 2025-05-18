"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import {
  Play,
  ArrowRight,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Calendar,
  MapPin,
  Mail,
  Phone,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star } from "lucide-react"
import Lenis from "lenis"
import { FloatingNav } from "@/components/ui/floating-navbar"
import { IconHome, IconMicrophone, IconArticle } from "@tabler/icons-react"

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Refs for scroll animations
  const episodesRef = useRef(null)
  const topicsRef = useRef(null)
  const testimonialsRef = useRef(null)
  const newsletterRef = useRef(null)
  const eventsRef = useRef(null)

  // Check if elements are in view
  const isEpisodesInView = useInView(episodesRef, { once: true, amount: 0.2 })
  const isTopicsInView = useInView(topicsRef, { once: true, amount: 0.2 })
  const isTestimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.2 })
  const isNewsletterInView = useInView(newsletterRef, { once: true, amount: 0.3 })
  const isEventsInView = useInView(eventsRef, { once: true, amount: 0.2 })

  // Scroll animations
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, -50])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.2])
  const scale = useTransform(scrollY, [0, 300], [1, 0.9])
  const springY = useSpring(y, { stiffness: 100, damping: 30 })
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 })

  const navItems = [
    {
      name: "Home",
      link: "/",
      id: "home",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Podcast",
      link: "/podcast",
      id: "podcast",
      icon: <IconMicrophone className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Blog",
      link: "/blog",
      id: "blog",
      icon: <IconArticle className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ]

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // @ts-ignore
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      <FloatingNav navItems={navItems} />
      <main className="flex-1 max-w-7xl mx-auto px-4 pt-20 sm:px-6 lg:px-8 w-full">
        {/* Hero Section - Keeping the same as requested */}
        <motion.section
          className="mt-8 flex justify-center relative"
          style={{
            y: springY,
            opacity: springOpacity,
            scale: springScale,
          }}
        >
          <h1 className="text-[clamp(3rem,15vw,12rem)] font-black leading-none tracking-tighter text-black">BOOOOM</h1>
          <motion.div
            className="absolute -z-10 w-[150%] h-[150%] bg-blue-100 rounded-full opacity-20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </motion.section>

        {/* Scroll indicator */}
        <motion.div
          className="flex justify-center mt-8 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.div
            className="flex flex-col items-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <p className="text-neutral-500 text-sm mb-2">Scroll to explore</p>
            <ChevronDown className="h-6 w-6 text-blue-500" />
          </motion.div>
        </motion.div>

        {/* Episode Cards */}
        <motion.div
          ref={episodesRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isEpisodesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mt-8 sm:mt-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Episode Card 1 */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              animate={isEpisodesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="https://i.pinimg.com/736x/d3/76/5c/d3765c7283a14a05cc2d6136a41f642d.jpg"
                  alt="Benjamin Thomas"
                  width={400}
                  height={400}
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-xl sm:text-2xl font-bold leading-tight">
                    The Future of Content Creation
                  </h3>
                  <p className="text-sm mt-2 text-neutral-200">28:32 • Content Talk</p>
                </div>
                <motion.button
                  className="absolute right-6 bottom-6 bg-blue-600 text-white hover:bg-[#2432C5] hover:text-white transition-colors rounded-full p-3"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="h-6 w-6" />
                </motion.button>
              </div>
              <div className="mt-4 px-2">
                <p className="font-bold text-lg">Benjamin Thomas</p>
                <p className="text-sm text-neutral-500">42 years old • Journalist</p>
              </div>
            </motion.div>

            {/* Episode Card 2 */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              animate={isEpisodesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="https://i.pinimg.com/736x/04/ed/e1/04ede1fb8f3f868bd9b68d04f3221998.jpg"
                  alt="Jonathan Wise"
                  width={400}
                  height={400}
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-xl sm:text-2xl font-bold leading-tight">
                    Building Your Newsletter Empire
                  </h3>
                  <p className="text-sm mt-2 text-neutral-200">35:21 • Newsletter Session</p>
                </div>
                <motion.button
                  className="absolute right-6 bottom-6 bg-blue-600 text-white hover:bg-[#2432C5] hover:text-white transition-colors rounded-full p-3"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="h-6 w-6" />
                </motion.button>
              </div>
              <div className="mt-4 px-2">
                <p className="font-bold text-lg">Jonathan Wise</p>
                <p className="text-sm text-neutral-500">37 years old • Product Designer</p>
              </div>
            </motion.div>

            {/* Episode Card 3 */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              animate={isEpisodesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="https://i.pinimg.com/736x/79/ae/9a/79ae9a4d6fdb4dfa9b9b45830c8463e0.jpg"
                  alt="Samantha William"
                  width={400}
                  height={400}
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-xl sm:text-2xl font-bold leading-tight">
                    Podcasting in the Digital Age
                  </h3>
                  <p className="text-sm mt-2 text-neutral-200">38:22 • Podcast Deep Dive</p>
                </div>
                <motion.button
                  className="absolute right-6 bottom-6 bg-blue-600 text-white hover:bg-[#2432C5] hover:text-white transition-colors rounded-full p-3"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="h-6 w-6" />
                </motion.button>
              </div>
              <div className="mt-4 px-2">
                <p className="font-bold text-lg">Samantha William</p>
                <p className="text-sm text-neutral-500">29 years old • Endurance Runner</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Blog Sidebar */}
        <motion.section
          ref={topicsRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isTopicsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mt-20 md:mt-24 px-2 sm:px-0"
        >
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="w-full md:w-2/3 pr-0 md:pr-8">
              <div className="flex justify-between items-center">
                <motion.h2
                  initial={{ opacity: 0, x: -30 }}
                  animate={isTopicsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg sm:text-xl font-bold text-blue-700"
                >
                  BROWSE TOPICS
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={isTopicsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Link
                    href="/topics"
                    className="text-sm text-blue-700 hover:text-blue-500 transition-colors flex items-center"
                  >
                    SEE ALL TOPICS
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                    >
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </motion.span>
                  </Link>
                </motion.div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Topic Card 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={isTopicsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ y: -10 }}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 relative text-white shadow-lg hover:shadow-xl transform transition-all duration-300 border border-blue-200"
                >
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-2xl font-bold text-blue-900">Content Creation</h3>
                      <p className="text-sm text-blue-600 mt-1">Create & Share</p>
                    </div>
                    <motion.div whileHover={{ rotate: 10, scale: 1.1 }} className="bg-white p-2 rounded-full shadow-md">
                      <Image
                        src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=100&q=80"
                        alt="Morning run illustration"
                        width={50}
                        height={50}
                        className="h-12 w-12 rounded-full object-cover border-2 border-blue-100"
                      />
                    </motion.div>
                  </div>

                  <div className="space-y-4">
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="group flex items-start gap-4 bg-white/80 hover:bg-white p-4 rounded-xl transition-all duration-300 hover:shadow-md"
                    >
                      <div className="relative">
                        <Image
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
                          alt="Thomas Sumner"
                          width={40}
                          height={40}
                          className="h-12 w-12 rounded-full object-cover border-2 border-blue-100 flex-shrink-0"
                        />
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1"
                        >
                          <Play className="h-3 w-3 text-white" />
                        </motion.div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold leading-tight text-blue-900 group-hover:text-blue-700 transition-colors">
                          Mastering the Art of Blog Writing
                        </p>
                        <p className="text-xs text-blue-600 mt-1">Alex Chen</p>
                      </div>
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, repeatType: "reverse" }}
                      >
                        <ArrowRight className="h-4 w-4 text-blue-500 flex-shrink-0 mt-1" />
                      </motion.div>
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="group flex items-start gap-4 bg-white/80 hover:bg-white p-4 rounded-xl transition-all duration-300 hover:shadow-md"
                    >
                      <div className="relative">
                        <Image
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
                          alt="David Chen"
                          width={40}
                          height={40}
                          className="h-12 w-12 rounded-full object-cover border-2 border-blue-100 flex-shrink-0"
                        />
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1"
                        >
                          <Play className="h-3 w-3 text-white" />
                        </motion.div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold leading-tight text-blue-900 group-hover:text-blue-700 transition-colors">
                          Growing Your Podcast Audience
                        </p>
                        <p className="text-xs text-blue-600 mt-1">Sarah Miller</p>
                      </div>
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 2,
                          repeatType: "reverse",
                          delay: 0.3,
                        }}
                      >
                        <ArrowRight className="h-4 w-4 text-blue-500 flex-shrink-0 mt-1" />
                      </motion.div>
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="group flex items-start gap-4 bg-white/80 hover:bg-white p-4 rounded-xl transition-all duration-300 hover:shadow-md"
                    >
                      <div className="relative">
                        <Image
                          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
                          alt="Emma Rodriguez"
                          width={40}
                          height={40}
                          className="h-12 w-12 rounded-full object-cover border-2 border-blue-100 flex-shrink-0"
                        />
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1"
                        >
                          <Play className="h-3 w-3 text-white" />
                        </motion.div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold leading-tight text-blue-900 group-hover:text-blue-700 transition-colors">
                          Newsletter Growth Strategies
                        </p>
                        <p className="text-xs text-blue-600 mt-1">David Park</p>
                      </div>
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 2,
                          repeatType: "reverse",
                          delay: 0.6,
                        }}
                      >
                        <ArrowRight className="h-4 w-4 text-blue-500 flex-shrink-0 mt-1" />
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Topic Card 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={isTopicsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ y: -10 }}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 relative text-white shadow-lg hover:shadow-xl transform transition-all duration-300 border border-blue-200"
                >
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-2xl font-bold text-blue-900">Content Tools</h3>
                      <p className="text-sm text-blue-600 mt-1">Create & Engage</p>
                    </div>
                    <motion.div whileHover={{ rotate: 10, scale: 1.1 }} className="bg-white p-2 rounded-full shadow-md">
                      <Image
                        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&q=80"
                        alt="Stretching illustration"
                        width={50}
                        height={50}
                        className="h-12 w-12 rounded-full object-cover border-2 border-blue-100"
                      />
                    </motion.div>
                  </div>

                  <div className="space-y-4">
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="group flex items-start gap-4 bg-white/80 hover:bg-white p-4 rounded-xl transition-all duration-300 hover:shadow-md"
                    >
                      <div className="relative">
                        <Image
                          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80"
                          alt="James Wilson"
                          width={40}
                          height={40}
                          className="h-12 w-12 rounded-full object-cover border-2 border-blue-100 flex-shrink-0"
                        />
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1"
                        >
                          <Play className="h-3 w-3 text-white" />
                        </motion.div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold leading-tight text-blue-900 group-hover:text-blue-700 transition-colors">
                          Building an Engaging Blog Layout
                        </p>
                        <p className="text-xs text-blue-600 mt-1">Dr. James Wilson</p>
                      </div>
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, repeatType: "reverse" }}
                      >
                        <ArrowRight className="h-4 w-4 text-blue-500 flex-shrink-0 mt-1" />
                      </motion.div>
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="group flex items-start gap-4 bg-white/80 hover:bg-white p-4 rounded-xl transition-all duration-300 hover:shadow-md"
                    >
                      <div className="relative">
                        <Image
                          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80"
                          alt="Sarah Martinez"
                          width={40}
                          height={40}
                          className="h-12 w-12 rounded-full object-cover border-2 border-blue-100 flex-shrink-0"
                        />
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1"
                        >
                          <Play className="h-3 w-3 text-white" />
                        </motion.div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold leading-tight text-blue-900 group-hover:text-blue-700 transition-colors">
                          Creating a Successful Podcast Series
                        </p>
                        <p className="text-xs text-blue-600 mt-1">Emma Rodriguez</p>
                      </div>
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 2,
                          repeatType: "reverse",
                          delay: 0.3,
                        }}
                      >
                        <ArrowRight className="h-4 w-4 text-blue-500 flex-shrink-0 mt-1" />
                      </motion.div>
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="group flex items-start gap-4 bg-white/80 hover:bg-white p-4 rounded-xl transition-all duration-300 hover:shadow-md"
                    >
                      <div className="relative">
                        <Image
                          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80"
                          alt="Michael Brown"
                          width={40}
                          height={40}
                          className="h-12 w-12 rounded-full object-cover border-2 border-blue-100 flex-shrink-0"
                        />
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1"
                        >
                          <Play className="h-3 w-3 text-white" />
                        </motion.div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold leading-tight text-blue-900 group-hover:text-blue-700 transition-colors">
                          Newsletter Design Best Practices
                        </p>
                        <p className="text-xs text-blue-600 mt-1">Michael Brown</p>
                      </div>
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 2,
                          repeatType: "reverse",
                          delay: 0.6,
                        }}
                      >
                        <ArrowRight className="h-4 w-4 text-blue-500 flex-shrink-0 mt-1" />
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Blog Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isTopicsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="w-full md:w-1/3 mt-8 md:mt-0"
            >
              <h2 className="text-lg font-bold text-blue-700">FROM THE BLOG</h2>
              <div className="mt-4 space-y-6">
                <motion.div
                  whileHover={{ scale: 1.03, x: 5 }}
                  className="bg-blue-50 hover:bg-blue-100 p-5 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                >
                  <h3 className="font-medium text-black">The Ultimate Guide to Content Creation</h3>
                  <p className="text-xs text-neutral-500 mt-1">Alex Chen</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03, x: 5 }}
                  className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                >
                  <h3 className="font-medium text-black">Building Your First Podcast</h3>
                  <p className="text-xs text-neutral-500 mt-1">Sarah Miller</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03, x: 5 }}
                  className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                >
                  <h3 className="font-medium text-black">Newsletter Growth Strategies</h3>
                  <p className="text-xs text-neutral-500 mt-1">David Park</p>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="destructive"
                    className="w-full bg-blue-600 text-white hover:bg-[#2432C5] hover:text-white transition-colors rounded-full"
                  >
                    Visit Blog
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                    >
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.span>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section
          ref={testimonialsRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mt-20 py-12 sm:py-16 bg-blue-600 rounded-2xl relative overflow-hidden"
        >
          {/* Decorative elements */}
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 bg-blue-400 rounded-full opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500 rounded-full opacity-20"
            animate={{
              scale: [1, 1.1, 1],
              x: [0, -10, 0],
              y: [0, 10, 0],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
          />

          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-white"
            >
              What Our Listeners Say
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center space-x-1 mb-4 text-amber-500">
                  <Star className="h-5 w-5 fill-amber-500" />
                  <Star className="h-5 w-5 fill-amber-500" />
                  <Star className="h-5 w-5 fill-amber-500" />
                  <Star className="h-5 w-5 fill-amber-500" />
                  <Star className="h-5 w-5 fill-amber-500" />
                </div>
                <p className="text-neutral-700 mb-4">
                  "This platform completely changed how I create content. The blog tools and podcast features helped me grow my audience more effectively than ever before."
                </p>
                <div className="flex items-center">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                    alt="Sarah J."
                    width={50}
                    height={50}
                    className="h-10 w-10 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <p className="font-medium">Sarah J.</p>
                    <p className="text-sm text-neutral-500">Marathon Runner</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center space-x-1 mb-4 text-amber-500">
                  <Star className="h-5 w-5 fill-amber-500" />
                  <Star className="h-5 w-5 fill-amber-500" />
                  <Star className="h-5 w-5 fill-amber-500" />
                  <Star className="h-5 w-5 fill-amber-500" />
                  <Star className="h-5 w-5 fill-amber-500" />
                </div>
                <p className="text-neutral-700 mb-4">
                  "I love how the newsletter builder makes creating engaging content seamless. The drag-and-drop feature has revolutionized my content workflow."
                </p>
                <div className="flex items-center">
                  <Image
                    src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=100&q=80"
                    alt="Michael T."
                    width={50}
                    height={50}
                    className="h-10 w-10 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <p className="font-medium">Michael T.</p>
                    <p className="text-sm text-neutral-500">Trail Runner</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center space-x-1 mb-4 text-amber-500">
                  <Star className="h-5 w-5 fill-amber-500" />
                  <Star className="h-5 w-5 fill-amber-500" />
                  <Star className="h-5 w-5 fill-amber-500" />
                  <Star className="h-5 w-5 fill-amber-500" />
                  <Star className="h-5 w-5 fill-amber-500" />
                </div>
                <p className="text-neutral-700 mb-4">
                  "As a beginner content creator, I was intimidated by podcasting, but the platform's tools gave me the confidence to start my own show."
                </p>
                <div className="flex items-center">
                  <Image
                    src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=100&q=80"
                    alt="Jessica K."
                    width={50}
                    height={50}
                    className="h-10 w-10 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <p className="font-medium">Jessica K.</p>
                    <p className="text-sm text-neutral-500">Beginner Runner</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Newsletter Section */}
        <motion.section
          ref={newsletterRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isNewsletterInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mt-20 py-16 bg-gradient-to-br from-[#2432C5] to-[#4B5FFF] text-white rounded-2xl relative overflow-hidden"
        >
          {/* Animated background elements */}
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full opacity-10"
            animate={{
              scale: [1, 1.5, 1],
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full opacity-10"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -20, 0],
              y: [0, 20, 0],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
          />

          <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isNewsletterInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-3xl font-bold mb-4"
            >
              Join Our Content Creator Community
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isNewsletterInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-neutral-100 max-w-2xl mx-auto mb-8 text-sm sm:text-base"
            >
              Get weekly content creation tips, podcast updates, and exclusive resources delivered straight to your inbox.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isNewsletterInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto px-4 sm:px-0"
            >
              <Input
                placeholder="Your email address"
                className="flex-1 bg-white/10 text-white placeholder:text-white/60 border-white/20 h-12"
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button className="bg-blue-600 text-white hover:bg-[#2432C5] hover:text-white transition-colors h-12 font-medium">
                  Subscribe
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Events Section */}
        <motion.section
          ref={eventsRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isEventsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mt-20 py-16"
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-2">
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                animate={isEventsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl sm:text-3xl font-bold text-black"
              >
                Upcoming Events
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isEventsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Link
                  href="/events"
                  className="text-[#2432C5] hover:text-[#4B5FFF] transition-colors text-sm sm:text-base font-medium flex items-center"
                >
                  View All Events
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                  >
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </motion.span>
                </Link>
              </motion.div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isEventsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -10 }}
                className="border border-neutral-200 rounded-xl overflow-hidden group hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative">
                  <Image
                    src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=80"
                    alt="Live Podcast Recording"
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="absolute top-4 left-4 bg-[#2432C5] text-white text-xs px-3 py-1.5 rounded-full font-medium"
                  >
                    LIVE EVENT
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">Content Creation Workshop</h3>
                  <p className="text-neutral-600 mb-4">
                    Learn how to create engaging blog posts, podcasts, and newsletters that resonate with your audience.
                  </p>
                  <div className="flex items-center text-sm text-neutral-500 mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>June 15, 2023 • 6:00 PM</span>
                  </div>
                  <div className="flex items-center text-sm text-neutral-500 mb-6">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>Runner's Hub, New York City</span>
                  </div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full bg-[#2432C5] text-white hover:bg-[#4B5FFF] transition-colors rounded-full">
                      Register Now
                    </Button>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isEventsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ y: -10 }}
                className="border border-neutral-200 rounded-xl overflow-hidden group hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative">
                  <Image
                    src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80"
                    alt="Group Run"
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="absolute top-4 left-4 bg-[#2432C5] text-white text-xs px-2 py-1 rounded-full font-medium"
                  >
                    FREE
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">Podcast Launch Masterclass</h3>
                  <p className="text-neutral-600 mb-4">
                    Hands-on workshop on starting and growing your podcast from scratch.
                  </p>
                  <div className="flex items-center text-sm text-neutral-500 mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>June 22, 2023 • 8:00 AM</span>
                  </div>
                  <div className="flex items-center text-sm text-neutral-500 mb-6">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>Central Park, New York City</span>
                  </div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full bg-[#2432C5] text-white hover:bg-[#4B5FFF] transition-colors rounded-full">
                      RSVP Now
                    </Button>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isEventsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ y: -10 }}
                className="border border-neutral-200 rounded-xl overflow-hidden group hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative">
                  <Image
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"
                    alt="Running Workshop"
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="absolute top-4 left-4 bg-[#2432C5] text-white text-xs px-2 py-1 rounded-full font-medium"
                  >
                    WORKSHOP
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">Newsletter Design Workshop</h3>
                  <p className="text-neutral-600 mb-4">
                    Learn to create beautiful, engaging newsletters that your subscribers will love.
                  </p>
                  <div className="flex items-center text-sm text-neutral-500 mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>July 8, 2023 • 10:00 AM</span>
                  </div>
                  <div className="flex items-center text-sm text-neutral-500 mb-6">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>Runner's Edge Studio, Brooklyn</span>
                  </div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full bg-[#2432C5] text-white hover:bg-[#4B5FFF] transition-colors rounded-full">
                      Register Now
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 bg-gradient-to-br from-blue-700 to-blue-500 py-12 sm:py-16 rounded-2xl text-white"
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-1 mb-4">
                  <span className="font-bold text-xl">BOOOOM</span>
                </motion.div>
                <p className="text-white/80 mb-4">
                  A content creation platform and community for creators, sharing tools, tips, and inspiration for building engaging blogs, podcasts, and newsletters.
                </p>
                <div className="flex space-x-4">
                  <motion.a href="#" whileHover={{ y: -3, scale: 1.2 }} className="text-white/70 hover:text-white">
                    <Twitter className="h-5 w-5" />
                  </motion.a>
                  <motion.a href="#" whileHover={{ y: -3, scale: 1.2 }} className="text-white/70 hover:text-white">
                    <Instagram className="h-5 w-5" />
                  </motion.a>
                  <motion.a href="#" whileHover={{ y: -3, scale: 1.2 }} className="text-white/70 hover:text-white">
                    <Facebook className="h-5 w-5" />
                  </motion.a>
                  <motion.a href="#" whileHover={{ y: -3, scale: 1.2 }} className="text-white/70 hover:text-white">
                    <Youtube className="h-5 w-5" />
                  </motion.a>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-4">Explore</h3>
                <ul className="space-y-2">
                  {["Home", "Podcast", "Blog", "Events", "About Us"].map((item, index) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      <Link
                        href={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                        className="text-white/70 hover:text-white flex items-center"
                      >
                        <motion.span whileHover={{ x: 3 }} className="inline-block">
                          {item}
                        </motion.span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-4">Resources</h3>
                <ul className="space-y-2">
                  {["Quote Board", "Markdown Editor", "Video Gallery", "Interactive Zine", "Academic Archive"].map(
                    (item, index) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index + 0.5 }}
                      >
                        <Link
                          href={`/${item.toLowerCase().replace(" ", "-")}`}
                          className="text-white/70 hover:text-white flex items-center"
                        >
                          <motion.span whileHover={{ x: 3 }} className="inline-block">
                            {item}
                          </motion.span>
                        </Link>
                      </motion.li>
                    ),
                  )}
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-4">Contact</h3>
                <ul className="space-y-2">
                  <motion.li className="flex items-start" whileHover={{ x: 3 }}>
                    <Mail className="h-5 w-5 mr-2 mt-0.5 text-white/70" />
                    <span className="text-white/70">hello@boooom.com</span>
                  </motion.li>
                  <motion.li className="flex items-start" whileHover={{ x: 3 }}>
                    <Phone className="h-5 w-5 mr-2 mt-0.5 text-white/70" />
                    <span className="text-white/70">+1 (555) 123-4567</span>
                  </motion.li>
                  <motion.li className="flex items-start" whileHover={{ x: 3 }}>
                    <MapPin className="h-5 w-5 mr-2 mt-0.5 text-white/70" />
                    <span className="text-white/70">
                      123 BOOOOM Lane
                      <br />
                      New York, NY 10001
                    </span>
                  </motion.li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-white/60 text-sm mb-4 md:mb-0">
                © {new Date().getFullYear()} BOOOOM Podcast. All rights reserved.
              </p>
              <div className="flex space-x-6">
                {["Terms of Service", "Privacy Policy", "Cookie Policy"].map((item, index) => (
                  <motion.div key={item} whileHover={{ y: -2 }}>
                    <Link
                      href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm text-white/60 hover:text-white"
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.footer>
      </main>
    </div>
  )
}
