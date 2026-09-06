import { readFile } from 'node:fs/promises';
import CSVFileValidator, { RowError, ValidatorConfig } from 'csv-file-validator';
import { Logger } from './Logger';

export interface CostReportRow {
  serviceDisplayName: string;
  name: string;
  quantity: string;
  region: string;
  serviceId: string;
  sku: string;
  totalPrice: string;
  notes: string;
}

const costReportConfig: ValidatorConfig = {
  headers: [
    { name: 'service_display_name', inputName: 'serviceDisplayName' },
    { name: 'name', inputName: 'name' },
    { name: 'quantity', inputName: 'quantity' },
    { name: 'region', inputName: 'region' },
    { name: 'service_id', inputName: 'serviceId' },
    { name: 'sku', inputName: 'sku' },
    { name: 'total_price, USD', inputName: 'totalPrice' },
    { name: 'notes', inputName: 'notes' },
  ],
};

export class CostReportReader {
  private parsedRows: CostReportRow[] = [];
  private errors: RowError[] = [];

  constructor(public readonly filePath: string) {}

  static async read(filePath: string): Promise<CostReportReader> {
    return (await new CostReportReader(filePath).read()).validate();
  }

  async read(): Promise<this> {
    Logger.info('Reading cost report: %s', this.filePath);

    const content = await readFile(this.filePath, 'utf-8');
    const result = await CSVFileValidator<CostReportRow>(content, costReportConfig);

    this.parsedRows = result.data;
    this.errors = result.inValidData;
    Logger.info('Read %s rows from cost report', this.parsedRows.length);

    return this;
  }

  get totalPrice(): string {
    return this.parsedRows.find((row) => row.sku === 'Total Price:')?.totalPrice ?? '';
  }

  get vmRows(): CostReportRow[] {
    return this.parsedRows.filter((row) => row.name.includes('running in'));
  }

  get isValid(): boolean {
    return this.errors.length === 0;
  }

  get coreRow(): CostReportRow {
    const coreRow = this.vmRows.find((row) => row.name.includes('Core'));
    if (!coreRow) throw new Error(`No Core line item found in report: ${this.filePath}`);
    return coreRow;
  }

  validate(): this {
    if (!this.isValid) {
      const messages = this.errors.map((error) => error.message).join('\n');
      throw new Error(`Cost report is not valid: ${messages}`);
    }
    return this;
  }
}
