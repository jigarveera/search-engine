import Product from '../schema/product.schema.js';
import redis from '../config/redis.config.js';
import dotenv from 'dotenv';
dotenv.config();

const CACHE_TTL = process.env.CACHE_TTL

export const createProductController = async (req, res) => {
    try {
        const { title, description, category, price, selling_price } = req.body;

        const product = new Product({
            title,
            description,
            price,
            selling_price
        })

        await product.save();

        await redis.del(`products:all`)

        res.status(201).json({
            success: true,
            message: `✔️ product created successfully`,
            product
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `❌ Internal server error`,
            error: error.message
        })
    }
}

export const createProductsController = async (req, res) => {
    try {
        const products = req.body.products;

        const createProducts = await Product.insertMany(products);

        await redis.del(`products:all`)

        res.status(201).json({
            success: true,
            message: `✔️ products created successfully`,
            count: createProducts.length,
            products: createProducts
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `❌ Internal server error`,
            error: error.message
        })
    }
}

export const getAllProductsController = async (req, res) => {
    try {
        const cacheKey = 'products:all';

        const cachedProducts = await redis.get(cacheKey);

        if (cachedProducts) {
            return res.status(200).json({
                success: true,
                message: `✔️ products fetched successfully`,
                source: 'cache',
                count: JSON.parse(cachedProducts).length,
                products: JSON.parse(cachedProducts)
            })
        }

        const products = await Product.find().lean();

        await redis.set(
            cacheKey,
            JSON.stringify(products),
            'EX',
            CACHE_TTL
        )

        console.log(`✔️ products fetched from db and cached`)

        res.status(200).json({
            success: true,
            message: `✔️ products fetched successfully`,
            source: 'db',
            count: products.length,
            products
        })

    } catch (error) {
       res.status(500).json({
            success: false,
            message: `❌ Internal server error`,
            error: error.message
       })
    }
}

export const getProductByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        const cacheKey = `product:${id}`;

        const cachedProduct = await redis.get(cacheKey);

        if (cachedProduct) {
            return res.status(200).json({
                success: true,
                message: `✔️ product fetched successfully`,
                source: 'cache',
                product: JSON.parse(cachedProduct)
            })
        }

        const product = await Product.findOne({ product_id: id });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: `❌ product not found with id: ${id}`
            })
        }

        await redis.set(
            cacheKey,
            JSON.stringify(product),
            'EX',
            CACHE_TTL
        )

        res.status(200).json({
            success: true,
            message: `✔️ product fetched successfully`,
            source: 'db',
            product
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `❌ Internal server error`,
            error: error.message
        })
    }
}

export const deleteAllProductsController = async (req, res) => {
    try {
        const result = await Product.deleteMany();

        await redis.del(`products:all`);

        res.status(200).json({
            success: true,
            message: `✔️ all products deleted successfully`,
            deletedCount: result.deletedCount
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `❌ Internal server error`,
            error: error.message
        })
    }
}

export const deleteProductByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findOneAndDelete({ product_id: id });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: `❌ product not found with id: ${id}`
            })
        }

        await redis.del(`product:${id}`);

        res.status(200).json({
            success: true,
            message: `✔️ product deleted successfully`,
            product
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `❌ Internal server error`,
            error: error.message
        })
    }
}

// export const updateProductByIdController = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const updateProduct = await Product.findOneAndUpdate({ product_id: id}, req.body, { new: true })

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: `❌ Internal server error`,
//             error: error.message,
//         })
//     }
// }