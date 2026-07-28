import { BasePage } from './Base.page';
import { parseNumber } from '../../utils/number';
import { Logger } from '../../utils/Logger';

export class CalculatorPage extends BasePage {
    private get numberOfInstancesInput() {
        return $('div.QiFlid input[type = "number"]')
    }

    private get totalUsageLimit(){
        return $('div.KDALvb input[type = "number"]');
    }

    constructor() {
        super('/products/calculator');
    }

    async setNumberOfInstances(value: number){
        Logger.info('Setting number of instances to %d', value);
        await this.numberOfInstancesInput.setValue(value);
    }

    async getTotalUsageLimit(): Promise<number>{
        const rawValue = await this.totalUsageLimit.getValue();
        Logger.info('Read total usage limit: %s', rawValue);
        return parseNumber(rawValue, 'Total usage limit');
    }
}