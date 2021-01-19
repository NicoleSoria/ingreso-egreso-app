import { IngresoEgresoModel } from './ingreso-egreso.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordenarPipe'
})
export class OrdenarPipe implements PipeTransform {

  transform( items: IngresoEgresoModel[] ): IngresoEgresoModel[] {
    console.log(items)
    if(items.length > 0){
      return items.sort( (a, b) => {

        if( a.tipo == 'ingreso'){
          return -1
        }
        else {
          return 1
        }
      });
    }
  
  }

}
