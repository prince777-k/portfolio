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
  Zap,
  Shield,
  Box,
  Hexagon,
  CircleDot,
  Workflow,
  Hammer,
  Wind,
  Flame,
  Binary,
  Braces,
  FileJson,
  Terminal,
  Package,
  Cog,
  Atom,
  Component,
} from "lucide-react"

const skillCategories = [
  {
    category: "Blockchain Platforms",
    icon: Blocks,
    gradient: "from-purple-500 to-pink-500",
    skills: [
      { name: "Solana", icon: Zap },
      { name: "Ethereum", icon: Hexagon },
      { name: "Bitcoin", icon: Coins },
      { name: "Aptos", icon: CircleDot },
      { name: "Polkadot", icon: Network },
      { name: "Cosmos", icon: Atom },
      { name: "Polygon", icon: Hexagon },
      { name: "Ton", icon: Box },
      { name: "Tron", icon: Network },
      { name: "Sui", icon: CircleDot },
    ],
  },
  {
    category: "Smart Contract Languages",
    icon: FileCode,
    gradient: "from-blue-500 to-cyan-500",
    skills: [
      { name: "Solidity", icon: FileJson },
      { name: "Rust", icon: Cog },
      { name: "Move", icon: Workflow },
      { name: "FunC", icon: Braces },
      { name: "Go", icon: Binary },
    ],
  },
  {
    category: "Blockchain Tools",
    icon: Wrench,
    gradient: "from-orange-500 to-red-500",
    skills: [
      { name: "Anchor", icon: Hammer },
      { name: "Foundry", icon: Flame },
      { name: "Hardhat", icon: Shield },
      { name: "Wallet Standard", icon: Wallet },
    ],
  },
  {
    category: "Frontend Development",
    icon: Globe,
    gradient: "from-green-500 to-emerald-500",
    skills: [
      { name: "React", icon: Component },
      { name: "Next.js", icon: Layers },
      { name: "TypeScript", icon: FileCode },
      { name: "Angular", icon: Code2 },
      { name: "React Native", icon: Component },
      { name: "Nuxt.js", icon: Layers },
      { name: "Three.js", icon: Box },
      { name: "Tailwind CSS", icon: Wind },
    ],
  },
  {
    category: "Backend Development",
    icon: Server,
    gradient: "from-indigo-500 to-purple-500",
    skills: [
      { name: "Node.js", icon: Hexagon },
      { name: "Express", icon: Server },
      { name: "Nest.js", icon: Package },
      { name: "Django", icon: Server },
      { name: "Laravel", icon: Server },
      { name: "FastAPI", icon: Zap },
    ],
  },
  {
    category: "Databases",
    icon: Database,
    gradient: "from-teal-500 to-cyan-500",
    skills: [
      { name: "PostgreSQL", icon: Database },
      { name: "MongoDB", icon: Database },
      { name: "MySQL", icon: Database },
    ],
  },
  {
    category: "AI & Machine Learning",
    icon: Brain,
    gradient: "from-pink-500 to-rose-500",
    skills: [
      { name: "OpenAI", icon: Brain },
      { name: "DeepSeek", icon: Brain },
      { name: "LangChain", icon: Workflow },
      { name: "Hugging Face", icon: Sparkles },
      { name: "TensorFlow", icon: Cpu },
      { name: "PyTorch", icon: Flame },
      { name: "Ollama", icon: Brain },
    ],
  },
  {
    category: "Programming Languages",
    icon: Code2,
    gradient: "from-yellow-500 to-orange-500",
    skills: [
      { name: "Python", icon: Terminal },
      { name: "JavaScript", icon: FileJson },
      { name: "TypeScript", icon: FileCode },
      { name: "C++", icon: Binary },
      { name: "PHP", icon: Code2 },
      { name: "Ruby", icon: Code2 },
    ],
  },
  {
    category: "Languages",
    icon: Languages,
    gradient: "from-violet-500 to-purple-500",
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
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
        {skillCategories.map((category) => {
          const CategoryIcon = category.icon
          return (
            <Card
              key={category.category}
              className="group relative overflow-hidden border-2 transition-all hover:border-primary/50 hover:shadow-xl"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 transition-opacity group-hover:opacity-5`}
              />

              <CardHeader className="relative">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${category.gradient} shadow-lg sm:h-12 sm:w-12`}
                  >
                    <CategoryIcon className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                  </div>
                  <CardTitle className="text-base font-bold sm:text-lg">{category.category}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="grid gap-2">
                  {category.skills.map((skill) => {
                    const SkillIcon = skill.icon
                    return (
                      <div
                        key={skill.name}
                        className="group/skill flex items-center gap-2 rounded-lg border bg-card/50 p-2.5 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-accent hover:shadow-md sm:gap-3 sm:p-3"
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 transition-colors group-hover/skill:bg-primary/20 sm:h-8 sm:w-8">
                          <SkillIcon className="h-3.5 w-3.5 text-primary transition-transform group-hover/skill:scale-110 sm:h-4 sm:w-4" />
                        </div>
                        <span className="text-xs font-medium sm:text-sm">{skill.name}</span>
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
