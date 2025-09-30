import { Sidebar } from "@/components/sidebar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Achievements } from "@/components/achievements"
import { Skills } from "@/components/skills"
import { Education } from "@/components/education"

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-80">
        <div className="mx-auto max-w-5xl px-6 py-12 lg:px-12 lg:py-20">
          <Hero />
          <About />
          <Achievements />
          <Experience />
          <Skills />
          <Education />
        </div>
      </main>
    </div>
  )
}
