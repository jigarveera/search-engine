import mongoose from 'mongoose';
import { PRODUCT_CATEGORIES } from '../constants/constant.js';
import { v7 as uuidv7 } from 'uuid'

const productSchema = new mongoose.Schema(
    {
        product_id: {
            type: String,
            default: uuidv7,
            unique: true,
            index: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        category: {
            type: String,
            enum: {
                values: Object.values(PRODUCT_CATEGORIES),
                message: `"{VALUE}" is not a valid category,\n valid categorie are: ${Object.values(PRODUCT_CATEGORIES).join(',')}`
            },
            default: PRODUCT_CATEGORIES.ELECTRONICS
        },
        price: {
            type: Number,
            required: true,
            min: [0, 'Price must be a whole number'],
        },
        selling_price: {
            type: Number,
            required: true,
            min: [0, 'selling price must be a whole number'],
            validate: {
                validator(value) {
                    return value <= this.price;
                },
                message: "Selling price must be less than or equal to price"
            }
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema);

export default Product;