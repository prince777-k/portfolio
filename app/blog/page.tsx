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
    id: 2,
    title: "Optimizing Gas Costs in Solidity Smart Contracts",
    description:
      "Practical techniques and patterns to reduce transaction costs and improve smart contract efficiency on Ethereum.",
    content:
      "Gas optimization is crucial for Ethereum smart contracts. This article covers storage patterns, function modifiers, batch operations, and compiler optimizations. We'll examine real-world examples of gas-efficient code and demonstrate how small changes can lead to significant cost savings for your users.",
    date: "2024-03-10",
    tags: ["Solidity", "Ethereum", "Optimization"],
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "Cross-Chain Bridge Security: Best Practices",
    description:
      "Understanding the security considerations and design patterns for building secure blockchain bridges.",
    content:
      "Cross-chain bridges are critical infrastructure but also prime targets for attacks. We analyze common vulnerabilities, explore secure design patterns, and discuss validation mechanisms. Learn about multi-signature schemes, time-locks, and monitoring systems that can protect your bridge implementation.",
    date: "2024-03-05",
    tags: ["Security", "Cross-Chain", "Architecture"],
    readTime: "15 min read",
  },
  {
    id: 4,
    title: "Next.js 14 and Web3 Wallet Integration",
    description:
      "Best practices for integrating Web3 wallets and blockchain interactions in modern React applications.",
    content:
      "Integrating Web3 wallets into Next.js applications requires careful consideration of SSR, client-side state, and user experience. This guide covers wallet connection patterns, transaction signing, network switching, and error handling. We'll build a complete example with MetaMask, WalletConnect, and Coinbase Wallet support.",
    date: "2024-02-28",
    tags: ["Next.js", "Web3", "React"],
    readTime: "10 min read",
  },
  {
    id: 5,
    title: "Move Language: The Future of Smart Contract Development",
    description: "Exploring Move's resource-oriented programming model and its advantages for blockchain development.",
    content:
      "Move introduces a new paradigm for smart contract development with its resource-oriented approach. We explore how Move's type system prevents common vulnerabilities, examine its formal verification capabilities, and compare it to Solidity and Rust. Learn why major blockchains are adopting Move for their smart contract platforms.",
    date: "2024-02-22",
    tags: ["Move", "Aptos", "Sui"],
    readTime: "11 min read",
  },
  {
    id: 6,
    title: "Anchor Framework Deep Dive: Building on Solana",
    description: "A complete guide to using Anchor framework for developing secure and efficient Solana programs.",
    content:
      "Anchor simplifies Solana program development with its Rust-based framework. This comprehensive guide covers account validation, instruction handlers, error handling, and testing strategies. We'll build a complete DeFi protocol from scratch, demonstrating Anchor's powerful abstractions and security features.",
    date: "2024-02-18",
    tags: ["Anchor", "Solana", "Rust"],
    readTime: "14 min read",
  },
  {
    id: 7,
    title: "NFT Marketplace Architecture on Ethereum",
    description: "Designing and implementing a production-ready NFT marketplace with ERC-721 and ERC-1155 standards.",
    content:
      "Building an NFT marketplace involves smart contract design, off-chain indexing, and frontend integration. We cover auction mechanisms, royalty enforcement, metadata standards, and IPFS integration. Learn how to implement features like offers, bundles, and lazy minting while maintaining security and gas efficiency.",
    date: "2024-02-12",
    tags: ["NFT", "Ethereum", "Solidity"],
    readTime: "13 min read",
  },
  {
    id: 8,
    title: "Decentralized Identity Solutions with DIDs",
    description:
      "Implementing self-sovereign identity systems using Decentralized Identifiers and Verifiable Credentials.",
    content:
      "Decentralized identity puts users in control of their personal data. This article explores DID standards, verifiable credentials, and identity verification flows. We'll implement a complete identity system with credential issuance, verification, and revocation, demonstrating how to build privacy-preserving applications.",
    date: "2024-02-08",
    tags: ["Identity", "Web3", "Privacy"],
    readTime: "9 min read",
  },
  {
    id: 9,
    title: "Layer 2 Scaling Solutions: Optimistic vs ZK Rollups",
    description: "Comparing different Layer 2 scaling approaches and their trade-offs for Ethereum applications.",
    content:
      "Layer 2 solutions are essential for Ethereum's scalability. We compare Optimistic Rollups and ZK Rollups, examining their security models, finality times, and development complexity. Learn when to choose each approach and how to migrate existing applications to Layer 2 while maintaining composability.",
    date: "2024-02-03",
    tags: ["Layer 2", "Ethereum", "Scaling"],
    readTime: "16 min read",
  },
  {
    id: 10,
    title: "Building a DEX with Automated Market Makers",
    description: "Understanding AMM mechanics and implementing a decentralized exchange with liquidity pools.",
    content:
      "Automated Market Makers revolutionized DeFi by enabling permissionless liquidity provision. This guide covers constant product formulas, impermanent loss, concentrated liquidity, and multi-hop routing. We'll implement a complete DEX with swap, add liquidity, and remove liquidity functions, plus advanced features like flash swaps.",
    date: "2024-01-28",
    tags: ["DeFi", "DEX", "AMM"],
    readTime: "18 min read",
  },
  {
    id: 11,
    title: "Smart Contract Testing with Foundry",
    description: "Advanced testing strategies and fuzzing techniques for Solidity smart contracts using Foundry.",
    content:
      "Foundry brings modern testing practices to Solidity development. Learn how to write comprehensive unit tests, implement property-based testing with fuzzing, and use invariant testing to catch edge cases. We'll cover gas profiling, test coverage analysis, and continuous integration setup for your smart contract projects.",
    date: "2024-01-22",
    tags: ["Testing", "Foundry", "Solidity"],
    readTime: "10 min read",
  },
  {
    id: 12,
    title: "Cosmos SDK: Building Application-Specific Blockchains",
    description:
      "Creating custom blockchains with the Cosmos SDK and understanding the Inter-Blockchain Communication protocol.",
    content:
      "The Cosmos SDK enables developers to build custom blockchains tailored to specific use cases. This comprehensive guide covers module development, state management, transaction processing, and IBC integration. Learn how to create a sovereign blockchain that can communicate with the broader Cosmos ecosystem.",
    date: "2024-01-18",
    tags: ["Cosmos", "IBC", "Go"],
    readTime: "17 min read",
  },
  {
    id: 13,
    title: "Web3 Authentication Patterns and Best Practices",
    description: "Implementing secure authentication flows with wallet signatures and session management.",
    content:
      "Web3 authentication differs fundamentally from traditional auth systems. We explore signature-based authentication, message signing standards, session management, and SIWE (Sign-In with Ethereum). Learn how to implement secure authentication that respects user privacy while preventing common attacks like replay and phishing.",
    date: "2024-01-12",
    tags: ["Authentication", "Web3", "Security"],
    readTime: "11 min read",
  },
  {
    id: 14,
    title: "Polygon zkEVM: Ethereum Compatibility with Zero-Knowledge Proofs",
    description: "Exploring Polygon's zkEVM and building scalable applications with ZK technology.",
    content:
      "Polygon zkEVM brings EVM compatibility to zero-knowledge rollups. This article explores how zkEVM achieves Ethereum equivalence, the benefits of ZK proofs for scalability and privacy, and how to deploy existing Solidity contracts. We'll build a sample application and compare performance with other Layer 2 solutions.",
    date: "2024-01-08",
    tags: ["Polygon", "zkEVM", "Layer 2"],
    readTime: "14 min read",
  },
  {
    id: 15,
    title: "Tokenomics Design for Sustainable DeFi Protocols",
    description: "Designing token economics that align incentives and create sustainable decentralized protocols.",
    content:
      "Sustainable tokenomics is crucial for long-term protocol success. We analyze successful token models, explore incentive mechanisms, and discuss governance token design. Learn how to balance inflation, utility, and value capture while creating aligned incentives for all stakeholders in your DeFi protocol.",
    date: "2024-01-03",
    tags: ["Tokenomics", "DeFi", "Economics"],
    readTime: "12 min read",
  },
  {
    id: 16,
    title: "Oracles in Blockchain: Chainlink and Beyond",
    description: "Understanding oracle networks and integrating real-world data into smart contracts securely.",
    content:
      "Oracles bridge the gap between blockchains and external data. This guide covers oracle design patterns, Chainlink's decentralized oracle network, and alternative solutions. Learn how to integrate price feeds, random numbers, and custom data sources while understanding the trust assumptions and security considerations.",
    date: "2023-12-28",
    tags: ["Oracles", "Chainlink", "Data"],
    readTime: "9 min read",
  },
  {
    id: 17,
    title: "DAO Governance Mechanisms and Implementation",
    description: "Building decentralized autonomous organizations with on-chain governance and voting systems.",
    content:
      "DAOs represent a new paradigm for organizational governance. We explore voting mechanisms, proposal systems, treasury management, and delegation patterns. Learn how to implement secure governance contracts, prevent common attacks, and design governance systems that balance efficiency with decentralization.",
    date: "2023-12-22",
    tags: ["DAO", "Governance", "Web3"],
    readTime: "15 min read",
  },
  {
    id: 18,
    title: "MEV Protection Strategies for DeFi Applications",
    description: "Understanding Maximal Extractable Value and implementing protection mechanisms for users.",
    content:
      "MEV poses significant challenges for DeFi users. This article explains sandwich attacks, front-running, and back-running, then explores protection mechanisms like private mempools, batch auctions, and MEV-aware protocols. Learn how to design applications that minimize MEV extraction and protect your users.",
    date: "2023-12-18",
    tags: ["MEV", "DeFi", "Security"],
    readTime: "13 min read",
  },
  {
    id: 19,
    title: "Building on TON: Telegram's Blockchain Platform",
    description: "Developing decentralized applications on The Open Network with FunC smart contracts.",
    content:
      "TON offers unique advantages with its integration into Telegram's massive user base. This guide covers FunC programming, TON's actor model, message passing, and wallet integration. We'll build a complete dApp that leverages TON's high throughput and Telegram's social features for viral growth.",
    date: "2023-12-12",
    tags: ["TON", "FunC", "Telegram"],
    readTime: "11 min read",
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

export default function BlogPage() {
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
    <div className="space-y-6">
      {blogPosts.map((post) => {
        const isExpanded = expandedPosts.has(post.id)
        return (
          <Card
            key={post.id}
            className="group cursor-pointer border-2 transition-all hover:border-cyan-500 hover:shadow-lg"
            onClick={() => togglePost(post.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-xl transition-colors group-hover:text-cyan-600">{post.title}</CardTitle>
                  <CardDescription className="mt-2">{post.description}</CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-cyan-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </Button>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-cyan-500" />
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
                  <Clock className="h-4 w-4 text-purple-500" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </CardHeader>
            {isExpanded && (
              <CardContent className="border-t-2 pt-6">
                <p className="leading-relaxed text-gray-700">{post.content}</p>
              </CardContent>
            )}
            <CardContent className={isExpanded ? "pt-4" : ""}>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-cyan-50 text-cyan-600 hover:bg-cyan-100">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
