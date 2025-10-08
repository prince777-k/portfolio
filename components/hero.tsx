import { Badge } from "@/components/ui/badge"

export function Hero() {
  return (
    <section id="overview" className="mb-20">
      <div className="space-y-6">
        <Badge variant="secondary" className="text-sm">
          Available for Freelance Projects
        </Badge>
        <h2 className="text-balance text-5xl font-bold tracking-tight lg:text-6xl">
          Freelance Full-Stack & Blockchain Developer
        </h2>
        <p className="text-pretty text-xl leading-relaxed text-muted-foreground lg:text-2xl">
          Web3 Architecture | DeFi Solutions | EVM & Solana Expertise
        </p>
      </div>
    </section>
  )
}
