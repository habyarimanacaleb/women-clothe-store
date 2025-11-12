"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ReviewSchema = new mongoose_1.Schema({
    user: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
});
var ProductSchema = new mongoose_1.Schema({
    sku: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    price: { type: String, required: true },
    label: { type: String, required: true },
    stock: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    reviews: [ReviewSchema],
}, { timestamps: true });
exports.default = mongoose_1.default.models.Product ||
    mongoose_1.default.model("Product", ProductSchema);
