import 'dotenv/config';
import { defaultReportPath, readFirstFailure } from '../reports/playwrightReport';
import { failurePreamble, generateReport } from '../reports/reportGenerator';
import { orchestrator, runOrchestrator } from './orchestratorAgent';

const reportPath = defaultReportPath();
const preamble = failurePreamble(reportPath, readFirstFailure(reportPath) ?? 'No failing test.');

/** Entry point. Run: npm run agent:orchestrator */
runOrchestrator()
  .then((run) => {
    console.log(`Report written to ${generateReport(orchestrator, run, preamble)}`);
  })
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  });
