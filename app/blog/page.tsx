import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "Building Scalable DeFi Applications on Solana",
    description:
      "A comprehensive guide to architecting high-performance decentralized finance applications on Solana's blockchain.",
    date: "2024-03-15",
    tags: ["DeFi", "Solana", "Rust"],
    readTime: "12 min read",
  },
  {
    id: 2,
    title: "Optimizing Gas Costs in Solidity Smart Contracts",
    description:
      "Practical techniques and patterns to reduce transaction costs and improve smart contract efficiency on Ethereum.",
    date: "2024-03-10",
    tags: ["Solidity", "Ethereum", "Optimization"],
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "Cross-Chain Bridge Security: Best Practices",
    description:
      "Understanding the security considerations and design patterns for building secure blockchain bridges.",
    date: "2024-03-05",
    tags: ["Security", "Cross-Chain", "Architecture"],
    readTime: "15 min read",
  },
  {
    id: 4,
    title: "Next.js 14 and Web3 Wallet Integration",
    description:
      "Best practices for integrating Web3 wallets and blockchain interactions in modern React applications.",
    date: "2024-02-28",
    tags: ["Next.js", "Web3", "React"],
    readTime: "10 min read",
  },
  {
    id: 5,
    title: "Move Language: The Future of Smart Contract Development",
    description: "Exploring Move's resource-oriented programming model and its advantages for blockchain development.",
    date: "2024-02-22",
    tags: ["Move", "Aptos", "Sui"],
    readTime: "11 min read",
  },
  {
    id: 6,
    title: "Anchor Framework Deep Dive: Building on Solana",
    description: "A complete guide to using Anchor framework for developing secure and efficient Solana programs.",
    date: "2024-02-18",
    tags: ["Anchor", "Solana", "Rust"],
    readTime: "14 min read",
  },
  {
    id: 7,
    title: "NFT Marketplace Architecture on Ethereum",
    description: "Designing and implementing a production-ready NFT marketplace with ERC-721 and ERC-1155 standards.",
    date: "2024-02-12",
    tags: ["NFT", "Ethereum", "Solidity"],
    readTime: "13 min read",
  },
  {
    id: 8,
    title: "Decentralized Identity Solutions with DIDs",
    description:
      "Implementing self-sovereign identity systems using Decentralized Identifiers and Verifiable Credentials.",
    date: "2024-02-08",
    tags: ["Identity", "Web3", "Privacy"],
    readTime: "9 min read",
  },
  {
    id: 9,
    title: "Layer 2 Scaling Solutions: Optimistic vs ZK Rollups",
    description: "Comparing different Layer 2 scaling approaches and their trade-offs for Ethereum applications.",
    date: "2024-02-03",
    tags: ["Layer 2", "Ethereum", "Scaling"],
    readTime: "16 min read",
  },
  {
    id: 10,
    title: "Building a DEX with Automated Market Makers",
    description: "Understanding AMM mechanics and implementing a decentralized exchange with liquidity pools.",
    date: "2024-01-28",
    tags: ["DeFi", "DEX", "AMM"],
    readTime: "18 min read",
  },
  {
    id: 11,
    title: "Smart Contract Testing with Foundry",
    description: "Advanced testing strategies and fuzzing techniques for Solidity smart contracts using Foundry.",
    date: "2024-01-22",
    tags: ["Testing", "Foundry", "Solidity"],
    readTime: "10 min read",
  },
  {
    id: 12,
    title: "Cosmos SDK: Building Application-Specific Blockchains",
    description:
      "Creating custom blockchains with the Cosmos SDK and understanding the Inter-Blockchain Communication protocol.",
    date: "2024-01-18",
    tags: ["Cosmos", "IBC", "Go"],
    readTime: "17 min read",
  },
  {
    id: 13,
    title: "Web3 Authentication Patterns and Best Practices",
    description: "Implementing secure authentication flows with wallet signatures and session management.",
    date: "2024-01-12",
    tags: ["Authentication", "Web3", "Security"],
    readTime: "11 min read",
  },
  {
    id: 14,
    title: "Polygon zkEVM: Ethereum Compatibility with Zero-Knowledge Proofs",
    description: "Exploring Polygon's zkEVM and building scalable applications with ZK technology.",
    date: "2024-01-08",
    tags: ["Polygon", "zkEVM", "Layer 2"],
    readTime: "14 min read",
  },
  {
    id: 15,
    title: "Tokenomics Design for Sustainable DeFi Protocols",
    description: "Designing token economics that align incentives and create sustainable decentralized protocols.",
    date: "2024-01-03",
    tags: ["Tokenomics", "DeFi", "Economics"],
    readTime: "12 min read",
  },
  {
    id: 16,
    title: "Oracles in Blockchain: Chainlink and Beyond",
    description: "Understanding oracle networks and integrating real-world data into smart contracts securely.",
    date: "2023-12-28",
    tags: ["Oracles", "Chainlink", "Data"],
    readTime: "9 min read",
  },
  {
    id: 17,
    title: "DAO Governance Mechanisms and Implementation",
    description: "Building decentralized autonomous organizations with on-chain governance and voting systems.",
    date: "2023-12-22",
    tags: ["DAO", "Governance", "Web3"],
    readTime: "15 min read",
  },
  {
    id: 18,
    title: "MEV Protection Strategies for DeFi Applications",
    description: "Understanding Maximal Extractable Value and implementing protection mechanisms for users.",
    date: "2023-12-18",
    tags: ["MEV", "DeFi", "Security"],
    readTime: "13 min read",
  },
  {
    id: 19,
    title: "Building on TON: Telegram's Blockchain Platform",
    description: "Developing decentralized applications on The Open Network with FunC smart contracts.",
    date: "2023-12-12",
    tags: ["TON", "FunC", "Telegram"],
    readTime: "11 min read",
  },
  {
    id: 20,
    title: "AI and Blockchain: Integrating Machine Learning with Web3",
    description:
      "Exploring the intersection of artificial intelligence and blockchain technology for next-gen applications.",
    date: "2023-12-08",
    tags: ["AI", "Blockchain", "Innovation"],
    readTime: "16 min read",
  },
]

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:px-12 lg:py-20">
      <div className="mb-12">
        <h1 className="text-balance text-4xl font-bold tracking-tight">Blog</h1>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">
          Insights on blockchain development, Web3 architecture, DeFi protocols, and cutting-edge decentralized
          technologies.
        </p>
      </div>

      <div className="grid gap-6">
        {blogPosts.map((post) => (
          <Card key={post.id} className="group transition-all hover:border-primary/50 hover:shadow-lg">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-2xl transition-colors group-hover:text-primary">{post.title}</CardTitle>
                  <CardDescription className="mt-2 text-base">{post.description}</CardDescription>
                </div>
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
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
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
