import * as customerRed from './customer.reducer';
import {ActionReducerMap} from "@ngrx/store";

export interface AppState{

  customers: customerRed.State;
}

export const appReducer: ActionReducerMap<AppState> = {

  // @ts-ignore
  customers: customerRed.customerReducer
}
