import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import {
    ADD_PRODUCT_TO_CART,
    apiUrl,
    CHANGE_AMOUNT_OF_PRODUCT,
    LOAD_CART,
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

    // Load cart
    const loadCart = () => {
        try {
            const productsInCart =
                localStorage.getItem("cart") === null
                    ? []
                    : JSON.parse(localStorage.getItem("cart"));

            dispatch({ type: LOAD_CART, payload: productsInCart });
        } catch (error) {
            console.log(error);
        }
    };

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
        const newProduct = cartState.products.find(
            (item, idx) => idx === index
        );
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

    // Checkout
    const checkout = async (customerInfo, otherInfo, cart) => {
        if (
            !customerInfo.name ||
            !customerInfo.address ||
            !customerInfo.phone
        ) {
            return false;
        }
        try {
            const newBill = {
                cusName: customerInfo.name,
                cusAddress: customerInfo.address,
                cusPhone: customerInfo.phone,
                anotherName: otherInfo.name,
                anotherAddress: otherInfo.address,
                anotherPhone: otherInfo.phone,
                note: otherInfo.note,
                cart
            };
            const res = await axios.post(`${apiUrl}/bill`, newBill);
            if (res.data.success) {
                return true;
            }
        } catch (error) {
            if (error.response.data) return error.response.data;
            else console.log(error);
        }
    };

    const CartContextData = {
        cartState,
        loadCart,
        addProduct,
        removeProduct,
        changeAmountOfProduct,
        checkout
    };

    return (
        <CartContext.Provider value={CartContextData}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
