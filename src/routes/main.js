const express = require('express');
const router = express.Router();

const { readShoe, readShoes } = require('../models/shoes');

router.use(express.static('public'));

router.get('/', (req, res, next) => {
    res.render('index.html', { products: readShoes() });
});

router.get('/:shoeId', (req, res, next) => {
    const product = readShoe(req.params.shoeId);
    if (!product) {
        res.status(404).json({
            message: 'Shoe not found!'
        });
        return;
    }

    res.render('product.html', { product });
});

module.exports = router;
