import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

const experiences = [
  {
    title: "Freelancer",
    company: "Self",
    period: "04/2025 - Present",
    location: "Remote",
    description: [
      "Provide consulting and development services across EVM, Solana, and full-stack projects",
      "Advise on Web3 architecture and build secure, scalable solutions for clients",
    ],
    url: null,
  },
  {
    title: "Senior Full-Stack & Blockchain Developer",
    company: "Curvegrid Inc",
    period: "2024 - 04/2025",
    location: "Remote",
    description: [
      "Combined blockchain expertise with broader software engineering responsibilities, including infrastructure, DevOps, and microservices",
      "Continued advancing trading and DeFi bots with automation and monitoring features",
      "Supported internal knowledge-sharing initiatives to scale engineering culture",
      "Transitioned to freelance career to offer consulting and development services",
    ],
    url: "https://www.curvegrid.com/",
  },
  {
    title: "Senior Full-Stack & Blockchain Developer",
    company: "Curvegrid Inc",
    period: "2022 - 2024",
    location: "Remote",
    description: [
      "Led development of distributed storage and indexing systems bridging real-world applications with decentralized infrastructure",
      "Built trading bots, token analytics, and DeFi utilities on Solana and EVM",
      "Delivered robust front-end dashboards (Nuxt.js, React, Tailwind) and backend services (Go, Node.js, PostgreSQL)",
      "Acted as a bridge between product goals and technical execution",
    ],
    url: "https://www.curvegrid.com/",
  },
  {
    title: "Mid-Senior Full-Stack & Blockchain Developer",
    company: "Curvegrid Inc",
    period: "2021 - 2022",
    location: "Remote",
    description: [
      "Expanded into Solana development, building Rust-based programs with Anchor",
      "Designed wallet integration standards and TypeScript utilities to support multi-chain user experiences",
      "Enhanced smart contracts and backend APIs for scalability",
      "Mentored junior developers and participated in code reviews",
    ],
    url: "https://www.curvegrid.com/",
  },
  {
    title: "Junior Full-Stack & Blockchain Developer",
    company: "Curvegrid Inc",
    period: "2020 - 2021",
    location: "Remote",
    description: [
      "Built full-stack features for blockchain-enabled applications to lower barriers to Web3 adoption",
      "Deployed Solidity smart contracts for financial functions (staking, token transfers)",
      "Integrated Go and Node.js SDKs with front-end frameworks",
      "Contributed to testing and automation pipelines",
    ],
    url: "https://www.curvegrid.com/",
  },
  {
    title: "Internship",
    company: "Curvegrid Inc",
    period: "08/2017 - 2019",
    location: "Remote",
    description: [
      "Supported early blockchain integration efforts, contributing test scripts and utilities",
      "Assisted in building proof-of-concept web front-ends (React/TypeScript) and backend services",
      "Created documentation and developer resources alongside senior engineers",
    ],
    url: "https://www.curvegrid.com/",
  },
]

export function Experience() {
  return (
    <section id="experience" className="mb-20">
      <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Experience</h3>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-xl">{exp.title}</CardTitle>
                  <CardDescription className="mt-1 flex items-center gap-2 text-base">
                    {exp.company}
                    {exp.url && (
                      <a
                        href={exp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:underline"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">{exp.period}</Badge>
                  <p className="mt-1 text-sm text-muted-foreground">{exp.location}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {exp.description.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
