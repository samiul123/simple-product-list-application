const express = require('express');
require('dotenv').config();
const {StatusCodes, ReasonPhrases} = require('http-status-codes')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

//implement the CORS config
const cors = require('cors');
const requestIdMiddleware = require("./logger/requestIdMiddleware");
const requestResponseLogger = require('./logger/requestResponseLogger')

app.use(cors());
app.use(requestIdMiddleware);
app.use(requestResponseLogger)

//Common error handler to handle all types of error
const errorHandler = (err, req, res, next) => {
    req.logger.error(err);
    res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: err.message || ReasonPhrases.INTERNAL_SERVER_ERROR });
};
app.use(errorHandler);

//products array
let products = [
    { id: 1, name: 'Product 1', description: 'description 1', price: 100, imageUrl: '' },
    { id: 2, name: 'Product 2', description: 'description 2', price: 200, imageUrl: '' },
    { id: 3, name: 'Product 3', description: 'description 3', price: 300, imageUrl: '' },
    { id: 4, name: 'Product 4', description: 'description 4', price: 150, imageUrl: '' },
    { id: 5, name: 'Product 5', description: 'description 5', price: 500, imageUrl: '' },
    { id: 6, name: 'Product 6', description: 'description 6', price: 50, imageUrl: '' },
];

//function to generate a url for getting a random image from picsum
const fetchImageUrl = () => {
    return `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`;
};

//implement the get api for getting products
app.get('/api/products', (req, res, next) => {
    try {
        req.logger.debug("Fetching images for all products")
        products = products.map(product => ({ ...product, imageUrl: fetchImageUrl() }));
        req.logger.debug("Returning all products")
        res.status(StatusCodes.OK).json(products);
    } catch (error) {
        next(error);
    }
});

//implement the delete api for deleting a product by Id
app.delete('/api/products/:id', (req, res, next) => {
    try {
        const productId = parseInt(req.params.id, 10);
        if (isNaN(productId)) {
            throw { status: StatusCodes.BAD_REQUEST, message: `Invalid product ID ${productId}` };
        }

        const index = products.findIndex(product => product.id === productId);
        if (index === -1) {
            throw { status: StatusCodes.NOT_FOUND, message: `Product with ID ${productId} not found` };
        }
        req.logger.debug(`Found the product with ID ${productId}`);
        products.splice(index, 1);
        req.logger.debug(`Deleted product with ID ${productId}`);
        res.status(StatusCodes.OK).json({ message: `Product with ${productId} deleted successfully` });
    } catch (error) {
        next(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
