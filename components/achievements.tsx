import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Bot, Code2, Shield } from "lucide-react"

const achievements = [
  {
    icon: TrendingUp,
    title: "Consulting Success",
    description: "Increased client satisfaction by delivering scalable architectures for 20+ projects",
  },
  {
    icon: Bot,
    title: "Trading Automation",
    description: "Boosted trading bots efficiency by 15% through enhanced automation features",
  },
  {
    icon: Code2,
    title: "Rust Integration",
    description: "Led team to integrate Rust programs, reducing transaction costs by 10%",
  },
  {
    icon: Shield,
    title: "Smart Contract Excellence",
    description: "Implemented 50+ smart contracts, improving blockchain service reliability by 20%",
  },
]

export function Achievements() {
  return (
    <section id="achievements" className="mb-20">
      <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Key Achievements</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {achievements.map((achievement) => (
          <Card key={achievement.title}>
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <achievement.icon className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">{achievement.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{achievement.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
