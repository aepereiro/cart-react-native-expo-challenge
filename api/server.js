import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const MOCK_FILE_PRODUCTS = './mocks/products.js';
const MOCK_FILE_STOCK = './mocks/stock-price.js';

app.use(cors());
app.use(express.json());

// Dynamic import for product details using cache-busting
app.get('/api/products', async (req, res) => {
    try {
        //console.log("REQUEST /api/products")
        const productsModulePath = `${MOCK_FILE_PRODUCTS}?update=${Date.now()}`;
        const products = await import(productsModulePath);
        res.json(products.default);
    } catch (error) {
        console.error("Failed to load products data:", error);
        res.status(500).json({ error: "Error loading product data" });
    }
});

// Dynamic import for stock and price information by SKU using cache-busting
app.get('/api/stock-price/:sku', async (req, res) => {
    const sku = req.params.sku;
    try {
        const stockPriceModulePath = `${MOCK_FILE_STOCK}?update=${Date.now()}`;
        const stockPrice = await import(stockPriceModulePath);
        const productInfo = stockPrice.default[sku];
        if (!productInfo) {
            return res.status(404).json({ error: "SKU not found" });
        }
        const response = {
            stock: productInfo.stock,
            price: productInfo.price
        };
        res.json(response);
    } catch (error) {
        console.error("Failed to load stock data:", error);
        res.status(500).json({ error: "Error loading stock data" });
    }
});

app.get('/', (req, res) => {
    res.send('Welcome to the Beer E-Commerce API!');
});

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
