import { query } from '@anthropic-ai/claude-agent-sdk';
import { MODEL, type AgentRun, type AgentStep } from '../shared/agent';
import { SUBAGENTS } from './subagents/subagents';
import { CODE_TOOLS, CUSTOM_TOOLS, toolServer, TOOL_SERVER_NAME } from './tools/tools';

export const orchestrator = {
  name: 'orchestrator',
  title: 'Playwright failure investigation (orchestrator and subagents)',
};

const ROSTER = Object.entries(SUBAGENTS)
  .map(([name, agent]) => `- ${name}: ${agent.description}`)
  .join('\n');

const PROMPT = [
  'You orchestrate an investigation of one failed Playwright test.',
  'You have no tools of your own: every piece of work goes to a subagent through the Task tool.',
  'Subagents do not talk to each other, so pass on whatever the next one needs.',
  '',
  'Subagents:',
  ROSTER,
  '',
  'Decide yourself which subagents to use and in what order, and stop as soon as you can answer.',
  'Finish with the root cause and the fix, in at most ten lines.',
].join('\n');

/** Runs the orchestrator loop and returns every step it and its subagents took. */
export async function runOrchestrator(): Promise<AgentRun> {
  const stream = query({
    prompt: 'Investigate the failing Playwright test and report the root cause and the fix.',
    options: {
      model: MODEL,
      systemPrompt: PROMPT,
      agents: SUBAGENTS,
      mcpServers: { [TOOL_SERVER_NAME]: toolServer },
      allowedTools: ['Task', ...CUSTOM_TOOLS, ...CODE_TOOLS],
      permissionMode: 'bypassPermissions',
      settingSources: [],
    },
  });

  const steps: AgentStep[] = [];
  let totals: AgentRun['totals'];
  let costUsd: number | undefined;

  for await (const message of stream) {
    if (message.type === 'assistant') {
      const title = message.subagent_type ?? 'orchestrator';
      const answer = message.message.content
        .map((block) => (block.type === 'text' ? block.text : ''))
        .join('')
        .trim();

      if (answer !== '') {
        steps.push({
          title,
          answer,
          inputTokens: message.message.usage.input_tokens,
          outputTokens: message.message.usage.output_tokens,
        });

        console.log(`--- ${title} ---\n${answer}\n`);
      }
    }

    // `modelUsage` is the only field that also covers the subagents' calls.
    if (message.type === 'result') {
      costUsd = message.total_cost_usd;
      totals = Object.values(message.modelUsage).reduce(
        (sum, usage) => ({
          inputTokens: sum.inputTokens + usage.inputTokens + usage.cacheReadInputTokens,
          outputTokens: sum.outputTokens + usage.outputTokens,
        }),
        { inputTokens: 0, outputTokens: 0 },
      );
    }
  }

  return { steps, totals, costUsd };
}
