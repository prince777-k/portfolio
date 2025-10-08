import { GithubProjects } from "@/components/github-projects"

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12 lg:py-20">
      <div className="mb-12">
        <h2 className="text-4xl font-bold tracking-tight">Projects</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Explore my open-source projects and contributions on GitHub. Pin your favorite projects to showcase them.
        </p>
      </div>
      <GithubProjects />
    </div>
  )
}
