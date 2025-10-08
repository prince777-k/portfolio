import { About } from "@/components/about"

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:px-12 lg:py-20">
      <div className="mb-12">
        <h2 className="text-4xl font-bold tracking-tight">About Me</h2>
        <p className="mt-4 text-lg text-muted-foreground">Learn more about my background, experience, and education.</p>
      </div>
      <About />
    </div>
  )
}
