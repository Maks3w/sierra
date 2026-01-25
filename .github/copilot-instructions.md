# GitHub Copilot Instructions for Navacerrada Project

## Project Context
This is a Next.js 16 application built with React 19, TypeScript, and Bun. The app uses the App Router and Tailwind CSS 4 for styling.

## Technology Preferences

### Runtime & Package Manager
- Always use `bun` commands instead of npm/yarn/pnpm
- Scripts: `bun run dev`, `bun run build`, `bun run test`
- Installing packages: `bun add <package>` or `bun add -d <package>`

### React & Next.js
- **Default to Server Components** - Only add `"use client"` when necessary (state, effects, browser APIs, event handlers)
- Use Next.js 16 App Router patterns
- Leverage React 19 features (use hook, Server Actions, etc.)
- Import from `@/` alias for src directory imports

### TypeScript
- Use strict mode (already enabled)
- Prefer `interface` for object shapes in public APIs
- Use `type` for unions, intersections, and mapped types
- Don't use `any` - use `unknown` if type is truly unknown

### Styling
- Use Tailwind CSS 4 utility classes
- Mobile-first responsive design
- Use CSS variables from Tailwind config when needed

## Code Patterns

### Component Structure
```typescript
// Server Component (default)
import { ComponentProps } from '@/types'

export default async function ServerComponent({ prop }: ComponentProps) {
  const data = await fetchData()
  return <div>{data}</div>
}

// Client Component (when needed)
'use client'

import { useState } from 'react'
import { ComponentProps } from '@/types'

export function ClientComponent({ prop }: ComponentProps) {
  const [state, setState] = useState(null)
  return <div onClick={() => setState(prop)}>{state}</div>
}
```

### Async Server Components
```typescript
// Fetch data directly in Server Components
export default async function Page({ params }: { params: { id: string } }) {
  const data = await fetch(`/api/data/${params.id}`)
  const json = await data.json()
  return <div>{json.title}</div>
}
```

### API Routes (Route Handlers)
```typescript
// app/api/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const data = await fetchData()
  return NextResponse.json(data)
}
```

### Error Handling
```typescript
// error.tsx in app directory
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

### Loading States
```typescript
// loading.tsx in app directory
export default function Loading() {
  return <div>Loading...</div>
}
```

## Testing Patterns

### Component Tests with Vitest
```typescript
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import Component from './Component'

test('renders component', () => {
  render(<Component />)
  expect(screen.getByRole('button')).toBeDefined()
})
```

## Common Tasks

### Adding a New Page
1. Create folder in `src/app/[route-name]/`
2. Add `page.tsx` (Server Component by default)
3. Optional: Add `layout.tsx`, `loading.tsx`, `error.tsx`

### Adding a New Component
1. Create in `src/components/[ComponentName].tsx`
2. Export as default or named export
3. Add types in same file or adjacent `.types.ts`
4. Mark as Client Component only if needed

### Environment Variables
- Use `NEXT_PUBLIC_` prefix for client-accessible vars
- Access server-only vars with `process.env.VAR_NAME`
- Define types in `next-env.d.ts` or custom `.d.ts` file

### Image Optimization
```typescript
import Image from 'next/image'

<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority // for above-fold images
/>
```

## Avoid These Patterns
- ❌ Don't use `"use client"` unless necessary
- ❌ Don't use npm/yarn commands (use bun)
- ❌ Don't import from `"react-dom/client"` directly in App Router
- ❌ Don't use Pages Router patterns (getServerSideProps, getStaticProps)
- ❌ Don't use `any` type
- ❌ Don't forget to handle loading and error states

## Helpful Reminders
- Server Components can be async functions
- Client Components cannot be async
- You can import Server Components into Client Components as children
- Use metadata API for SEO instead of Head component
- Leverage Turbopack in dev mode (already configured)
