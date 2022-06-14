import { createContext, useEffect, useReducer } from 'react';
import {
    ADD_PRODUCT,
    DELETE_PRODUCT,
    UPDATE_PRODUCT,
    apiUrl,
    GET_ALL_PRODUCT,
    SET_PRODUCT_FOCUS,
} from './constant';
import axios from 'axios';
import { productReducer } from './../reducers/ProductReducer';

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
    const [productState, dispatch] = useReducer(productReducer, {
        products: [],
        productsFocus: null,
    });

    const getAllProducts = async () => {
        try {
            const res = await axios.get(`${apiUrl}/product`);
            if (res.data.success) {
                dispatch({ type: GET_ALL_PRODUCT, payload: res.data.products });
                return res.data.products;
            }
        } catch (error) {
            if (error.response.data) return error.response.data;
            else console.log(error);
        }
    };

    useEffect(() => getAllProducts(), []);

    const addProduct = async (newProduct) => {
        try {
            const res = await axios.post(`${apiUrl}/product`, newProduct);

            if (res.data.success) {
                dispatch({ type: ADD_PRODUCT, payload: res.data.product });
            }
        } catch (error) {
            if (error.response.data) return error.response.data;
            else console.log(error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const res = await axios.delete(`${apiUrl}/product/${id}`);
            if (res.data.success) {
                dispatch({ type: DELETE_PRODUCT, payload: id });
            }
        } catch (error) {
            if (error.response.data) return error.response.data;
            else console.log(error);
        }
    };

    const updateProduct = async (id, text) => {
        let noteUpdate;
        productState.products.forEach((note) => {
            if (note._id === id) {
                noteUpdate = note;
            }
        });
        noteUpdate.content = text;

        try {
            const res = await axios.put(`${apiUrl}/product/${id}`, noteUpdate);
            if (res.data.success) {
                dispatch({ type: UPDATE_PRODUCT, payload: res.data.note });
            }
        } catch (error) {
            if (error.response.data) return error.response.data;
            else console.log(error);
        }
    };

    const setProductFocus = (note) => {
        try {
            dispatch({ type: SET_PRODUCT_FOCUS, payload: note });
        } catch (error) {
            console.log(error);
        }
    };

    const ProductContextData = {
        productState,
        addProduct,
        deleteProduct,
        updateProduct,
        getAllProducts,
        setProductFocus,
    };

    return (
        <ProductContext.Provider value={ProductContextData}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductContextProvider;
