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
      };
    }

    case Actions.ADD_CUSTOMER:{
      return {
        ...state,
        customersList: [...state.customersList, action.customer],
      }
    }

    case Actions.UPDATE_CUSTOMER:{
      return {
        ...state,
        customersList: [...state.customersList.filter(c => c.email != action.email), action.customer]
      }
    }

    case Actions.DELETE_CUSTOMER:{
      return {
        ...state,
        customersList: [...state.customersList.filter(c => c.email != action.email)]
      }
    }

    default:
      return state;
  }
}
