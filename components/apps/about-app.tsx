import { About } from "../about"

export function AboutApp() {
  return (
    <div className="h-full overflow-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">About Me</h1>
        <p className="mt-2 text-muted-foreground">Learn more about my background and education</p>
      </div>
      <About />
    </div>
  )
}
