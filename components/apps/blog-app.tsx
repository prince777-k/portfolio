"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const blogPosts = [
  {
    id: 1,
    title: "Building Scalable DeFi Applications on Solana",
    description:
      "A comprehensive guide to architecting high-performance decentralized finance applications on Solana's blockchain.",
    content:
      "In this deep dive, we explore the architecture patterns and best practices for building DeFi applications on Solana. We'll cover program design, account management, cross-program invocations, and optimization techniques to maximize throughput. Learn how to leverage Solana's parallel transaction processing and implement efficient state management for your DeFi protocols.",
    date: "2024-03-15",
    tags: ["DeFi", "Solana", "Rust"],
    readTime: "12 min read",
  },
  {
    id: 20,
    title: "AI and Blockchain: Integrating Machine Learning with Web3",
    description:
      "Exploring the intersection of artificial intelligence and blockchain technology for next-gen applications.",
    content:
      "The convergence of AI and blockchain opens new possibilities for decentralized intelligence. We explore on-chain ML models, decentralized training, AI-powered DeFi strategies, and NFT generation. Learn how to integrate AI services with smart contracts while maintaining decentralization and verifiability.",
    date: "2023-12-08",
    tags: ["AI", "Blockchain", "Innovation"],
    readTime: "16 min read",
  },
]

export function BlogApp() {
  const [expandedPosts, setExpandedPosts] = useState<Set<number>>(new Set())

  const togglePost = (id: number) => {
    setExpandedPosts((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <div className="h-full overflow-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Blog</h1>
        <p className="mt-2 text-muted-foreground">
          Insights on blockchain development, Web3 architecture, and decentralized technologies
        </p>
      </div>

      <div className="grid gap-6">
        {blogPosts.map((post) => {
          const isExpanded = expandedPosts.has(post.id)
          return (
            <Card
              key={post.id}
              className="group cursor-pointer border-2 transition-all hover:border-primary hover:shadow-lg"
              onClick={() => togglePost(post.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl transition-colors group-hover:text-primary">{post.title}</CardTitle>
                    <CardDescription className="mt-2">{post.description}</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" className="flex-shrink-0">
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-primary" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </CardHeader>
              {isExpanded && (
                <CardContent className="border-t pt-6">
                  <p className="leading-relaxed">{post.content}</p>
                </CardContent>
              )}
              <CardContent className={isExpanded ? "pt-4" : ""}>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
