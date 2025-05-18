"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, Download, ExternalLink, BookOpen, Users, Calendar, ArrowUpDown } from "lucide-react"

export default function AcademicArchivePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<"date" | "citations" | "relevance">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const allTopics = [
    "Exercise Physiology",
    "Biomechanics",
    "Sports Psychology",
    "Nutrition",
    "Injury Prevention",
    "Training Methods",
    "Recovery",
    "Performance",
    "Endurance",
    "Marathon",
    "Ultra Running",
  ]

  const papers: AcademicPaper[] = [
    {
      id: 1,
      title: "The Effects of High-Intensity Interval Training on Endurance Performance in Recreational Runners",
      authors: ["Johnson, M.", "Smith, A.", "Williams, R."],
      journal: "Journal of Sports Science",
      year: 2022,
      abstract:
        "This study examined the effects of 8 weeks of high-intensity interval training (HIIT) on endurance performance in recreational runners. Results showed significant improvements in VO2max and time to exhaustion.",
      topics: ["Exercise Physiology", "Training Methods", "Performance", "Endurance"],
      citations: 24,
      type: "research",
      url: "#",
      pdfUrl: "#",
    },
    {
      id: 2,
      title: "Nutritional Strategies for Marathon Performance: A Systematic Review",
      authors: ["Brown, L.", "Garcia, J.", "Chen, H."],
      journal: "International Journal of Sports Nutrition",
      year: 2021,
      abstract:
        "This systematic review analyzed 42 studies on nutritional strategies for marathon runners. Carbohydrate loading, protein timing, and hydration strategies were found to significantly impact performance.",
      topics: ["Nutrition", "Marathon", "Performance", "Endurance"],
      citations: 56,
      type: "review",
      url: "#",
      pdfUrl: "#",
    },
    {
      id: 3,
      title: "Biomechanical Analysis of Foot Strike Patterns in Elite Marathon Runners",
      authors: ["Taylor, K.", "Anderson, P.", "Wilson, J."],
      journal: "Journal of Biomechanics",
      year: 2020,
      abstract:
        "This study analyzed the foot strike patterns of 45 elite marathon runners using high-speed video analysis. Findings suggest that forefoot and midfoot striking were more prevalent among faster runners.",
      topics: ["Biomechanics", "Marathon", "Performance"],
      citations: 78,
      type: "research",
      url: "#",
      pdfUrl: "#",
    },
    {
      id: 4,
      title: "Psychological Factors Affecting Ultra-Marathon Performance: A Qualitative Study",
      authors: ["Roberts, S.", "Thompson, D."],
      journal: "Journal of Sports Psychology",
      year: 2021,
      abstract:
        "This qualitative study interviewed 20 ultra-marathon runners to identify key psychological factors affecting performance. Mental toughness, goal-setting, and dissociation techniques emerged as important strategies.",
      topics: ["Sports Psychology", "Ultra Running", "Performance"],
      citations: 18,
      type: "research",
      url: "#",
      pdfUrl: "#",
    },
    {
      id: 5,
      title: "Recovery Modalities for Distance Runners: Evidence-Based Recommendations",
      authors: ["Martinez, C.", "Lee, S.", "Patel, R."],
      journal: "Sports Medicine Review",
      year: 2022,
      abstract:
        "This review examines the efficacy of various recovery modalities for distance runners, including cold water immersion, compression garments, and active recovery. Evidence-based recommendations are provided.",
      topics: ["Recovery", "Endurance", "Training Methods"],
      citations: 42,
      type: "review",
      url: "#",
      pdfUrl: "#",
    },
    {
      id: 6,
      title: "Injury Incidence and Risk Factors in Recreational Runners: A Prospective Cohort Study",
      authors: ["White, J.", "Black, M.", "Green, T."],
      journal: "American Journal of Sports Medicine",
      year: 2019,
      abstract:
        "This prospective cohort study followed 1,203 recreational runners over 12 months to identify injury incidence and risk factors. Training volume, previous injuries, and biomechanical factors were significant predictors.",
      topics: ["Injury Prevention", "Biomechanics"],
      citations: 105,
      type: "research",
      url: "#",
      pdfUrl: "#",
    },
    {
      id: 7,
      title: "The Role of Strength Training in Distance Running Performance: A Meta-Analysis",
      authors: ["Harris, B.", "Lewis, K.", "Walker, M."],
      journal: "Journal of Strength and Conditioning Research",
      year: 2020,
      abstract:
        "This meta-analysis examined 28 studies on the effects of strength training on distance running performance. Results showed significant improvements in running economy and time trial performance.",
      topics: ["Training Methods", "Performance", "Exercise Physiology"],
      citations: 67,
      type: "review",
      url: "#",
      pdfUrl: "#",
    },
    {
      id: 8,
      title: "Hydration Strategies for Marathon Runners: Practical Recommendations",
      authors: ["Miller, A.", "Davis, C."],
      journal: "International Journal of Sports Nutrition",
      year: 2021,
      abstract:
        "This paper provides practical recommendations for hydration strategies before, during, and after marathon races based on current scientific evidence and field studies.",
      topics: ["Nutrition", "Marathon", "Performance"],
      citations: 31,
      type: "review",
      url: "#",
      pdfUrl: "#",
    },
    {
      id: 9,
      title: "The Impact of Sleep Quality on Running Performance and Recovery",
      authors: ["Thompson, R.", "King, S.", "Adams, J."],
      journal: "Sleep Science",
      year: 2022,
      abstract:
        "This study investigated the relationship between sleep quality and running performance in 78 competitive runners. Results showed significant correlations between sleep metrics and performance indicators.",
      topics: ["Recovery", "Performance", "Exercise Physiology"],
      citations: 15,
      type: "research",
      url: "#",
      pdfUrl: "#",
    },
    {
      id: 10,
      title: "Altitude Training for Endurance Athletes: Mechanisms and Methods",
      authors: ["Gonzalez, M.", "Hernandez, L.", "Lopez, J."],
      journal: "High Altitude Medicine & Biology",
      year: 2020,
      abstract:
        "This review examines the physiological mechanisms and practical methods of altitude training for endurance athletes, including live-high train-high, live-high train-low, and simulated altitude approaches.",
      topics: ["Exercise Physiology", "Training Methods", "Endurance"],
      citations: 48,
      type: "review",
      url: "#",
      pdfUrl: "#",
    },
  ]

  const toggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic))
    } else {
      setSelectedTopics([...selectedTopics, topic])
    }
  }

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  const filteredPapers = papers
    .filter((paper) => {
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          paper.title.toLowerCase().includes(query) ||
          paper.abstract.toLowerCase().includes(query) ||
          paper.authors.some((author) => author.toLowerCase().includes(query))
        )
      }
      return true
    })
    .filter((paper) => {
      // Filter by selected topics
      if (selectedTopics.length === 0) return true
      return selectedTopics.some((topic) => paper.topics.includes(topic))
    })
    .sort((a, b) => {
      // Sort by selected criteria
      if (sortBy === "date") {
        return sortOrder === "asc" ? a.year - b.year : b.year - a.year
      } else if (sortBy === "citations") {
        return sortOrder === "asc" ? a.citations - b.citations : b.citations - a.citations
      } else {
        // Relevance - based on number of matching topics
        const aRelevance = selectedTopics.filter((topic) => a.topics.includes(topic)).length
        const bRelevance = selectedTopics.filter((topic) => b.topics.includes(topic)).length
        return sortOrder === "asc" ? aRelevance - bRelevance : bRelevance - aRelevance
      }
    })

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Academic Archive</h1>
          <p className="text-neutral-600">
            Browse research papers, reviews, and studies on running science and sports medicine.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-4">Search</h2>
              <div className="relative">
                <Input
                  placeholder="Search papers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500" />
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-4">Topics</h2>
              <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                {allTopics.map((topic) => (
                  <div key={topic} className="flex items-center space-x-2">
                    <Checkbox
                      id={`topic-${topic}`}
                      checked={selectedTopics.includes(topic)}
                      onCheckedChange={() => toggleTopic(topic)}
                    />
                    <Label htmlFor={`topic-${topic}`} className="text-sm cursor-pointer">
                      {topic}
                    </Label>
                  </div>
                ))}
              </div>
              {selectedTopics.length > 0 && (
                <Button variant="link" className="mt-2 p-0 h-auto text-sm" onClick={() => setSelectedTopics([])}>
                  Clear all filters
                </Button>
              )}
            </div>

            <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-4">Sort By</h2>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="sort-date"
                    name="sort"
                    checked={sortBy === "date"}
                    onChange={() => setSortBy("date")}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="sort-date" className="text-sm cursor-pointer">
                    Publication Date
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="sort-citations"
                    name="sort"
                    checked={sortBy === "citations"}
                    onChange={() => setSortBy("citations")}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="sort-citations" className="text-sm cursor-pointer">
                    Citation Count
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="sort-relevance"
                    name="sort"
                    checked={sortBy === "relevance"}
                    onChange={() => setSortBy("relevance")}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="sort-relevance" className="text-sm cursor-pointer">
                    Relevance
                  </Label>
                </div>
                <Button variant="outline" size="sm" className="mt-2 w-full" onClick={toggleSortOrder}>
                  {sortOrder === "desc" ? "Descending" : "Ascending"}
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Papers List */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-neutral-200 rounded-lg shadow-sm overflow-hidden">
              <Tabs defaultValue="all">
                <div className="border-b border-neutral-200">
                  <TabsList className="w-full justify-start rounded-none border-b border-neutral-200 bg-transparent p-0">
                    <TabsTrigger
                      value="all"
                      className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-black data-[state=active]:bg-transparent"
                    >
                      All Papers
                    </TabsTrigger>
                    <TabsTrigger
                      value="research"
                      className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-black data-[state=active]:bg-transparent"
                    >
                      Research
                    </TabsTrigger>
                    <TabsTrigger
                      value="review"
                      className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-black data-[state=active]:bg-transparent"
                    >
                      Reviews
                    </TabsTrigger>
                    <TabsTrigger
                      value="saved"
                      className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-black data-[state=active]:bg-transparent"
                    >
                      Saved
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="all" className="p-0">
                  <div className="divide-y divide-neutral-200">
                    {filteredPapers.length > 0 ? (
                      filteredPapers.map((paper) => <PaperCard key={paper.id} paper={paper} />)
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-neutral-500">No papers match your search criteria.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="research" className="p-0">
                  <div className="divide-y divide-neutral-200">
                    {filteredPapers.filter((p) => p.type === "research").length > 0 ? (
                      filteredPapers
                        .filter((p) => p.type === "research")
                        .map((paper) => <PaperCard key={paper.id} paper={paper} />)
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-neutral-500">No research papers match your search criteria.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="review" className="p-0">
                  <div className="divide-y divide-neutral-200">
                    {filteredPapers.filter((p) => p.type === "review").length > 0 ? (
                      filteredPapers
                        .filter((p) => p.type === "review")
                        .map((paper) => <PaperCard key={paper.id} paper={paper} />)
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-neutral-500">No review papers match your search criteria.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="saved" className="p-0">
                  <div className="p-8 text-center">
                    <p className="text-neutral-500">Sign in to view your saved papers.</p>
                    <Button className="mt-4 bg-black text-white hover:bg-neutral-800">Sign In</Button>
                  </div>
                </TabsContent>
              </Tabs>
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

interface AcademicPaper {
  id: number
  title: string
  authors: string[]
  journal: string
  year: number
  abstract: string
  topics: string[]
  citations: number
  type: "research" | "review"
  url: string
  pdfUrl: string
}

function PaperCard({ paper }: { paper: AcademicPaper }) {
  return (
    <div className="p-6 hover:bg-neutral-50 transition-colors">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-1 hover:text-orange-500 transition-colors">
            <a href={paper.url} target="_blank" rel="noopener noreferrer">
              {paper.title}
            </a>
          </h3>
          <p className="text-sm text-neutral-600 mb-2">
            {paper.authors.join(", ")} • {paper.journal} • {paper.year}
          </p>
          <p className="text-neutral-700 mb-3">{paper.abstract}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {paper.topics.map((topic) => (
              <Badge key={topic} variant="outline" className="bg-neutral-50">
                {topic}
              </Badge>
            ))}
          </div>
          <div className="flex items-center text-sm text-neutral-500 gap-4">
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              <span>{paper.type === "research" ? "Research Paper" : "Review"}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{paper.citations} citations</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{paper.year}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>PDF</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <ExternalLink className="h-4 w-4" />
            <span>View</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
