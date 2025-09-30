import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"

export function Education() {
  return (
    <section id="education" className="mb-20">
      <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Education</h3>
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl">Bachelor of Science in Computer Science</CardTitle>
              <CardDescription className="mt-1 text-base">University of Aizu, Aizuwakamatsu</CardDescription>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">2019</p>
              <p className="text-sm text-muted-foreground">Fukushima, Japan</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Specialized in computer science with a focus on software engineering and distributed systems, laying the
            foundation for blockchain and full-stack development expertise.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
