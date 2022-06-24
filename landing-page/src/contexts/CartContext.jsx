import { createContext, useEffect, useReducer } from "react";
import {
    ADD_PRODUCT_TO_CART,
    CHANGE_AMOUNT_OF_PRODUCT,
    REMOVE_PRODUCT
} from "../constants/ActionType";
import { CartReducer } from "../reducers/CartReducer";

const initialState = {
    products:
        localStorage.getItem("cart") === null
            ? []
            : JSON.parse(localStorage.getItem("cart"))
};

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
    const [cartState, dispatch] = useReducer(CartReducer, initialState);

    // Add a product to cart
    const addProduct = (product) => {
        try {
            // First, check product exists
            const index = cartState.products.findIndex(
                (element) =>
                    element.id === product.id && element.size === product.size
            );
            // if yes
            if (index === -1) {
                dispatch({ type: ADD_PRODUCT_TO_CART, payload: product });
            } else {
                cartState.products[index].amount += product.amount;
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Remove product from cart
    const removeProduct = (index) => {
        try {
            dispatch({ type: REMOVE_PRODUCT, payload: index });
        } catch (error) {
            console.log(error);
        }
    };

    // Change amount of product in cart
    const changeAmountOfProduct = (index, value) => {
        const newProduct = cartState.products.find((item, idx)=> idx === index)
        newProduct.amount = value;
        try {
            dispatch({
                type: CHANGE_AMOUNT_OF_PRODUCT,
                payload: { index, newProduct }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const CartContextData = {
        cartState,
        addProduct,
        removeProduct,
        changeAmountOfProduct
    };

    return (
        <CartContext.Provider value={CartContextData}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
