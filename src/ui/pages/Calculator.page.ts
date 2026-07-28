import { BasePage } from './Base.page';
import { parseNumber } from '../../utils/number';

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
        await this.numberOfInstancesInput.setValue(value);
    }

    async getTotalUsageLimit(): Promise<number>{
        const rawValue = await this.totalUsageLimit.getValue();
        return parseNumber(rawValue, 'Total usage limit');
    }
}