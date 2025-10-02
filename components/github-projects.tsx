"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Star, GitFork, Pin } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

interface GitHubRepo {
  id: number
  name: string
  description: string
  html_url: string
  homepage: string
  stargazers_count: number
  forks_count: number
  language: string
  topics: string[]
  updated_at: string
  pinned?: boolean
}

const GITHUB_USERNAME = "prince777-k"

const DEFAULT_PINNED = [
  "wallet-standard",
  "rustfs",
  "solana-defi",
  "portfolio",
  "blockchain-explorer",
  "defi-dashboard",
]

export function GithubProjects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [pinnedRepos, setPinnedRepos] = useState<string[]>(DEFAULT_PINNED)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchRepos()
  }, [])

  const fetchRepos = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`)
      if (!response.ok) throw new Error("Failed to fetch repositories")

      const data = await response.json()
      const reposWithPinned = data.map((repo: GitHubRepo) => ({
        ...repo,
        pinned: pinnedRepos.includes(repo.name),
      }))

      setRepos(reposWithPinned)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const togglePin = (repoName: string) => {
    setPinnedRepos((prev) => {
      if (prev.includes(repoName)) {
        return prev.filter((name) => name !== repoName)
      } else if (prev.length < 6) {
        return [...prev, repoName]
      } else {
        toast({
          title: "Pin Limit Reached",
          description: "You can only pin up to 6 projects. Unpin a project first to pin a new one.",
          variant: "destructive",
        })
        return prev
      }
    })

    setRepos((prev) =>
      prev.map((repo) =>
        (repo.name === repoName && pinnedRepos.length < 6) || pinnedRepos.includes(repoName)
          ? { ...repo, pinned: !repo.pinned }
          : repo,
      ),
    )
  }

  const pinnedRepositories = repos.filter((repo) => pinnedRepos.includes(repo.name))
  const otherRepositories = repos.filter((repo) => !pinnedRepos.includes(repo.name))

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-lg text-muted-foreground">Loading projects...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-lg text-destructive">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {pinnedRepositories.length > 0 && (
        <div>
          <div className="mb-6 flex items-center gap-2">
            <Pin className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold">Pinned Projects</h3>
            <Badge variant="secondary">{pinnedRepositories.length}/6</Badge>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pinnedRepositories.map((repo) => (
              <ProjectCard key={repo.id} repo={repo} onTogglePin={togglePin} isPinned={true} />
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="mb-6 text-xl font-semibold">All Projects</h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {otherRepositories.map((repo) => (
            <ProjectCard key={repo.id} repo={repo} onTogglePin={togglePin} isPinned={false} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectCard({
  repo,
  onTogglePin,
  isPinned,
}: {
  repo: GitHubRepo
  onTogglePin: (name: string) => void
  isPinned: boolean
}) {
  return (
    <Card className="group flex flex-col border-2 transition-all hover:border-primary hover:shadow-xl hover:shadow-primary/20">
      <CardHeader>
        <div className="mb-4 aspect-video w-full overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 to-accent/10">
          <Image
            src={`/.jpg?key=irz5u&height=200&width=400&query=${repo.name} ${repo.language} project screenshot`}
            alt={repo.name}
            width={400}
            height={200}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{repo.name}</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onTogglePin(repo.name)}
            className="h-8 w-8 flex-shrink-0"
            title={isPinned ? "Unpin project" : "Pin project"}
          >
            <Pin
              className={`h-4 w-4 transition-colors ${isPinned ? "fill-primary text-primary" : "text-muted-foreground"}`}
            />
          </Button>
        </div>
        <CardDescription className="line-clamp-2">{repo.description || "No description available"}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {repo.language && (
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {repo.language}
              </Badge>
            )}
            {repo.topics.slice(0, 3).map((topic) => (
              <Badge key={topic} variant="outline" className="border-accent/50 text-accent">
                {topic}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-accent" />
              <span>{repo.stargazers_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="h-4 w-4 text-secondary" />
              <span>{repo.forks_count}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </a>
        </Button>
        {repo.homepage && (
          <Button variant="default" size="sm" asChild className="flex-1 bg-primary">
            <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Site
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
