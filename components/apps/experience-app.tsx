import { Experience } from "../experience"

export function ExperienceApp() {
  return (
    <div className="h-full overflow-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Experience</h1>
        <p className="mt-2 text-muted-foreground">My professional journey in blockchain and full-stack development</p>
      </div>
      <Experience />
    </div>
  )
}
