import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { MODEL, type AgentRun } from '../shared/agent';

/** Whatever the report is about: the file name prefix and the heading. */
type ReportSubject = { name: string; title: string };

/** USD per million tokens for `MODEL`, used when the agent reports no cost of its own. */
const PRICE_PER_MTOK = { input: 3, output: 15 };

/** Where the agents write their Markdown reports. */
function reportDir(): string {
  return process.env['AGENT_REPORT_DIR'] ?? 'agent-reports';
}

function timestamp(): string {
  return new Date().toISOString().replace(/[-:]/g, '').replace(/\..+/, '').replace('T', '-');
}

/** Per-step token counts plus the total, and what it cost. */
function usageSummary(run: AgentRun): string[] {
  const totals = run.totals ?? {
    inputTokens: run.steps.reduce((sum, step) => sum + step.inputTokens, 0),
    outputTokens: run.steps.reduce((sum, step) => sum + step.outputTokens, 0),
  };

  const estimate =
    (totals.inputTokens * PRICE_PER_MTOK.input + totals.outputTokens * PRICE_PER_MTOK.output) /
    1_000_000;
  const cost = run.costUsd ?? estimate;
  const label = run.costUsd === undefined ? 'estimated' : 'reported';

  return [
    ``,
    `## Usage`,
    ``,
    `| Step | Input tokens | Output tokens |`,
    `| --- | ---: | ---: |`,
    ...run.steps.map((step) => `| ${step.title} | ${step.inputTokens} | ${step.outputTokens} |`),
    `| **Total** | **${totals.inputTokens}** | **${totals.outputTokens}** |`,
    ``,
    `Cost: **$${cost.toFixed(4)}** (${label}).`,
  ];
}

function toMarkdown(subject: ReportSubject, run: AgentRun, preamble: string): string {
  const lines = [
    `# ${subject.title}`,
    ``,
    `- Model: \`${MODEL}\``,
    `- Generated: ${new Date().toISOString()}`,
    preamble,
  ];

  for (const step of run.steps) {
    lines.push(``, `## ${step.title}`, ``, step.answer);
  }

  lines.push(...usageSummary(run));

  return `${lines.join('\n')}\n`;
}

/** The shared header: where the failure came from and what it looked like. */
export function failurePreamble(reportPath: string, failure: string): string {
  return [
    '',
    `- Source report: \`${reportPath}\``,
    '',
    '## Raw failure',
    '',
    '```text',
    failure,
    '```',
  ].join('\n');
}

/** Renders the run as Markdown, writes it to the configured folder and returns the path. */
export function generateReport(subject: ReportSubject, run: AgentRun, preamble = ''): string {
  const dir = reportDir();
  mkdirSync(dir, { recursive: true });

  const path = join(dir, `${subject.name}-${timestamp()}.md`);
  writeFileSync(path, toMarkdown(subject, run, preamble), 'utf8');

  return path;
}
