const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: [
        {
            value: {
                type: String
            },
            amount: {
                type: Number
            }
        }
    ],
    discount: {
        type: Number,
        required: true
    },
    categories: [],
    desc: {
        type: String
    }
});

module.exports = mongoose.model("products", ProductSchema);
