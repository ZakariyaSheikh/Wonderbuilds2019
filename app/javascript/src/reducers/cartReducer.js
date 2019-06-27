import constant from '../constants/cartConstants';


export default function (state = {}, action) {
  switch (action.type) {
    case constant.ADD:
      return {
        ...state,
        products: [
          ...state.products.slice(0, action.payload.index) || [],
          {
            product: state.products[action.payload.index].product,
            quantity: state.products[action.payload.index].quantity + action.payload.quantity,
          },
          ...state.products.slice(action.payload.index + 1) || [],
        ],
      };
    case constant.CREATE:
      return {
        ...state,
        products: [
          ...state.products || [],
          { product: action.payload.product, quantity: action.payload.quantity },
        ],
      };
    case constant.REMOVE:
      return {
        ...state,
        quantity: state.quantity - state.products[action.payload.index].quantity,
        total: state.total - state.products[action.payload.index].quantity,
        products: [
          ...state.products.slice(0, action.payload.index) || [],
          ...state.products.slice(action.payload.index + 1) || [],
        ],
      };
    case constant.CLEAN:
      return {
        ...state,
        quantity: 0,
        total: 0,
        products: [],
      };
    case constant.SET_QUANTITY:
      return {
        ...state,
        quantity: action.payload.quantity,
      };
    case constant.SET_TOTAL:
      return {
        ...state,
        total: action.payload.total,
      };
    case constant.INCREMENT:
      return {
        ...state,
        products: [
          ...state.products.slice(0, action.payload.index) || [],
          {
            product: state.products[action.payload.index].product,
            quantity: state.products[action.payload.index].quantity + 1,
          },
          ...state.products.slice(action.payload.index + 1) || [],
        ],
      };
    case constant.DECREMENT:
      return {
        ...state,
        products: [
          ...state.products.slice(0, action.payload.index) || [],
          {
            product: state.products[action.payload.index].product,
            quantity: state.products[action.payload.index].quantity - 1,
          },
          ...state.products.slice(action.payload.index + 1) || [],
        ],
      };
    default:
      return state;
  }
}
