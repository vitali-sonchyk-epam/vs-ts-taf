import type { AgentDefinition } from '@anthropic-ai/claude-agent-sdk';

/** Reasons about the failure it is handed. No tools: it may not invent file contents. */
export const analyzer: AgentDefinition = {
  description: 'Names the single root cause of a failure it is given.',
  tools: [],
  prompt:
    'You get the text of a failed test. Name the single most likely root cause in a few sentences, ' +
    'say whether the test or the application is wrong, and state what evidence is still missing.',
};
