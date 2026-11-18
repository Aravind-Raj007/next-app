"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Deck from "@/components/Deck";
import Stage from "@/components/Stage";
import { PRESETS, type LogLine } from "@/lib/presets";

export default function Home() {
  const [activeId, setActiveId] = useState(PRESETS[0].id);
  const [prompt, setPrompt] = useState(PRESETS[0].prompt);
  const [lines, setLines] = useState<LogLine[]>([]);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [take, setTake] = useState(1);
  const [clock, setClock] = useState<string | null>(null);
  const [framed, setFramed] = useState(false);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const ticker = useRef<ReturnType<typeof setInterval> | null>(null);

  const preset = PRESETS.find((p) => p.id === activeId) ?? PRESETS[0];

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
    if (ticker.current) {
      clearInterval(ticker.current);
      ticker.current = null;
    }
  }, []);

  const run = useCallback(() => {
    if (running) return;
    clearTimers();
    setLines([]);
    setElapsed(0);
    setDone(false);
    setRunning(true);
    setTake((t) => t + 1);

    const startedAt = Date.now();
    ticker.current = setInterval(() => setElapsed(Date.now() - startedAt), 60);

    let at = 350;
    preset.lines.forEach((line) => {
      at += line.gap ?? 520 + Math.random() * 460;
      const delay = at;
      timers.current.push(
        setTimeout(() => {
          setLines((prev) => [...prev, line]);
        }, delay),
      );
    });

    timers.current.push(
      setTimeout(() => {
        clearTimers();
        setElapsed(Date.now() - startedAt);
        setRunning(false);
        setDone(true);
      }, at + 420),
    );
  }, [clearTimers, preset, running]);

  const stop = useCallback(() => {
    clearTimers();
    setRunning(false);
    setDone(false);
  }, [clearTimers]);

  const reset = useCallback(() => {
    clearTimers();
    setRunning(false);
    setDone(false);
    setElapsed(0);
    setLines([]);
  }, [clearTimers]);

  const select = useCallback(
    (id: string) => {
      const next = PRESETS.find((p) => p.id === id);
      if (!next) return;
      reset();
      setActiveId(id);
      setPrompt(next.prompt);
    },
    [reset],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        run();
      }
      if (e.key === "Escape") setFramed(false);
      if (e.key.toLowerCase() === "f" && !(e.target instanceof HTMLElement && e.target.closest("textarea"))) {
        setFramed((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [run]);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setClock(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  return (
    <main
      className={`relative z-10 mx-auto flex min-h-screen w-full flex-col ${
        framed ? "max-w-none px-2" : "max-w-[1440px] px-5 pb-0 pt-5 sm:px-8"
      }`}
    >
      {!framed && (
        <header className="flex items-center justify-between border-b border-line pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center border border-bone/50 bg-bone text-ink">
              <span className="font-display text-lg italic leading-none">C</span>
            </span>
            <div className="leading-tight">
              <p className="text-[11px] uppercase tracking-[0.34em] text-bone">codex reel studio</p>
              <p className="text-[9px] uppercase tracking-[0.24em] text-bone/30">
                record · cut · post
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[9px] uppercase tracking-[0.24em] text-bone/40 sm:gap-6">
            <span className="hidden items-center gap-2 sm:flex">
              <span className="inline-block h-1 w-1 rounded-full bg-[var(--good)]" />
              local mode
            </span>
            <span className="hidden sm:inline">take {String(take).padStart(2, "0")}</span>
            <span className="tabular-nums text-bone/70">{clock ?? "--:--:--"}</span>
            <button
              type="button"
              onClick={() => setFramed(true)}
              className="border border-line px-2 py-1 text-[8px] uppercase tracking-[0.18em] text-bone/50 transition-colors hover:border-bone/35 hover:text-bone"
            >
              frame
            </button>
            <span className="hidden border border-line px-2 py-1 text-[8px] tracking-[0.18em] text-bone/40 sm:inline">
              v0.1
            </span>
          </div>
        </header>
      )}

      <div
        className={
          framed
            ? "flex flex-1 items-center justify-center"
            : "flex flex-1 flex-col items-center gap-12 py-8 lg:flex-row lg:items-start lg:justify-center lg:gap-16 lg:py-12"
        }
      >
        <Stage
          preset={preset}
          lines={lines}
          running={running}
          done={done}
          elapsed={elapsed}
          take={take}
          framed={framed}
        />
        {!framed && (
          <Deck
            presets={PRESETS}
            activeId={activeId}
            onSelect={select}
            prompt={prompt}
            setPrompt={setPrompt}
            onRun={run}
            onStop={stop}
            onReset={reset}
            running={running}
            done={done}
            elapsed={elapsed}
            lineCount={lines.length}
            take={take}
          />
        )}
      </div>

      {framed && (
        <button
          type="button"
          onClick={() => setFramed(false)}
          className="fixed right-5 top-4 z-40 border border-line bg-ink/70 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-bone/45 backdrop-blur transition-colors hover:text-bone"
        >
          esc · exit frame
        </button>
      )}

      {!framed && (
        <div className="mt-auto overflow-hidden border-t border-line py-3">
          <div className="ticker-track flex w-max items-center gap-8 whitespace-nowrap text-[9px] uppercase tracking-[0.3em] text-bone/30">
            {Array.from({ length: 2 }).map((_, block) => (
              <span key={block} className="flex items-center gap-8">
                <span className="text-tally">● rec</span>
                <span>one task per reel</span>
                <span className="text-bone/15">/</span>
                <span>keep the frame clean</span>
                <span className="text-bone/15">/</span>
                <span>codex, not autocomplete</span>
                <span className="text-bone/15">/</span>
                <span>export 1080 × 1920</span>
                <span className="text-bone/15">/</span>
                <span>write it like a shot list</span>
                <span className="text-bone/15">/</span>
                <span>roll · watch · cut</span>
                <span className="text-bone/15">/</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
