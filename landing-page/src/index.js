import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "swiper/css/bundle";
import CartContextProvider from "./contexts/CartContext";
import ProductContextProvider from "./contexts/ProductContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ProductContextProvider>
            <CartContextProvider>
                <App />
            </CartContextProvider>
        </ProductContextProvider>
    </React.StrictMode>
);
