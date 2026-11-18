"use client";

import type { Preset } from "@/lib/presets";

type Props = {
  presets: Preset[];
  activeId: string;
  onSelect: (id: string) => void;
  prompt: string;
  setPrompt: (value: string) => void;
  onRun: () => void;
  onStop: () => void;
  onReset: () => void;
  running: boolean;
  done: boolean;
  elapsed: number;
  lineCount: number;
  take: number;
};

export default function Deck({
  presets,
  activeId,
  onSelect,
  prompt,
  setPrompt,
  onRun,
  onStop,
  onReset,
  running,
  done,
  elapsed,
  lineCount,
  take,
}: Props) {
  const active = presets.find((p) => p.id === activeId);

  return (
    <section className="flex w-full max-w-xl flex-col">
      <div className="reveal">
        <div className="flex items-baseline justify-between border-b border-line pb-4">
          <h1 className="font-display text-5xl leading-none tracking-tight sm:text-6xl">
            Take <span className="italic text-tally">deck</span>
          </h1>
          <span className="text-[10px] uppercase tracking-[0.3em] text-dim">
            task library / {String(presets.length).padStart(2, "0")}
          </span>
        </div>
        <p className="mt-4 max-w-md text-[12px] leading-relaxed text-dim">
          Pick a task, roll the take, record the stage. The agent transcript is
          scripted beat-for-beat so every reel cuts clean.
        </p>
      </div>

      <div className="reveal mt-7" style={{ animationDelay: "90ms" }}>
        <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.28em] text-bone/35">
          <span>01 — choose the bit</span>
          <span>{presets.length} cuts</span>
        </div>
        <ul className="mt-2 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {presets.map((preset, i) => {
            const isActive = preset.id === activeId;
            return (
              <li key={preset.id}>
                <button
                  type="button"
                  onClick={() => onSelect(preset.id)}
                  className={`group relative flex w-full items-center gap-4 px-1 py-3 text-left transition-colors ${
                    isActive ? "bg-bone/[0.04]" : "hover:bg-bone/[0.025]"
                  }`}
                >
                  <span
                    className={`absolute inset-y-0 left-0 w-px transition-colors ${
                      isActive ? "bg-tally" : "bg-transparent group-hover:bg-bone/20"
                    }`}
                  />
                  <span
                    className={`w-6 text-[10px] tabular-nums transition-colors ${
                      isActive ? "text-tally" : "text-bone/25"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block truncate text-[13px] transition-colors ${
                        isActive ? "text-bone" : "text-bone/75 group-hover:text-bone"
                      }`}
                    >
                      {preset.title}
                    </span>
                    <span className="mt-0.5 block text-[9px] uppercase tracking-[0.22em] text-bone/30">
                      {preset.tag}
                    </span>
                  </span>
                  <span className="shrink-0 text-[10px] tabular-nums text-bone/30">
                    {preset.runtime}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="reveal mt-7" style={{ animationDelay: "160ms" }}>
        <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.28em] text-bone/35">
          <label htmlFor="prompt">02 — write the task</label>
          <span className="tabular-nums">{prompt.length} chars</span>
        </div>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          spellCheck={false}
          className="mt-2 w-full resize-none border border-line bg-ink-2/60 px-3 py-3 text-[12px] leading-relaxed text-bone/90 outline-none transition-colors placeholder:text-bone/25 focus:border-bone/35"
          placeholder="Tell Codex what to build…"
        />
      </div>

      <div className="reveal mt-6 flex flex-wrap items-center gap-3" style={{ animationDelay: "220ms" }}>
        {running ? (
          <button
            type="button"
            onClick={onStop}
            className="group relative flex h-12 flex-1 items-center justify-between overflow-hidden border border-tally px-5 text-[11px] uppercase tracking-[0.22em] text-tally transition-colors hover:bg-tally hover:text-ink"
          >
            <span className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 bg-tally group-hover:bg-ink" />
              stop take
            </span>
            <span className="tabular-nums">{Math.floor(elapsed / 1000)}s</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onRun}
            className="sheen group relative flex h-12 flex-1 items-center justify-between overflow-hidden bg-bone px-5 text-[11px] uppercase tracking-[0.22em] text-ink transition-transform hover:-translate-y-px active:translate-y-0"
          >
            <span className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 bg-ink" />
              {done ? "roll again" : "roll take"}
            </span>
            <span className="tabular-nums opacity-60">⌘↵</span>
          </button>
        )}
        <button
          type="button"
          onClick={onReset}
          className="h-12 border border-line px-5 text-[11px] uppercase tracking-[0.22em] text-bone/55 transition-colors hover:border-bone/30 hover:text-bone"
        >
          reset
        </button>
      </div>

      <dl className="reveal mt-7 grid grid-cols-4 gap-px border border-line bg-[var(--line)]" style={{ animationDelay: "280ms" }}>
        {[
          { label: "take", value: String(take).padStart(2, "0") },
          { label: "duration", value: `${(elapsed / 1000).toFixed(1)}s` },
          { label: "lines", value: `${lineCount}/${active?.lines.length ?? 0}` },
          {
            label: "status",
            value: running ? "rolling" : done ? "cut ready" : "standby",
            accent: running ? "text-tally" : done ? "text-[var(--good)]" : "text-bone/40",
          },
        ].map((stat) => (
          <div key={stat.label} className="bg-ink px-3 py-3">
            <dt className="text-[8.5px] uppercase tracking-[0.24em] text-bone/30">{stat.label}</dt>
            <dd className={`mt-1 text-[12px] tabular-nums ${stat.accent ?? "text-bone/85"}`}>
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="reveal mt-5 text-[9.5px] uppercase tracking-[0.2em] text-bone/25" style={{ animationDelay: "340ms" }}>
        ⌘↵ roll · space-safe layout · export 1080×1920
      </p>
    </section>
  );
}
