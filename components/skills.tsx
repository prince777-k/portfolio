import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const skillCategories = [
  {
    category: "Blockchain",
    skills: ["EVM", "Solana", "Solidity", "Rust", "Anchor", "Foundry", "Hardhat"],
  },
  {
    category: "Backend",
    skills: ["Go", "Node.js", "Python", "PostgreSQL", "Microservices", "DevOps"],
  },
  {
    category: "Frontend",
    skills: ["React", "TypeScript", "Nuxt.js", "Tailwind CSS", "Next.js"],
  },
  {
    category: "Languages",
    skills: ["Japanese (Native)", "English (Proficient)"],
  },
]

export function Skills() {
  return (
    <section id="skills" className="mb-20">
      <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Skills & Technologies
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {skillCategories.map((category) => (
          <Card key={category.category}>
            <CardHeader>
              <CardTitle className="text-lg">{category.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
