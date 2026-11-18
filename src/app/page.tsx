export default function Home() {
  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-[1180px] flex-col px-6 sm:px-10">
      <header className="reveal flex items-center justify-between border-b border-line py-5">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 bg-ink" />
          <span className="text-[11px] tracking-[0.18em] text-ink">next-app</span>
        </div>
        <nav className="flex items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-muted">
          <a className="transition-colors hover:text-ink" href="https://nextjs.org/docs">
            docs
          </a>
          <a className="transition-colors hover:text-ink" href="https://github.com">
            github
          </a>
          <span className="hidden text-ink/30 sm:inline">v0.1</span>
        </nav>
      </header>

      <section className="relative flex flex-1 items-center">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full">
          <div className="dotgrid absolute right-0 top-10 hidden h-[calc(100%-5rem)] w-[38%] opacity-[0.55] [mask-image:radial-gradient(80%_70%_at_60%_40%,black,transparent)] lg:block" />
        </div>

        <div className="relative w-full py-16 lg:py-0">
          <div className="reveal flex items-center gap-3 text-[9px] uppercase tracking-[0.28em] text-muted">
            <span className="inline-block h-1 w-1 rounded-full bg-accent" />
            starter · empty by design
          </div>

          <h1
            className="reveal mt-6 max-w-[13ch] font-display text-[clamp(3.2rem,9vw,7.5rem)] leading-[0.92] tracking-[-0.02em]"
            style={{ animationDelay: "80ms" }}
          >
            A quiet place <span className="italic text-accent">to build.</span>
          </h1>

          <p
            className="reveal mt-7 max-w-[46ch] text-[13px] leading-[1.9] text-muted"
            style={{ animationDelay: "150ms" }}
          >
            Nothing here pretends to be a product. Edit{" "}
            <code className="border-b border-line pb-px text-ink">src/app/page.tsx</code>, or
            hand Codex a task and let it land the first real screen.
          </p>

          <div
            className="reveal mt-10 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "210ms" }}
          >
            <a
              href="https://nextjs.org/docs/app"
              className="group relative flex h-11 items-center gap-3 bg-ink px-5 text-[10px] uppercase tracking-[0.2em] text-paper transition-transform hover:-translate-y-px"
            >
              start building
              <span className="text-paper/40 transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="https://nextjs.org/docs"
              className="flex h-11 items-center border border-line px-5 text-[10px] uppercase tracking-[0.2em] text-ink/60 transition-colors hover:border-ink/30 hover:text-ink"
            >
              read the docs
            </a>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-10 right-0 hidden text-[9px] uppercase tracking-[0.3em] text-ink/25 lg:block">
          01 / home
        </div>
      </section>

      <footer className="flex items-center justify-between border-t border-line py-4 text-[9px] uppercase tracking-[0.2em] text-ink/35">
        <span>built with next.js</span>
        <span className="hidden sm:inline">app router · typescript · tailwind</span>
        <span>localhost:3000</span>
      </footer>
    </main>
  );
}
