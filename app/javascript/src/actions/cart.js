import cartConstants from '../constants/cartConstants';


const add = (state, products) => (dispatch) => {
  const { product, number } = state;

  const index = products && products.findIndex(obj => obj.product.id === product.id);

  if (index !== undefined && index >= 0) {
    dispatch({
      type: cartConstants.ADD,
      payload: { quantity: number, index },
    });
  } else {
    dispatch({
      type: cartConstants.CREATE,
      payload: { product, quantity: number },
    });
  }
};

const addProduct = (product, number, products) => (dispatch) => {
  const index = products && products.findIndex(obj => obj.product.id === product.id);


  if ( index !== undefined && index >= 0) {
    dispatch({
      type: cartConstants.ADD,
      payload: { quantity: number, index },
    });
  } else {
    dispatch({
      type: cartConstants.CREATE,
      payload: { product, quantity: number },
    });
  }
};

const remove = index => (dispatch) => {
  dispatch({
    type: cartConstants.REMOVE,
    payload: { index },
  });
};

const cleanCart = () => (dispatch) => {
  dispatch({
    type: cartConstants.CLEAN,
  });
};

const setQuantity = (products, allQuantity = 0) => (dispatch) => {
  products && products.forEach(obj => allQuantity += obj.quantity);

  dispatch({
    type: cartConstants.SET_QUANTITY,
    payload: { quantity: allQuantity },
  });
};

const setTotal = products => (dispatch) => {
  let total = 0;
  products && products.forEach(obj => total += (obj.quantity * obj.product.price));

  dispatch({
    type: cartConstants.SET_TOTAL,
    payload: { total },
  });
};

const increment = index => (dispatch) => {
  dispatch({
    type: cartConstants.INCREMENT,
    payload: { index },
  });
};

const decrement = index => (dispatch) => {
  dispatch({
    type: cartConstants.DECREMENT,
    payload: { index },
  });
};

export default {
  add,
  remove,
  addProduct,
  setQuantity,
  setTotal,
  increment,
  decrement,
  cleanCart,
};
