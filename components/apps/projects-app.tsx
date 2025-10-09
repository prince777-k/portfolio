import { GithubProjects } from "../github-projects"

export function ProjectsApp() {
  return (
    <div className="h-full overflow-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="mt-2 text-muted-foreground">Explore my GitHub repositories and pinned projects</p>
      </div>
      <GithubProjects />
    </div>
  )
}
