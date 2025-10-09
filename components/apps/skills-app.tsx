import { Skills } from "../skills"

export function SkillsApp() {
  return (
    <div className="h-full overflow-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Skills & Technologies</h1>
        <p className="mt-2 text-muted-foreground">
          My technical expertise across blockchain, full-stack development, and AI
        </p>
      </div>
      <Skills />
    </div>
  )
}
