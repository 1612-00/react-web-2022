import product1 from "../assets/img/shoes_1.jpg";
import product2 from "../assets/img/shoes_2.jpg";
import product3 from "../assets/img/shoes_3.jpg";
import product4 from "../assets/img/shoes_4.jpg";
import product5 from "../assets/img/shoes_5.jpg";

export const productType1 = [
    {
        image: product1,
        text: "Men shoes"
    },
    {
        image: product2,
        text: "Girl shoes"
    }
];

export const productType2 = [
    {
        image: product3,
        text: "Boots Men"
    },
    {
        image: product4,
        text: "Accessories"
    },
    {
        image: product5,
        text: "Boots Girl"
    }
];

const menShoes = [
    { text: "Medium ankle boots", params: "medium-ankle-boots" },
    { text: "High neck boots", params: "high-neck-boots" },
    { text: "Low neck boots", params: "low-neck-boots" },
    { text: "Chelsea Boots", params: "chelsea-boots" }
];

const girlShoes = [
    { text: "High neck boots", params: "high-neck-boots" },
    { text: "Medium ankle boots", params: "medium-ankle-boots" },
    { text: "Low neck boots", params: "low-neck-boots" }
];

export const collections = [
    { title: "New products", params: "new-product" },
    { title: "Men Shoes", params: "men-shoes", options: menShoes },
    { title: "Girl Shoes", params: "girl-shoes", options: girlShoes },
    { title: "Accessories", params: "accessories" }
];

export const collectionSize = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44];
