import { tool } from '@anthropic-ai/claude-agent-sdk';
import { z } from 'zod';
import { defaultReportPath, readFirstFailure } from '../../reports/playwrightReport';

/** Hands out the failing test from the Playwright JSON report. */
export const getFailure = tool(
  'get_failure',
  'Returns the first failing test of the Playwright JSON report: error, snippet and test log.',
  {
    reportPath: z
      .string()
      .optional()
      .describe('Path to the Playwright JSON report. Omit to use the configured default.'),
  },
  ({ reportPath }) => {
    const failure =
      readFirstFailure(reportPath ?? defaultReportPath()) ?? 'No failing test in the report.';

    return Promise.resolve({ content: [{ type: 'text' as const, text: failure }] });
  },
);
