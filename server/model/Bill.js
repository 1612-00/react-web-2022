const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
    cusName: {
        type: String,
        required: true
    },
    cusAddress: {
        type: String,
        required: true
    },
    cusPhone: {
        type: String,
        require: true
    },
    anotherName: {
        type: String
    },
    anotherAddress: {
        type: String
    },
    anotherPhone: {
        type: String
    },
    cusNote: {
        type: String
    },
    cart: {
        type: Array,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("bills", BillSchema);
