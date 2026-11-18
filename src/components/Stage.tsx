"use client";

import { useEffect, useRef } from "react";
import type { LogLine, Preset } from "@/lib/presets";

const KIND_STYLE: Record<LogLine["kind"], string> = {
  sys: "text-bone",
  out: "text-dim",
  edit: "text-[var(--amber)]",
  cmd: "text-bone/90",
  ok: "text-[var(--good)]",
  warn: "text-tally",
  prompt: "text-bone",
};

function timecode(ms: number) {
  const totalFrames = Math.floor((ms / 1000) * 24);
  const ff = totalFrames % 24;
  const totalSeconds = Math.floor(totalFrames / 24);
  const ss = totalSeconds % 60;
  const mm = Math.floor(totalSeconds / 60) % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(mm)}:${pad(ss)}:${pad(ff)}`;
}

type Props = {
  preset: Preset;
  lines: LogLine[];
  running: boolean;
  done: boolean;
  elapsed: number;
  take: number;
  framed?: boolean;
};

export default function Stage({
  preset,
  lines,
  running,
  done,
  elapsed,
  take,
  framed = false,
}: Props) {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const progress = Math.min(100, Math.round((lines.length / preset.lines.length) * 100));
  const status = running ? "ROLLING" : done ? "CUT READY" : "STANDBY";

  return (
    <section className={`flex flex-col items-center gap-3 ${framed ? "py-4" : ""}`}>
      <div
        className={`flex w-full items-center justify-between px-1 text-[10px] uppercase tracking-[0.28em] ${
          framed ? "text-bone/0" : "text-dim"
        }`}
      >
        <span className="flex items-center gap-2">
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full ${
              running ? "bg-tally tally-live" : done ? "bg-[var(--good)]" : "bg-faint"
            }`}
          />
          stage · 9:16
        </span>
        <span className="tabular-nums">{status}</span>
      </div>

      <div
        className={`relative aspect-[9/16] max-w-full border border-line bg-ink-2 ${
          framed ? "h-[88vh] max-h-[1000px]" : "h-[min(74vh,720px)]"
        }`}
      >
        <span className="pointer-events-none absolute -left-px -top-px z-30 h-4 w-4 border-l border-t border-bone/60" />
        <span className="pointer-events-none absolute -right-px -top-px z-30 h-4 w-4 border-r border-t border-bone/60" />
        <span className="pointer-events-none absolute -bottom-px -left-px z-30 h-4 w-4 border-b border-l border-bone/60" />
        <span className="pointer-events-none absolute -bottom-px -right-px z-30 h-4 w-4 border-b border-r border-bone/60" />

        <div className="scanlines pointer-events-none absolute inset-0 z-10 opacity-40" />
        <div className="vignette pointer-events-none absolute inset-0 z-10" />

        <div className="pointer-events-none absolute left-2 top-1/2 z-20 -translate-y-1/2 [writing-mode:vertical-rl] text-[9px] uppercase tracking-[0.42em] text-bone/25">
          reel {String(take).padStart(3, "0")} — codex
        </div>

        <div className="relative z-20 flex h-full flex-col px-5 py-4">
          <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.22em]">
            <span className="flex items-center gap-1.5 text-tally">
              <span
                className={`inline-block h-1.5 w-1.5 rounded-full bg-tally ${
                  running ? "tally-live" : ""
                }`}
              />
              {running ? "rec" : done ? "saved" : "armed"}
            </span>
            <span className="tabular-nums text-bone/50">{timecode(elapsed)}</span>
          </div>

          <div className="relative mt-4 flex min-h-0 flex-1 flex-col border border-line bg-ink/85 backdrop-blur-[2px]">
            <div className="flex items-center justify-between border-b border-line px-3 py-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full border border-bone/25" />
                <span className="h-2 w-2 rounded-full border border-bone/25" />
                <span className="h-2 w-2 rounded-full border border-bone/25" />
                <span className="ml-2 text-[9px] uppercase tracking-[0.2em] text-dim">
                  codex — zsh
                </span>
              </div>
              <span className="border border-line px-1.5 py-0.5 text-[8px] uppercase tracking-[0.16em] text-bone/45">
                gpt-5-codex
              </span>
            </div>

            <div
              ref={bodyRef}
              className="min-h-0 flex-1 overflow-y-auto px-3 py-3 text-[10.5px] leading-[1.8] sm:text-[11px]"
            >
              <div className="flex min-h-full flex-col justify-end">
              {lines.length === 0 ? (
                <div className="flex flex-1 flex-col gap-4">
                  <div className="flex items-center justify-between text-[8.5px] uppercase tracking-[0.22em] text-bone/30">
                    <span>brief</span>
                    <span className="tabular-nums">{preset.runtime} target</span>
                  </div>
                  <p className="text-[13px] leading-[1.65] text-bone/80">{preset.prompt}</p>
                  <div className="mt-auto space-y-1 text-[10px] text-bone/30">
                    <p>
                      <span className="text-tally">›</span> waiting for a task
                    </p>
                    <p>· pick one on the deck, or write your own</p>
                    <p>· hit roll to run the take</p>
                    <p className="pt-2 text-bone/20">local · sandbox · no network</p>
                  </div>
                </div>
              ) : (
                lines.map((line, i) => (
                  <div key={i} className="line-in flex gap-2">
                    <span className="w-4 shrink-0 select-none text-right text-bone/20 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`whitespace-pre-wrap break-words ${KIND_STYLE[line.kind]}`}>
                      {line.text}
                    </span>
                  </div>
                ))
              )}
              {running ? (
                <div className="mt-1.5 flex gap-2">
                  <span className="w-4 shrink-0 text-right text-bone/20 tabular-nums">
                    {String(lines.length + 1).padStart(2, "0")}
                  </span>
                  <span className="text-tally">
                    ›<span className="caret ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-tally" />
                  </span>
                </div>
              ) : null}
              </div>
            </div>

            <div className="border-t border-line px-3 py-2 text-[9px] text-bone/35">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate">
                  <span className="text-tally">›</span> {preset.prompt.slice(0, 42)}…
                </span>
                <span className="shrink-0 tabular-nums">{progress}%</span>
              </div>
              <div className="mt-1.5 h-px w-full bg-bone/10">
                <div
                  className="h-px bg-tally transition-[width] duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-[8.5px] uppercase tracking-[0.18em] text-bone/35">
            <span className="truncate">{preset.tag.toLowerCase()}</span>
            <span>take {String(take).padStart(2, "0")}</span>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-between px-1 text-[9px] uppercase tracking-[0.2em] text-bone/25">
        <span>1080 × 1920</span>
        <span>safe area 90%</span>
      </div>
    </section>
  );
}
