import {
    ADD_PRODUCT_TO_CART,
    CHANGE_AMOUNT_OF_PRODUCT,
    LOAD_CART,
    REMOVE_PRODUCT
} from "../constants/ActionType";

export const CartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOAD_CART:
            return {
                ...state,
                products: payload
            };

        case ADD_PRODUCT_TO_CART:
            const newProducts1 = [...state.products, payload];
            storeCartToLocalStorage(newProducts1);

            return {
                ...state,
                products: newProducts1
            };

        case REMOVE_PRODUCT:
            const newProducts2 = state.products.filter(
                (item, index) => index !== payload
            );
            storeCartToLocalStorage(newProducts2);

            return {
                ...state,
                products: newProducts2
            };

        case CHANGE_AMOUNT_OF_PRODUCT:
            const newProducts3 = state.products.map((item, index) =>
                index === payload.index ? payload.newProduct : item
            );
            storeCartToLocalStorage(newProducts3);

            return {
                ...state,
                products: newProducts3
            };

        default:
            return state;
    }
};

const storeCartToLocalStorage = (products) => {
    let arrProduct = [];
    products.forEach((element) => {
        arrProduct.push(element);
    });
    localStorage.setItem("cart", JSON.stringify(arrProduct));
};
