"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ZinePage {
  id: string
  title: string
  content: string
  image: string
}

const samplePages: ZinePage[] = [
  {
    id: "1",
    title: "Welcome to Our Zine",
    content: "A collection of thoughts, art, and stories.",
    image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80"
  },
  {
    id: "2",
    title: "Chapter 1: Beginnings",
    content: "Every story has a beginning, and this is ours.",
    image: "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80"
  },
  {
    id: "3",
    title: "Chapter 2: Growth",
    content: "Through challenges, we find our strength.",
    image: "https://images.unsplash.com/photo-1557683311-eac922347aa1?w=800&q=80"
  },
  // Add more pages as needed
]

export default function ZinePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const currentPage = useTransform(
    smoothProgress,
    [0, 1],
    [0, samplePages.length - 1]
  )

  const handleNext = () => {
    if (containerRef.current) {
      const nextPage = Math.min(
        Math.floor(currentPage.get()) + 1,
        samplePages.length - 1
      )
      const pageHeight = containerRef.current.scrollHeight / samplePages.length
      containerRef.current.scrollTo({
        top: nextPage * pageHeight,
        behavior: "smooth"
      })
    }
  }

  const handlePrevious = () => {
    if (containerRef.current) {
      const prevPage = Math.max(Math.floor(currentPage.get()) - 1, 0)
      const pageHeight = containerRef.current.scrollHeight / samplePages.length
      containerRef.current.scrollTo({
        top: prevPage * pageHeight,
        behavior: "smooth"
      })
    }
  }

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      <div
        ref={containerRef}
        className="h-full overflow-y-auto snap-y snap-mandatory"
      >
        {samplePages.map((page, index) => (
          <motion.div
            key={page.id}
            className="h-screen snap-start relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0">
              <img
                src={page.image}
                alt={page.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50" />
            </div>

            <div className="relative h-full flex items-center justify-center">
              <motion.div
                className="text-center text-white max-w-2xl px-4"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-4xl md:text-6xl font-bold mb-4">
                  {page.title}
                </h2>
                <p className="text-xl md:text-2xl">{page.content}</p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={handlePrevious}
          className="bg-black/50 text-white hover:bg-black/70"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={handleNext}
          className="bg-black/50 text-white hover:bg-black/70"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="fixed right-8 top-1/2 transform -translate-y-1/2">
        <div className="flex flex-col gap-2">
          {samplePages.map((_, index) => (
            <motion.div
              key={index}
              className="w-2 h-2 rounded-full bg-white"
              style={{
                opacity: useTransform(
                  currentPage,
                  [index - 0.5, index, index + 0.5],
                  [0.3, 1, 0.3]
                ),
                scale: useTransform(
                  currentPage,
                  [index - 0.5, index, index + 0.5],
                  [1, 1.5, 1]
                )
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
