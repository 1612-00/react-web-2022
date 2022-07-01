const router = require("express").Router();
const Bill = require("../model/Bill");
const formatDate = require("../algorithms/FormatDate");

// @route POST api/bill
// @desc Add a bill
// @access Private
router.post("/", async (req, res) => {
    const {
        cusName,
        cusAddress,
        cusPhone,
        anotherName,
        anotherAddress,
        anotherPhone,
        note,
        cart
    } = req.body;

    // Validate data
    if (!cusName || !cusAddress || !cusPhone) {
        return res
            .status(400)
            .json({ success: false, message: "Missing customer info" });
    }
    if (!cart || cart.length === 0) {
        return res
            .status(400)
            .json({ success: false, message: "Not found product in cart" });
    }

    try {
        const newBill = new Bill({
            cusName,
            cusAddress,
            cusPhone,
            anotherName: anotherName ? anotherName : "",
            anotherAddress: anotherAddress ? anotherAddress : "",
            anotherPhone: anotherPhone ? anotherPhone : "",
            note: note ? note : "",
            cart,
            status: "pending",
            time: new Date()
        });
        await newBill.save();
        return res.status(200).json({
            success: true,
            message: "Add bill successfully",
            bill: newBill
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
});

// @route GET api/bill
// @desc Get all bill
// @access Private
router.get("/", async (req, res) => {
    try {
        const bills = await Bill.find({});
        return res.status(200).json({ success: true, bills });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
});

// @route GET api/bill/:id
// @desc Get a bill by id
// @access Private
router.get("/:id", async (req, res) => {
    try {
        const bill = await Bill.findById({ _id: req.params.id });
        return res.status(200).json({ success: true, bill });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
});

// @route DELETE api/bill/:id
// @desc Delete a bill by id
// @access Private
router.delete("/:id", async (req, res) => {
    try {
        const billDelete = await Bill.findByIdAndDelete({ _id: req.params.id });
        if (!billDelete) {
            return res
                .status(401)
                .json({ success: false, message: "Bill not found" });
        }
        return res
            .status(200)
            .json({ success: true, message: "Delete bill successfully" });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
});

module.exports = router;
