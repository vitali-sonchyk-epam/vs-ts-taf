import type Anthropic from '@anthropic-ai/sdk';
import { MODEL, client, textOf, type AgentRun, type AgentStep } from '../shared/agent';

/**
 * Chain prompting: one failing test is walked through three model calls.
 * The conversation accumulates, so every step sees the raw failure and all
 * earlier answers. The API itself is stateless -- the history is ours.
 *
 *   raw failure  ->  summarise  ->  diagnose  ->  advise
 */

const MAX_TOKENS = 500;

const PROMPTS = [
  {
    title: 'Summary',
    system:
      'You analyse Playwright test failures. Answer only the question asked, in the requested length.',
    instruction:
      'In two sentences: which action failed, and which error type was raised? Do not give advice.',
  },
  {
    title: 'Root cause',
    system:
      'You analyse Playwright test failures. Weigh both possibilities: the application is broken, or the test itself is outdated.',
    instruction:
      'Name the single most probable root cause in one short paragraph. Say explicitly whether the application or the test is wrong. Do not list next steps.',
  },
  {
    title: 'Next steps',
    system: 'You advise QA engineers. Be concrete and reference the code under test.',
    instruction: 'Give exactly three numbered next steps, one line each.',
  },
] as const;

export const testFailureAnalyzerAgent = {
  name: 'test-failure-analyzer',
  title: 'Test failure analysis (chain)',

  async run(failure: string): Promise<AgentRun> {
    // The growing conversation: each call resends everything said so far.
    const messages: Anthropic.MessageParam[] = [{ role: 'user', content: failure }];
    const steps: AgentStep[] = [];

    for (const prompt of PROMPTS) {
      messages.push({ role: 'user', content: prompt.instruction });

      const response = await client.messages.create({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: prompt.system,
        messages,
      });

      const answer = textOf(response.content);
      messages.push({ role: 'assistant', content: answer });

      steps.push({
        title: prompt.title,
        answer,
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens,
      });

      console.log(`--- ${prompt.title} ---\n${answer}\n`);
    }

    return { steps };
  },
};
