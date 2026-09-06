import type { AgentDefinition } from '@anthropic-ai/claude-agent-sdk';
import { CUSTOM_TOOLS } from '../tools/tools';

/** Fetches the raw failure, and nothing more. */
export const collector: AgentDefinition = {
  description: 'Fetches the failing Playwright test from the report.',
  tools: CUSTOM_TOOLS,
  prompt:
    'Call get_failure and return the failure verbatim: test name, location, error, snippet and log. Do not analyse it.',
};
