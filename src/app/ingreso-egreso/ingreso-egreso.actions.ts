import { User } from './../auth/user.model';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import { Action } from '@ngrx/store';

export const SET_ITEMS = '[Ingreso Egreso] Set items';
export const UNSET_ITEMS = '[Ingreso Egreso] Unset items';

export class SetItemsActions implements Action {
    readonly type = SET_ITEMS;

    constructor( public items: IngresoEgresoModel[]) {}
}

export class UnsetItemsActions implements Action {
    readonly type = UNSET_ITEMS;
}

export type acciones = SetItemsActions | 
                        UnsetItemsActions;