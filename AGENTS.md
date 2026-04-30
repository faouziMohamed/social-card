<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read
the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Project structure

| Path                      | What it is                                                                                          |
|---------------------------|-----------------------------------------------------------------------------------------------------|
| `src/app/`                | App Router entry points and global UI shell: `layout.tsx`, `page.tsx`, `globals.css`, `favicon.ico` |
| `src/app/api/`            | API route handlers                                                                                  |
| `src/proxy.ts`            | Request-path header shim that sets `x-current-path`                                                 |
| `src/lib/env.ts`          | Environment validation with `@t3-oss/env-nextjs`                                                    |
| `src/lib/logger/`         | Server logger, client logger, and client-log server action forwarding                               |
| `src/lib/utils/routes.ts` | `ROUTES` (raw paths) — always use these, never hardcode paths                                       |
| `src/modules/`            | Feature modules; each follows `client/` · `server/` · `server-actions/` · `shared/` layout          |
| `src/components/ui/`      | shadcn/ui component library — add/modify components here                                            |
| `src/components/shared/`  | Cross-module reusable React components                                                              |
| `src/config/`             | Axios client (`axios.config.ts`) and server (`axios-server.config.ts`) instance factories           |
| `public/`                 | Static assets used by the app                                                                       |
| `ops/scripts/`            | Repo automation scripts, including `bootstrap.sh`                                                   |
| `package.json`            | Project scripts and dependency manifest                                                             |
| `next.config.ts`          | Next.js config; currently only `reactCompiler: true`                                                |
| `eslint.config.mts`       | Flat ESLint config for Next.js, TypeScript, and repo rules                                          |
| `Makefile`                | Convenience targets like `help` and `bootstrap`                                                     |

- Use the App Router files in `src/app/`: `layout.tsx` owns the root `Metadata`
  and `next/font/google` setup, and `page.tsx` is the current landing page.
- The request-path header shim lives in `src/proxy.ts` (not `middleware.ts`); it
  sets `x-current-path` and excludes `/api`, `/_next/static`, `/_next/image`,
  and `favicon.ico`.
- Environment variables are validated in `src/lib/env.ts` with
  `@t3-oss/env-nextjs`; keep server-only values separate from `NEXT_PUBLIC_*`
  values. Required env vars: `NEXTAUTH_SECRET`, `NEXTAUTH_URL`,
  `NEXT_PUBLIC_API_BASE_URL`. Copy `.env.example` → `.env` to get started.
- Logging is split between `src/lib/logger/logger.ts` for server code and
  `src/lib/logger/client-logger.ts` for client code; do not import the server
  logger into client components.
- Use the repo scripts from `package.json`: `npm run dev`, `npm run build`,
  `npm run start`, `npm run lint`, `npm run lint:fix`, and `npm run format`.
  `make bootstrap` runs `ops/scripts/bootstrap.sh`.
- `next.config.ts` currently only enables `reactCompiler: true`; keep that in
  mind when editing Next config.

## Module Architecture

All feature code lives in `src/modules/<domain>/` with a strict four-layer
split:

| Sub-folder        | Runs in | Contents                                                                |
|-------------------|---------|-------------------------------------------------------------------------|
| `client/`         | Browser | React Query hooks (`use-*.queries.ts`), client components, client repos |
| `server/`         | Server  | Server-side API repositories (`*-api.repository.ts`, `backend-client`)  |
| `server-actions/` | Server  | Next.js Server Actions (`*-mutations.action.ts`)                        |
| `shared/`         | Both    | Types, pure utilities, constants — no runtime imports from either side  |

Current domains: 


**Naming conventions:**

- React Query hooks: `use-<resource>[-<verb>].queries.ts` (e.g.
  `use-study-mutations.queries.ts`)
- Server actions: `<resource>-mutations.action.ts`
- Server-side API repos: `<resource>-api.repository.ts`
- Type files: `<domain>.types.ts`
- Tests: co-located as `<file>.test.ts` alongside the source file

**HTTP layer:**

- Client components call the Axios client from
  `src/modules/http/client/api-client.repository.ts` 
- Server code uses `src/modules/http/server/backend-client.ts` 
- Never import `api-client.repository.ts` in server code or
  `backend-client.ts` in client components.

## Code Organization Rule (Non-Negotiable)

**Exported declarations must be placed at the TOP of files whenever possible.**

When reading a file, developers should see the actual exported code first, not
scroll to the bottom. Place exported functions, classes, types, and constants at
the top of the file. Dependencies and helper functions that cannot be hoisted
should be placed below.

**Good:**

```typescript
export function MainFeature() {
  return helperFunction();
}

function helperFunction() {
  // ...
}
```

**Bad:**

```typescript
function helperFunction() {
  // ...
}

export function MainFeature() {
  return helperFunction();
}
```

**Exception:** Some things cannot be hoisted due to initialization order (e.g.,
classes that extend other classes, functions that use variables). That's
acceptable. The rule is: **place exports as high as possible in the file**.

## Non-Negotiable Rules for Development

### 1. Plan Before Coding

Describe your approach and wait for approval before writing code. This ensures
alignment and prevents rework.

### 2. Clarify Ambiguity

Ask before writing code when requirements are unclear. Don't assume or guess
implementation details.

### 3. No `router.refresh()` in Client Components

Use optimistic updates combined with `invalidateQueries` to keep the UI in sync.
`router.refresh()` causes unnecessary server round-trips and defeats optimistic
updates. Let React Query handle state synchronization instead.

### 4. Never Spread DTOs into RHF `defaultValues`

Explicitly map DTO fields to React Hook Form `defaultValues`. This prevents
unexpected field bindings and ensures type safety.

**Good:**

```typescript
const {control} = useForm({
  defaultValues: {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  },
});
```

**Bad:**

```typescript
const {control} = useForm({
  defaultValues: {...user}, // spreading DTO directly
});
```

### 5. Never Use HTML Modals/Dialogs/Alerts

Always use shadcn/ui components (`AlertDialog`, `Dialog`, `Sheet`, etc.) for
modals, dialogs, alerts, confirmations, and prompts. Native HTML APIs (
`window.alert`, `window.confirm`, `window.prompt`, `<dialog>`) are forbidden
unless absolutely necessary.

**Good:**

```typescript jsx
<AlertDialog>
  <AlertDialogTrigger>Delete</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
    <AlertDialogAction>Delete</AlertDialogAction>
  </AlertDialogContent>
</AlertDialog>
```

**Bad:**

```typescript
if (window.confirm('Delete?')) {
  // ...
}
```

### 6. Never Run Git Write Operations Without Explicit Instruction

Do **not** run `git add`, `git commit`, `git stash`, `git push`, `git reset`,
or any other git write operation unless the user explicitly asks you to commit
or save to git. This includes partial commits, "quick saves", or staging
files as part of a task. Read-only git commands (`git log`, `git diff`,
`git status`) are fine at any time.

### 7. Announce Skills Before Using Them on Long-Running Tasks

Before invoking any skill for a long-running or multi-step task, explicitly
tell the user which skill you are about to use and why. Do not silently invoke
skills. This allows the user to intervene before a skill takes over.

**Good:**
> "I'm going to use the `writing-plans` skill to turn the approved spec into
> a detailed implementation plan."

**Bad:** Invoking a skill without any prior announcement.

This rule applies to: `writing-plans`, `executing-plans`, `subagent-driven-development`,
`dispatching-parallel-agents`, `test-driven-development`, and any other skill that
drives implementation work.


### 8. Skip Heavy Plan Docs — Code Directly

Do **not** write full implementation code inside markdown plan files. Plans
should be brief outlines (approach + file list), then code immediately.
Put details in code comments, not in plan files. Writing code twice
(once in a plan, once in the codebase) wastes tokens and introduces drift.

**Good:** Brief plan outline → code with inline comments
**Bad:** Full code blocks in a `.md` plan file → copy-paste into source

### 9. Never Use Edge Runtime

Do **not** add `export const runtime = 'edge'` to any route. Use the default
Node.js runtime. Edge strips Node.js APIs (`Buffer`, `fs`, crypto, etc.) which
breaks image processing, font loading, and any server utility. The performance
gains are marginal and the compatibility cost is high.

<!-- END:nextjs-agent-rules -->
