import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Code2,
  Blocks,
  Server,
  Globe,
  Database,
  Cpu,
  Layers,
  Wallet,
  Coins,
  Network,
  FileCode,
  Wrench,
  Sparkles,
  Brain,
  Languages,
} from "lucide-react"

const skillCategories = [
  {
    category: "Blockchain Platforms",
    icon: Blocks,
    skills: [
      { name: "Solana", icon: Coins },
      { name: "Ethereum", icon: Wallet },
      { name: "Bitcoin", icon: Coins },
      { name: "Aptos", icon: Network },
      { name: "Polkadot", icon: Network },
      { name: "Cosmos", icon: Network },
      { name: "Polygon", icon: Network },
      { name: "Ton", icon: Network },
      { name: "Tron", icon: Network },
      { name: "Sui", icon: Network },
    ],
  },
  {
    category: "Smart Contract Languages",
    icon: FileCode,
    skills: [
      { name: "Solidity", icon: Code2 },
      { name: "Rust", icon: Code2 },
      { name: "Move", icon: Code2 },
      { name: "FunC", icon: Code2 },
      { name: "Go", icon: Code2 },
    ],
  },
  {
    category: "Blockchain Tools",
    icon: Wrench,
    skills: [
      { name: "Anchor", icon: Wrench },
      { name: "Foundry", icon: Wrench },
      { name: "Hardhat", icon: Wrench },
      { name: "Wallet Standard", icon: Wallet },
    ],
  },
  {
    category: "Frontend Development",
    icon: Globe,
    skills: [
      { name: "React", icon: Code2 },
      { name: "Next.js", icon: Layers },
      { name: "TypeScript", icon: Code2 },
      { name: "Angular", icon: Code2 },
      { name: "React Native", icon: Code2 },
      { name: "Nuxt.js", icon: Layers },
      { name: "Three.js", icon: Sparkles },
      { name: "Tailwind CSS", icon: Sparkles },
    ],
  },
  {
    category: "Backend Development",
    icon: Server,
    skills: [
      { name: "Node.js", icon: Server },
      { name: "Express", icon: Server },
      { name: "Nest.js", icon: Server },
      { name: "Django", icon: Server },
      { name: "Laravel", icon: Server },
      { name: "FastAPI", icon: Server },
    ],
  },
  {
    category: "Databases",
    icon: Database,
    skills: [
      { name: "PostgreSQL", icon: Database },
      { name: "MongoDB", icon: Database },
      { name: "MySQL", icon: Database },
    ],
  },
  {
    category: "AI & Machine Learning",
    icon: Brain,
    skills: [
      { name: "OpenAI", icon: Brain },
      { name: "DeepSeek", icon: Brain },
      { name: "LangChain", icon: Brain },
      { name: "Hugging Face", icon: Brain },
      { name: "TensorFlow", icon: Cpu },
      { name: "PyTorch", icon: Cpu },
      { name: "Ollama", icon: Brain },
    ],
  },
  {
    category: "Programming Languages",
    icon: Code2,
    skills: [
      { name: "Python", icon: Code2 },
      { name: "JavaScript", icon: Code2 },
      { name: "TypeScript", icon: Code2 },
      { name: "C++", icon: Code2 },
      { name: "PHP", icon: Code2 },
      { name: "Ruby", icon: Code2 },
    ],
  },
  {
    category: "Languages",
    icon: Languages,
    skills: [
      { name: "Japanese (Native)", icon: Languages },
      { name: "English (Proficient)", icon: Languages },
    ],
  },
]

export function Skills() {
  return (
    <section id="skills" className="mb-20">
      <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Skills & Technologies
      </h3>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category) => {
          const CategoryIcon = category.icon
          return (
            <Card key={category.category} className="transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <CategoryIcon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {category.skills.map((skill) => {
                    const SkillIcon = skill.icon
                    return (
                      <div
                        key={skill.name}
                        className="flex items-center gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-accent"
                      >
                        <SkillIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{skill.name}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
