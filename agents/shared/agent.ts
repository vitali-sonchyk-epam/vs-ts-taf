import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';

/** Shared client and model for every agent. */
export const MODEL = 'claude-sonnet-4-5';

export const client = new Anthropic();

/** Joins the text blocks of a response, ignoring `thinking` and `tool_use` blocks. */
export function textOf(content: Anthropic.ContentBlock[]): string {
  return content
    .map((block) => (block.type === 'text' ? block.text : ''))
    .join('')
    .trim();
}

/** One recorded model call, rendered as a section of the final report. */
export type AgentStep = {
  title: string;
  answer: string;
  inputTokens: number;
  outputTokens: number;
};

/** What an agent produces: every step it took, plus the totals if it knows them. */
export type AgentRun = {
  steps: AgentStep[];
  /** Totals across every model call, subagents included. Summed from the steps when absent. */
  totals?: { inputTokens: number; outputTokens: number };
  costUsd?: number;
};
