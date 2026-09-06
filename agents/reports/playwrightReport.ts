/** Minimal reader for Playwright's `json` reporter output. */

import { readFileSync } from 'node:fs';

/** Where the Playwright `json` reporter writes, shared with `playwright.config.ts`. */
export function defaultReportPath(): string {
  return process.env['JSON_REPORT_FILE'] ?? 'test-results/report.json';
}

type JsonError = { message?: string; snippet?: string };
type JsonStdio = { text?: string };
type JsonResult = {
  status: string;
  duration?: number;
  retry?: number;
  error?: JsonError;
  stdout?: JsonStdio[];
};
type JsonSpec = {
  title: string;
  file?: string;
  line?: number;
  tags?: string[];
  tests: { results: JsonResult[] }[];
};
type JsonSuite = { specs?: JsonSpec[]; suites?: JsonSuite[] };

type JsonReport = { suites: JsonSuite[] };

// eslint-disable-next-line no-control-regex
const ANSI = /\x1B\[[0-9;]*m/g;

/** How many trailing log lines to keep: the ones closest to the failure. */
const LOG_TAIL = 15;

function clean(text: string | undefined): string {
  return (text ?? '').replace(ANSI, '').trim();
}

/** Renders the parts of a failure a diagnosis actually needs, and nothing else. */
function render(spec: JsonSpec, result: JsonResult): string {
  const parts = [
    `Test: ${spec.title}`,
    `Location: ${spec.file ?? 'unknown'}:${spec.line ?? 0}`,
    `Tags: ${spec.tags?.join(', ') || 'none'}`,
    `Duration: ${result.duration ?? 0}ms, retry ${result.retry ?? 0}`,
    ``,
    `Error:\n${clean(result.error?.message)}`,
    ``,
    `Snippet:\n${clean(result.error?.snippet)}`,
  ];

  const log = (result.stdout ?? [])
    .map((entry) => clean(entry.text))
    .filter((line) => line !== '')
    .slice(-LOG_TAIL);

  if (log.length > 0) {
    parts.push(``, `Test log (last ${log.length} lines):\n${log.join('\n')}`);
  }

  return parts.join('\n');
}

/** Returns the first failing test rendered as plain text, or `undefined` if everything passed. */
function findFirstFailure(suites: JsonSuite[]): string | undefined {
  // Suites nest arbitrarily deep. The queue grows while we walk it, so every
  // level is visited without recursion.
  const queue = [...suites];

  for (const suite of queue) {
    for (const spec of suite.specs ?? []) {
      const result = spec.tests.flatMap((test) => test.results).find((each) => each.error);
      if (result) return render(spec, result);
    }

    queue.push(...(suite.suites ?? []));
  }

  return undefined;
}

/** Reads the report from disk and renders its first failure. */
export function readFirstFailure(reportPath: string): string | undefined {
  const report = JSON.parse(readFileSync(reportPath, 'utf8')) as JsonReport;

  return findFirstFailure(report.suites);
}
