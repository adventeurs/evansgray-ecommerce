import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dollars'
})
export class DollarsPipe implements PipeTransform {
    transform( value: any, args?: any ){
        let price = Math.round( value / 100 ).toFixed(0)
        return ` $${ price } `
    }
}