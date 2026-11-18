export type LogKind = "sys" | "out" | "edit" | "cmd" | "ok" | "warn" | "prompt";

export type LogLine = {
  kind: LogKind;
  text: string;
  gap?: number;
};

export type Preset = {
  id: string;
  title: string;
  tag: string;
  runtime: string;
  prompt: string;
  lines: LogLine[];
};

export const PRESETS: Preset[] = [
  {
    id: "hero",
    title: "Build the landing hero",
    tag: "FIGMA → CODE",
    runtime: "0:38",
    prompt:
      "Build a landing hero for a developer tool: masked gradient headline, pointer parallax, and a CTA that opens a command palette. Keep it under 40kb of JS.",
    lines: [
      { kind: "sys", text: "codex › landing hero with masked gradient + CTA" },
      { kind: "out", text: "▸ scanning workspace · 84 files · 3 ignored" },
      { kind: "out", text: "▸ reading src/app/page.tsx, src/app/globals.css" },
      { kind: "edit", text: "✎ src/components/Hero.tsx          +126  −0" },
      { kind: "edit", text: "✎ src/app/page.tsx                 +8  −72" },
      { kind: "out", text: "· building gradient mask with CSS @property" },
      { kind: "out", text: "· parallax throttled to rAF, reduced-motion guarded" },
      { kind: "cmd", text: "$ npm run build" },
      { kind: "ok", text: "✓ compiled in 1.4s · 0 errors · 0 warnings" },
      { kind: "out", text: "· contrast check: 7.1:1 on headline, 4.8:1 on body" },
      { kind: "ok", text: "✓ done in 38s · 2 files changed · +134 −72" },
      { kind: "out", text: "→ preview ready on localhost:3000" },
    ],
  },
  {
    id: "debug",
    title: "Fix the flaky checkout test",
    tag: "DEBUG",
    runtime: "1:04",
    prompt:
      "Checkout e2e test fails 1 in 5 runs. Find the race, fix it without loosening the assertion, and show me the diff.",
    lines: [
      { kind: "sys", text: "codex › flaky checkout test · reproduce first" },
      { kind: "out", text: "▸ running e2e ×12 with seeded clock" },
      { kind: "warn", text: "⚠ 2/12 failed · checkout.spec.ts:64 · element not stable" },
      { kind: "out", text: "▸ reading tests/e2e/checkout.spec.ts" },
      { kind: "out", text: "· waiting on animation frame instead of network idle" },
      { kind: "out", text: "· root cause: optimistic total re-renders after debounce" },
      { kind: "edit", text: "✎ src/components/CartTotals.tsx     +6  −2" },
      { kind: "edit", text: "✎ tests/e2e/checkout.spec.ts       +1  −1" },
      { kind: "cmd", text: "$ npx playwright test checkout --repeat-each=12" },
      { kind: "ok", text: "✓ 12 passed · 0 flaky · 7.9s" },
      { kind: "ok", text: "✓ done in 64s · assertion untouched" },
    ],
  },
  {
    id: "refactor",
    title: "Move the API to server actions",
    tag: "REFACTOR",
    runtime: "1:22",
    prompt:
      "Replace the REST handlers with server actions, keep the response shapes identical, and delete the fetch layer once nothing references it.",
    lines: [
      { kind: "sys", text: "codex › api routes → server actions" },
      { kind: "out", text: "▸ mapping 9 handlers · 14 call sites" },
      { kind: "edit", text: "✎ src/app/actions/invoice.ts       +148  −0" },
      { kind: "edit", text: "✎ src/app/api/invoices/route.ts    +0  −212" },
      { kind: "out", text: "· preserving shape: InvoiceDTO unchanged" },
      { kind: "out", text: "· revalidating tags on write" },
      { kind: "warn", text: "⚠ 3 imports of lib/fetch-invoices remain" },
      { kind: "edit", text: "✎ src/components/InvoiceTable.tsx  +9  −11" },
      { kind: "edit", text: "✎ lib/fetch-invoices.ts            +0  −96  (deleted)" },
      { kind: "cmd", text: "$ npx tsc --noEmit && npm run test" },
      { kind: "ok", text: "✓ 48 tests passed · 0 errors" },
      { kind: "ok", text: "✓ done in 82s · −319 lines net" },
    ],
  },
  {
    id: "dark",
    title: "Ship a proper dark mode",
    tag: "UI PASS",
    runtime: "1:11",
    prompt:
      "Add a real dark mode: system default, manual override, no flash of wrong theme, and every surface tokenized. No hardcoded hex in components.",
    lines: [
      { kind: "sys", text: "codex › dark mode with zero flash" },
      { kind: "out", text: "▸ auditing 61 colour literals across 18 files" },
      { kind: "edit", text: "✎ src/app/globals.css             +64  −22" },
      { kind: "edit", text: "✎ src/components/ThemeToggle.tsx   +41  −0" },
      { kind: "out", text: "· theme resolved before paint via blocking script" },
      { kind: "out", text: "· 0 hardcoded hex left in components/" },
      { kind: "cmd", text: "$ npm run build" },
      { kind: "ok", text: "✓ compiled in 1.6s · 0 errors" },
      { kind: "ok", text: "✓ done in 71s · 18 files touched" },
    ],
  },
  {
    id: "docs",
    title: "Write the README people read",
    tag: "DOCS",
    runtime: "0:52",
    prompt:
      "Rewrite the README: one-line promise, 30-second quickstart, architecture sketch, and the three failure modes people actually hit.",
    lines: [
      { kind: "sys", text: "codex › README that earns a star" },
      { kind: "out", text: "▸ reading package.json, .env.example, deploy docs" },
      { kind: "out", text: "· extracting real commands, not guesses" },
      { kind: "edit", text: "✎ README.md                       +96  −14" },
      { kind: "out", text: "· quickstart verified from a clean clone" },
      { kind: "warn", text: "⚠ .env.example lists 4 vars, code reads 6" },
      { kind: "edit", text: "✎ .env.example                     +2  −0" },
      { kind: "ok", text: "✓ done in 52s · links checked · 0 broken" },
    ],
  },
];
