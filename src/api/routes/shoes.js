const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Fetching all shoes!'
    });
});

router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    }

    res.status(201).json({
        message: 'Posting a shoe!',
        createdProduct: product
    }); 
});

router.patch('/', (req, res, next) => {
    res.status(200).json({
        message: 'Updated shoe!'
    });
});

router.delete('/', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted shoe!'
    });
});

router.get('/:shoeId', (req, res, next) => {
    const id = req.params.shoeId;
    if (id === 'special') {
        res.status(200).json({
            message: 'You\'ve discovered the special ID!',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID!'
        });
    }
});

module.exports = router;
