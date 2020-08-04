import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'inventory'
})
export class InventoryPipe implements PipeTransform {
    transform( value: any, args?: any ){
        let inventoryArray: Number[]= [];

        for(let i = 1; i < value + 1; i++){
          inventoryArray.push(i);
        }

        return inventoryArray;
    }
}