import 'dotenv/config';
import { defaultReportPath, readFirstFailure } from '../reports/playwrightReport';
import { failurePreamble, generateReport } from '../reports/reportGenerator';
import { testFailureAnalyzerAgent } from './testFailureAnalyzerAgent';

/** Entry point. Run: npm run agent:chain [path-to-playwright-json-report] */
const reportPath = process.argv[2] ?? defaultReportPath();
const failure = readFirstFailure(reportPath) ?? 'No failing test.';

testFailureAnalyzerAgent
  .run(failure)
  .then((run) => {
    const path = generateReport(
      testFailureAnalyzerAgent,
      run,
      failurePreamble(reportPath, failure),
    );

    console.log(`Report written to ${path}`);
  })
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  });
