
import { ActionReducerMap } from '@ngrx/store';
import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducers';
import * as fromIE from './ingreso-egreso/ingreso-egreso.reducer';


export interface AppState {
    ui: fromUI.State;
    auth: fromAuth.AuthState;
    //ingresoEgreso: fromIE.IngresoEgresoState;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUI.uiReducer,
    auth: fromAuth.AuthReducer,
    //ingresoEgreso: fromIE.ingresoEgresoReducer
};