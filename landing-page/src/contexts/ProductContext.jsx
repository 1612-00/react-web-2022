import { useReducer, createContext, useEffect } from "react";
import { ProductReducer } from "../reducers/ProductReducer";
import axios from "axios";
import { apiUrl, GET_ALL_PRODUCT } from "../constants/ActionType";

const initialState = {
    products: []
};

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
    const [productState, dispatch] = useReducer(ProductReducer, initialState);

    const getAllProduct = async () => {
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

    const getProductById = async (id) => {
        try {
            const res = await axios.get(`${apiUrl}/product/${id}`);
            if (res.data.success) {
                return res.data.product;
            }
        } catch (error) {
            if (error.response.data) return error.response.data;
            else console.log(error);
        }
    }

    useEffect(() => {
        getAllProduct();
    }, []);

    const ProductContextData = { productState, getAllProduct, getProductById };

    return (
        <ProductContext.Provider value={ProductContextData}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductContextProvider;
