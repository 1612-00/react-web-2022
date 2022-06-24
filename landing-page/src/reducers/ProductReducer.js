import { GET_ALL_PRODUCT } from "../constants/ActionType";

export const ProductReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_ALL_PRODUCT:
            return {
                ...state,
                products: payload,
            };

        default:
            return state;
    }
};
