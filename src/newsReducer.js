export const initialState = {
  count: 0,
};

function newsReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_COUNT':
      return Object.assign({}, state, {
        count: action.payload.count,
      });
    default:
      return state;
  }
}

export default newsReducer;
