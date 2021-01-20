
import { AppState } from 'src/app/app.reducer';
import { IngresoEgresoModel } from './ingreso-egreso.model';

import * as fromIE from './ingreso-egreso.actions';

export interface IngresoEgresoState {
    items: IngresoEgresoModel[];
}

export interface AppStateExtends extends AppState {
    ingresoEgreso: IngresoEgresoState;
}

const estadoInicial: IngresoEgresoState = {
    items: []
}

export function ingresoEgresoReducer(state = estadoInicial, action: fromIE.acciones): IngresoEgresoState {

    switch( action.type ){

        case fromIE.SET_ITEMS:
            return {
                items: [
                    ...action.items.map( item => {
                        return {
                            ...item
                        };
                    })
                ]
            };

        case fromIE.UNSET_ITEMS:
            return {
                items: []
            };

        default:
            return state;
    }
}

