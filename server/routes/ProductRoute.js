const router = require("express").Router();
const { Model } = require("mongoose");
const verifyToken = require("../middleware/VerifyToken");
const Product = require("../model/Product");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(" ").join("-");
        cb(null, fileName);
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    }
});

// @route POST api/product
// @desc Add a product
// @access Private
router.post("/", upload.single("image"), async (req, res) => {
    const { name, price, total, desc } = req.body;

    if (!name || !price || !total) {
        return res
            .status(400)
            .json({ success: false, message: "Product missing property" });
    }

    try {
        const product = await Product.findOne({ name });

        if (product) {
            return res
                .status(400)
                .json({ success: false, message: 'Product already taken' });
        }

        const newProduct = new Product({
            image: req.file.path,
            name,
            price,
            size: [
                {value: 40, amount: 10},
                {value: 41, amount: 10},
                {value: 42, amount: 0}
            ],
            discount: 14,
            categories: ["men-shoes", "chelsea boots"],
            desc: "Description"
        });
        await newProduct.save();
        return res.status(200).json({
            success: true,
            message: "Add product successfully",
            product: newProduct
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
});

// @route GET api/product
// @desc Get all product
// @access Private
router.get("/", async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({ success: true, products });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
});

// @route GET api/product
// @desc Get a product
// @access Private
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById({ _id: req.params.id });
        return res.status(200).json({ success: true, product });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
});

// @route PUT api/product
// @desc Update product
// @access Private
router.put("/:id", verifyToken, async (req, res) => {
    const { image, name, price, total, desc } = req.body;

    if (!image || !name || !price || !total) {
        return res
            .status(400)
            .json({ success: false, message: "Product missing property" });
    }

    try {
        let updatedProduct = {
            image,
            name,
            price,
            total,
            desc: desc || ""
        };

        // {new: true} to return updated product
        updatedProduct = await Product.findOneAndUpdate(
            { _id: req.params.id },
            updatedProduct,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(401).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Updated successfully",
            product: updatedProduct
        });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
});

// @route DELETE api/product
// @desc Delete product
// @access Private
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const deleteProduct = await Product.findOneAndDelete({
            _id: req.params.id
        });

        if (!deleteProduct) {
            return res.status(401).json({
                success: false,
                message: "Product not found"
            });
        }
        return res
            .status(200)
            .json({ success: true, message: "Delete product successfully" });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
});

module.exports = router;
