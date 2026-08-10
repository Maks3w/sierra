"use client"

import { useEffect, useRef } from "react"

interface XTimelineProps {
  username: string
  theme?: "light" | "dark"
  dnt?: boolean
  height?: number
}

export default function XTimeline({ username, theme = "dark", dnt = true, height = 600 }: XTimelineProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const tryLoad = () => {
      if ((window as any).twttr?.widgets && containerRef.current) {
        ;(window as any).twttr.widgets.load(containerRef.current)
      }
    }

    const ensureScript = () => {
      const existing = document.querySelector<HTMLScriptElement>("script[src='https://platform.x.com/widgets.js']")
      if (existing) return existing
      const s = document.createElement("script")
      s.src = "https://platform.x.com/widgets.js"
      s.async = true
      s.defer = true
      s.onload = tryLoad
      document.body.appendChild(s)
      return s
    }

    ensureScript()

    const retries = 5
    let attempts = 0
    const interval = setInterval(() => {
      attempts += 1
      tryLoad()
      if (attempts >= retries) clearInterval(interval)
    }, 800)

    return () => {
      clearInterval(interval)
    }
  }, [username])

  return (
    <div ref={containerRef} className="w-full">
      <a
        className="twitter-timeline"
        data-dnt={dnt ? "true" : "false"}
        data-theme={theme}
        data-height={String(height)}
        href={`https://x.com/${username}`}
      >
        Tweets de {username}
      </a>
      <div className="min-h-75" />
    </div>
  )
}
