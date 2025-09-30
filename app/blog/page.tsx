import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const blogPosts = [
  {
    id: 1,
    title: "Building Scalable DeFi Applications on Ethereum",
    description: "A deep dive into architectural patterns for building robust decentralized finance applications.",
    date: "2024-03-15",
    tags: ["DeFi", "Ethereum", "Smart Contracts"],
    readTime: "8 min read",
  },
  {
    id: 2,
    title: "Optimizing Gas Costs in Solidity",
    description: "Practical techniques to reduce transaction costs and improve smart contract efficiency.",
    date: "2024-02-28",
    tags: ["Solidity", "Optimization", "Web3"],
    readTime: "6 min read",
  },
  {
    id: 3,
    title: "Cross-Chain Bridge Architecture",
    description: "Understanding the security considerations and design patterns for blockchain bridges.",
    date: "2024-02-10",
    tags: ["Blockchain", "Security", "Architecture"],
    readTime: "10 min read",
  },
  {
    id: 4,
    title: "Next.js 14 and Web3 Integration",
    description: "Best practices for integrating Web3 wallets and blockchain interactions in modern React apps.",
    date: "2024-01-22",
    tags: ["Next.js", "React", "Web3"],
    readTime: "7 min read",
  },
]

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:px-12 lg:py-20">
      <div className="mb-12">
        <h1 className="text-balance text-4xl font-bold tracking-tight">Blog</h1>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">
          Thoughts on blockchain development, Web3 architecture, and modern web technologies.
        </p>
      </div>

      <div className="grid gap-6">
        {blogPosts.map((post) => (
          <Card key={post.id} className="transition-colors hover:bg-accent/5">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-2xl">{post.title}</CardTitle>
                  <CardDescription className="mt-2 text-base">{post.description}</CardDescription>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </time>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
