import { createSdkMcpServer } from '@anthropic-ai/claude-agent-sdk';
import { getFailure } from './getFailure';

export const TOOL_SERVER_NAME = 'playwright';

export const toolServer = createSdkMcpServer({ name: TOOL_SERVER_NAME, tools: [getFailure] });

/** Fully qualified names, the form the model and `allowedTools` expect. */
export const CUSTOM_TOOLS = [`mcp__${TOOL_SERVER_NAME}__get_failure`];

/** Built-in read-only tools, so nobody has to hand-write a file crawler. */
export const CODE_TOOLS = ['Read', 'Grep', 'Glob'];
