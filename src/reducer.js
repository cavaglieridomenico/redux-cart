import { GET_TOTALS, CLEAR_CART, TOGGLE_AMOUNT, REMOVE } from "./actions";

const reducer = (state, action) => {
  const { type, payload } = action;
  if (type === GET_TOTALS) {
    let { total, amount } = state.cart.reduce(
      (acc, item) => {
        const { price, amount } = item;
        const itemTotal = price * amount;
        acc.total += itemTotal;
        acc.amount += amount;
        return acc;
      },
      { total: 0, amount: 0 }
    );
    total = parseFloat(total.toFixed(2));
    return {
      ...state,
      total,
      amount,
    };
  }
  if (type === CLEAR_CART) {
    return {
      ...state,
      cart: [],
    };
  }
  if (type === REMOVE) {
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== payload.id),
    };
  }
  if (type === TOGGLE_AMOUNT) {
    return {
      ...state,
      cart: state.cart.map((item) => {
        if (item.id === payload.id) {
          if (payload.toggle === "inc") {
            item = { ...item, amount: item.amount + 1 };
          }
          if (payload.toggle === "dec") {
            item = { ...item, amount: item.amount - 1 };
          }
        }
        return item;
      }),
    };
  }
  return state;
};

export default reducer;
