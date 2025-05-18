"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User } from "lucide-react"
import BackButton from "@/components/back-button"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content?: string
  author: string
  date: string
  readTime: string
  tags: string[]
  image: string
}

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Default blog posts
    const defaultBlogPosts = [
      {
        id: 1,
        title: "The Art of Showing Up: Running and Life's Daily Battles",
        excerpt:
          "Consistency is the key to success in running and in life. Learn how showing up every day, even when you don't feel like it, can transform your running journey.",
        content: `
          <p>We've all been there. The alarm goes off at 5:30 AM. It's dark outside. Maybe it's raining. Your bed is warm and comfortable. Every fiber of your being is telling you to hit snooze and roll over. But something else—something deeper—gets you to swing your legs over the side of the bed, lace up your shoes, and head out the door.</p>
          
          <p>That something is the art of showing up.</p>
          
          <h2>The Daily Decision</h2>
          
          <p>Every run begins with a decision. Not the decision to run fast or slow, long or short, but simply the decision to begin. This moment—the choice to start despite resistance—is perhaps the most powerful moment in any runner's journey.</p>
          
          <p>What makes this decision so difficult is that it's never a one-time choice. It's a decision you must make over and over again, day after day. The marathon isn't just on race day; it's the accumulation of all those mornings when you chose to run when every excuse not to was readily available.</p>
          
          <h2>Consistency Over Intensity</h2>
          
          <p>There's a common misconception that transformation requires intense effort. While intensity certainly has its place, the real magic happens through consistency. A moderate 30-minute run that you do four times a week will transform you more profoundly than an exhausting two-hour run you do once a month.</p>
          
          <p>This principle extends beyond running. Consider any area of life where you're seeking growth—relationships, career, learning a new skill. Showing up consistently, even when your efforts seem small or imperfect, will always outperform sporadic bursts of intense activity.</p>
          
          <h2>The Compound Effect of Showing Up</h2>
          
          <p>Each time you lace up your shoes when you don't feel like it, you're not just adding another run to your log. You're strengthening your "showing up" muscle. You're building evidence that you're the kind of person who does what they say they'll do, even when it's difficult.</p>
          
          <p>This has a compound effect. The more you show up for your runs, the more likely you are to show up in other areas of your life. You become more reliable—to yourself and to others. You develop grit and resilience that serve you in facing life's inevitable challenges.</p>
          
          <h2>Practical Strategies for Showing Up</h2>
          
          <p>If you struggle with consistency, here are some practical strategies that can help:</p>
          
          <ul>
            <li><strong>Lower the bar:</strong> Sometimes we don't start because our expectations are too high. If you planned for a 5-mile run but can't face it, tell yourself you'll just do 1 mile. Often, once you start, you'll find the motivation to continue.</li>
            <li><strong>Prepare the night before:</strong> Lay out your running clothes, prepare your water bottle, plan your route. Remove as many morning decisions as possible.</li>
            <li><strong>Find an accountability partner:</strong> Knowing someone is waiting for you makes it much harder to bail.</li>
            <li><strong>Track your consistency:</strong> Use a simple calendar to mark each day you run. The visual chain of successes can be a powerful motivator.</li>
            <li><strong>Celebrate showing up:</strong> Rather than only celebrating performance metrics like distance or pace, take pride in simply showing up. Each run is a win, regardless of how it went.</li>
          </ul>
          
          <h2>The Deeper Meaning</h2>
          
          <p>At its core, running teaches us that life isn't about waiting for perfect conditions or motivation. It's about showing up anyway, doing what needs to be done despite resistance, and trusting that the accumulation of these small acts of discipline will lead to transformation.</p>
          
          <p>So tomorrow morning, when that alarm goes off and every excuse presents itself, remember: the simple act of showing up is already a victory. The rest is just details.</p>
        `,
        author: "Michael Wilson",
        date: "May 15, 2023",
        readTime: "5 min read",
        tags: ["Motivation", "Lifestyle", "Training"],
        image: "/placeholder.svg?height=800&width=1200",
      },
      {
        id: 2,
        title: "How I Survived My First Run (And My Work Week)",
        excerpt:
          "A humorous take on balancing a demanding job with the challenges of starting a running routine. Tips and tricks for making it all work.",
        content: `
          <p>Let me paint you a picture: Monday morning, 6 AM. My alarm blares with the subtlety of a fire truck. I've committed to this new running routine, convinced by a friend (former friend, I should say) that it would "change my life." As I fumble to lace up my brand new running shoes—still pristine because, well, they're new—I wonder what cosmic joke led me to believe I could balance a 60-hour work week with becoming a "runner."</p>
          
          <h2>The First Mile: A Comedy of Errors</h2>
          
          <p>My first run was nothing short of a disaster. I'd downloaded one of those couch-to-5K apps, which cheerfully informed me that I'd be alternating between walking and jogging. "How hard could this be?" I thought. Turns out, very hard.</p>
          
          <p>Three minutes into my first jogging interval, I was making noises I'd never heard come out of my body before. A dog walker gave me a concerned look, probably debating whether to call an ambulance. My "moisture-wicking" shirt was soaked through, and I had a profound realization: I had made a terrible mistake.</p>
          
          <p>But somehow, I finished that first session. And then, inexplicably, I went out again two days later.</p>
          
          <h2>The Work-Run Balance: Finding Harmony in Chaos</h2>
          
          <p>Balancing a demanding career with a new running habit requires strategy, flexibility, and a healthy dose of self-forgiveness. Here's what I've learned over the past six months:</p>
          
          <h3>1. The Calendar Is Your Best Friend</h3>
          
          <p>I schedule my runs like I schedule important meetings—they go directly into my work calendar. This serves two purposes: it blocks the time so colleagues can't book over it, and it mentally commits me to showing up. A 6 AM run followed by a 9 AM presentation? That goes on the calendar as "Morning Run + Prep Time."</p>
          
          <h3>2. The Lunch Run Revolution</h3>
          
          <p>I discovered that a 30-minute run during lunch can be more revitalizing than scrolling through social media while inhaling a sandwich at my desk. I keep a small toiletry kit and a change of clothes at the office, and I've mapped out several routes of different lengths starting from my building.</p>
          
          <h3>3. The "Something Is Better Than Nothing" Principle</h3>
          
          <p>Some weeks are just brutal. Back-to-back meetings, urgent deadlines, late nights. On these weeks, I've learned to scale back without giving up entirely. Can't do your planned 45-minute run? A 10-minute jog around the block still counts. The goal is consistency, not perfection.</p>
          
          <h3>4. The Multitasking Runner</h3>
          
          <p>I've become adept at combining running with other necessary activities. Need to brainstorm solutions for a work problem? A solo run can be surprisingly productive thinking time. Have to catch up on industry news? Queue up a relevant podcast. Need to connect with a friend? Invite them for a conversational-pace run instead of happy hour.</p>
          
          <h2>The Unexpected Benefits</h2>
          
          <p>Six months into this experiment, I've noticed some surprising changes that go beyond the physical benefits:</p>
          
          <ul>
            <li><strong>Improved focus:</strong> After a morning run, my mind is sharper for those 9 AM strategy meetings.</li>
            <li><strong>Better stress management:</strong> A tough run helps put work challenges in perspective.</li>
            <li><strong>Enhanced creativity:</strong> Some of my best ideas now come during the middle miles of a run.</li>
            <li><strong>Stronger boundaries:</strong> Protecting my run time has helped me establish healthier work-life boundaries overall.</li>
          </ul>
          
          <h2>The Plot Twist</h2>
          
          <p>The biggest surprise? I actually look forward to my runs now. That first painful mile has become a welcome transition—from work mode to me time, from stress to release, from thinking to simply being.</p>
          
          <p>Don't get me wrong—there are still mornings when my alarm goes off and I question all my life choices. There are still weeks when work takes precedence and my running shoes stay in the closet more than I'd like. But I've found a balance that works most of the time, and I've learned to forgive myself when it doesn't.</p>
          
          <p>So if you're contemplating adding running to your already packed schedule, my advice is simple: start small, be flexible, forgive yourself often, and trust that somewhere between the chaos of your calendar and the rhythm of your footsteps, you'll find an unexpected harmony.</p>
          
          <p>And yes, my friend was right after all—it did change my life. (But I still won't admit that to their face.)</p>
        `,
        author: "Alyssa Jordaan",
        date: "May 10, 2023",
        readTime: "7 min read",
        tags: ["Beginners", "Work-Life Balance"],
        image: "/placeholder.svg?height=800&width=1200",
      },
      {
        id: 3,
        title: "Running Teaches You Patience... or How to Tolerate It",
        excerpt:
          "Discover how the mental challenges of long-distance running can help develop patience that transfers to other areas of your life.",
        author: "Michael Wilson",
        date: "May 5, 2023",
        readTime: "6 min read",
        tags: ["Mental Training", "Endurance"],
        image: "/placeholder.svg?height=800&width=1200",
      },
      {
        id: 4,
        title: "Run Now, Complain Later: My New Life Motto",
        excerpt:
          "How adopting a 'do it first, complain later' attitude revolutionized my running routine and helped me achieve goals I never thought possible.",
        author: "Ben Clark",
        date: "April 28, 2023",
        readTime: "4 min read",
        tags: ["Motivation", "Mindset"],
        image: "/placeholder.svg?height=800&width=1200",
      },
      {
        id: 5,
        title: "The Perfect Morning Running Routine",
        excerpt:
          "A step-by-step guide to creating a morning running routine that energizes your day and fits into even the busiest schedule.",
        author: "Sarah Johnson",
        date: "April 22, 2023",
        readTime: "8 min read",
        tags: ["Morning Runs", "Routines", "Productivity"],
        image: "/placeholder.svg?height=800&width=1200",
      },
      {
        id: 6,
        title: "From Couch to 5K: A Journey in Perseverance",
        excerpt:
          "My personal story of transformation from a sedentary lifestyle to completing my first 5K race, with lessons learned along the way.",
        author: "Thomas Sumner",
        date: "April 15, 2023",
        readTime: "10 min read",
        tags: ["Beginners", "5K", "Transformation"],
        image: "/placeholder.svg?height=800&width=1200",
      },
    ]

    // Try to get the post from localStorage first
    const storedPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]")
    const allPosts = [...storedPosts, ...defaultBlogPosts]

    const postId = Number(params.id)
    const foundPost = allPosts.find((p) => p.id === postId)

    if (foundPost) {
      setPost(foundPost)
    } else {
      // Post not found, redirect to blog page
      router.push("/blog")
    }

    setIsLoading(false)
  }, [params.id, router])

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p>Loading...</p>
        </main>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p>Post not found</p>
          <Link href="/blog">
            <Button variant="link">Back to Blog</Button>
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BackButton />

        <article>
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, index) => (
                <span key={index} className="text-xs px-2 py-1 bg-neutral-100 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <p className="text-xl text-neutral-600 mb-6">{post.excerpt}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              width={1200}
              height={800}
              className="w-full object-cover"
            />
          </div>

          {/* Content */}
          {post.content ? (
            <div className="prose prose-lg max-w-none mb-12" dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <div className="prose prose-lg max-w-none mb-12">
              <p>
                This is a preview of the blog post. The full content is not available yet. Check back later or browse
                other articles.
              </p>
            </div>
          )}

          {/* Author Bio */}
          <div className="bg-neutral-100 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-4">
              <Image
                src="/placeholder.svg?height=100&width=100"
                alt={post.author}
                width={80}
                height={80}
                className="rounded-full"
              />
              <div>
                <h3 className="font-bold text-lg mb-1">About {post.author}</h3>
                <p className="text-neutral-600">
                  {post.author} is a passionate runner and writer who loves sharing insights about running, fitness, and
                  maintaining a balanced lifestyle.
                </p>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* We'd normally fetch related posts based on tags, but for simplicity we'll just show a few */}
              <div className="border border-neutral-200 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Related post"
                  width={300}
                  height={200}
                  className="w-full aspect-video object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold mb-1">5 Essential Stretches for Runners</h3>
                  <p className="text-sm text-neutral-500">4 min read</p>
                </div>
              </div>
              <div className="border border-neutral-200 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Related post"
                  width={300}
                  height={200}
                  className="w-full aspect-video object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold mb-1">Nutrition Tips for Long Distance Running</h3>
                  <p className="text-sm text-neutral-500">6 min read</p>
                </div>
              </div>
              <div className="border border-neutral-200 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Related post"
                  width={300}
                  height={200}
                  className="w-full aspect-video object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold mb-1">How to Choose the Right Running Shoes</h3>
                  <p className="text-sm text-neutral-500">5 min read</p>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section Placeholder */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Comments</h2>
            <div className="bg-neutral-100 rounded-lg p-8 text-center">
              <p className="text-neutral-600 mb-4">Join the conversation! Sign in to leave a comment.</p>
              <Button className="bg-black text-white hover:bg-neutral-800">Sign In to Comment</Button>
            </div>
          </div>
        </article>
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
