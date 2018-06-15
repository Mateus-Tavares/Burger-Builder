import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const boughtBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.BOUGHT_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const boughtBurgerFailed = (error) => {
  return {
    type: actionTypes.BOUGHT_BURGER_FAILED,
    error: error
  };
};

export const boughtBurgerStart = () => {
  return {
    type: actionTypes.BOUGHT_BURGER_START
  };
};

export const boughtBurger = (orderData, token) => {
  return dispatch => {
    dispatch(boughtBurgerStart());
    axios.post(`/orders.json?auth=${token}`, orderData)
      .then(reponse => {
        dispatch(boughtBurgerSuccess(reponse.data.name, orderData));
      })
      .catch(error => {
        dispatch(boughtBurgerFailed(error));
      });
  };
};

export const boughtInit = () => {
  return {
    type: actionTypes.BOUGHT_INIT
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    axios.get(`/orders.json${queryParams}`)
      .then(res => {
        const fetchedOrders = [];
        for(let key in res.data){
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(error => {
        dispatch(fetchOrdersFail(error));
      });
  }
}