import type { AgentDefinition } from '@anthropic-ai/claude-agent-sdk';
import { analyzer } from './analyzer';
import { codeInvestigator } from './codeInvestigator';
import { collector } from './collector';

/** The subagents the orchestrator may delegate to, each with the smallest tool set it needs. */
export const SUBAGENTS: Record<string, AgentDefinition> = {
  collector,
  analyzer,
  code_investigator: codeInvestigator,
};
