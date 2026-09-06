import path from 'path';
import 'dotenv/config';
import { BaseCalculatorPage } from '../../ui/pages/base/BaseCalculator.page';
import { BaseCalculationModel } from '../models/BaseCalculationModel';
import { parseNumber } from '../../utils/number';
import { Logger } from '../../utils/Logger';
import { Random } from '../../utils/randomGenerator';
import { CostReportReader } from '../../utils/costReportReader';

export abstract class BaseCalculationSteps<
  TModel extends BaseCalculationModel,
  TPage extends BaseCalculatorPage,
> {
  protected constructor(protected readonly page: TPage) {}

  abstract fillForm(model: TModel): Promise<void>;

  getTitle(): Promise<string> {
    return this.page.pageHeader.getTitle();
  }

  async setNumberOfInstances(value: number): Promise<void> {
    Logger.info('Setting number of instances to %s', value);
    await this.page.numberOfInstancesInput.setValue(value.toString());
  }

  async getComputedCost(): Promise<string> {
    Logger.info('Getting computed cost');
    return this.page.costDetailsPanel.getComputeValue();
  }

  async downloadReport(fileName: string = Random.string()): Promise<CostReportReader> {
    Logger.info('Downloading document');
    const download = await this.page.downloadReport();
    const targetName = `${fileName}${path.extname(download.suggestedFilename())}`;
    const targetPath = path.resolve(process.env.DOWNLOAD_PATH!, targetName);
    Logger.info(`Saving document to path: ${targetPath}`);
    await download.saveAs(targetPath);
    return CostReportReader.read(targetPath);
  }

  protected async readTotalUsageLimit(): Promise<number> {
    const rawValue = await this.page.totalUsageLimitInput.getValue();
    Logger.info('Read total usage limit: %s', rawValue);
    return parseNumber(rawValue);
  }
}
