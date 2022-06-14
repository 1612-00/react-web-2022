import {
    ADD_PRODUCT,
    DELETE_PRODUCT,
    UPDATE_PRODUCT,
    GET_ALL_PRODUCT,
    SET_PRODUCT_FOCUS,
} from './../contexts/constant';
export const productReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, payload],
            };

        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter((note) => note.id !== payload),
            };

        case UPDATE_PRODUCT:
            const newProducts = state.products.map((note) =>
                note.id === payload.id ? payload : note
            );
            return {
                ...state,
                products: newProducts,
            };

        case GET_ALL_PRODUCT:
            return {
                ...state,
                products: payload,
            };

        case SET_PRODUCT_FOCUS:
            return {
                ...state,
                productFocus: payload,
            };

        default:
            return state;
    }
};
