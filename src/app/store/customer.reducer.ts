import {Customer} from "../home/customer/models/customer-model";
import * as Actions from './customer.action';

export interface State{
  customersList: Customer[];
}

const initialState: State = {
  customersList: []
}

export function customerReducer(
  state: State = initialState,
  action: Actions.CustomerListAction
): State {
  switch (action.type){
    case Actions.GET_CUSTOMERS:{
      return {
        ...state,
        customersList: action.customers,
        //actiune: "get customers",
      };
    }

    case Actions.ADD_CUSTOMER:{
      return {
        ...state,
        customersList: [...state.customersList, action.customer],
        //actiune: 'add customer'
      }
    }
    default:
      return state;
  }
}
