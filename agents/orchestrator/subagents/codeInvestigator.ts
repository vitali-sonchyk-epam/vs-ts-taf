import type { AgentDefinition } from '@anthropic-ai/claude-agent-sdk';
import { CODE_TOOLS } from '../tools/tools';

/** Confirms or rejects a hypothesis against the actual code. */
export const codeInvestigator: AgentDefinition = {
  description: 'Reads the test and application code to confirm or reject a root cause.',
  tools: CODE_TOOLS,
  prompt:
    'You get a root cause hypothesis. Read the relevant files, quote the lines that matter and ' +
    'report whether they confirm or reject the hypothesis, plus the concrete fix.',
};
