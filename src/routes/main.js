const express = require('express');
const router = express.Router();

const { readShoe, readShoes } = require('../models/shoes');

const products = [
    { name: 'Nike Air Force 1', price: 90.00, colors: ['red', 'blue', 'green'] },
    { name: 'Adidas Superstar', price: 80.00, colors: ['red', 'blue'], colors: ['red']},
    { name: 'Converse Chuck Taylor All Star', price: 55.00, colors: ['red', 'black']},
    { name: 'Vans Old Skool', price: 60.00, colors: ['red', 'black']},
    { name: 'New Balance 574', price: 80.00, colors: ['red', 'black']},
    { name: 'Puma Suede Classic', price: 65.00, colors: ['red', 'black']},
    { name: 'Reebok Classic Leather', price: 75.00, colors: ['red', 'black']},
    { name: 'Air Jordan 1', price: 170.00, colors: ['red', 'black']},
    { name: 'Yeezy Boost 350', price: 220.00, colors: ['red', 'black']},
    { name: 'Asics Gel-Lyte III', price: 110.00, colors: ['red', 'black']},
    { name: 'Saucony Jazz Original', price: 60.00, colors: ['red', 'black']},
    { name: 'Brooks Adrenaline GTS', price: 130.00, colors: ['red', 'black']},
    { name: 'Hoka One One Clifton', price: 130.00, colors: ['red', 'black']},
    { name: 'Mizuno Wave Rider', price: 120.00, colors: ['red', 'black']},
    { name: 'Under Armour HOVR Phantom', price: 130.00, colors: ['red', 'black']},
    { name: 'Salomon Speedcross', price: 130.00, colors: ['red', 'black']},
    { name: 'Merrell Moab 2', price: 120.00, colors: ['red']},
    { name: 'Keen Targhee II', price: 135.00, colors: ['red']},
    { name: 'Columbia Newton Ridge Plus II', price: 90.00, colors: ['red']},
    { name: 'Timberland White Ledge', price: 80.00, colors: ['red']},
    { name: 'Dr. Martens 1460', price: 150.00, colors: ['red']},
    { name: 'Clarks Desert Boot', price: 130.00, colors: ['red']},
    { name: 'UGG Classic Short', price: 170.00, colors: ['red']},
    { name: 'Frye Harness 12R', price: 328.00, colors: ['red']},
    { name: 'Sorel Caribou', price: 170.00, colors: ['red']},
    { name: 'LL Bean Bean Boot', price: 129.00, colors: ['red']},
    { name: 'Red Wing Iron Ranger', price: 330.00, colors: ['red']},
    { name: 'Wolverine 1000 Mile', price: 385.00, colors: ['red']},
    { name: 'Thorogood American Heritage', price: 220.00, colors: ['red']},
    { name: 'Chippewa Original', price: 270.00, colors: ['red']},
    { name: 'Justin Original Workboots', price: 180.00, colors: ['red']},
    { name: 'Ariat Heritage Roper', price: 140.00, colors: ['red']},
    { name: 'Tony Lama TLX Waterproof', price: 200.00, colors: ['red']},
    { name: 'Carhartt Rugged Flex', price: 160.00, colors: ['red']},
    { name: 'Georgia Giant Romeo', price: 110.00, colors: ['red']},
    { name: 'Danner Mountain Light II', price: 380.00, colors: ['red']},
    { name: 'La Sportiva Wildcat', price: 130.00, colors: ['red']},
    { name: 'Scarpa Zodiac Plus GTX', price: 280.00, colors: ['red']},
    { name: 'Salewa Mountain Trainer', price: 200.00, colors: ['red']},
    { name: 'Lowa Renegade GTX', price: 240.00, colors: ['red']},
    { name: 'Altra Lone Peak', price: 130.00, colors: ['red']},
    { name: 'Brooks Cascadia', price: 130.00, colors: ['red']},
    { name: 'Inov-8 Roclite', price: 140.00, colors: ['red']},
    { name: 'Nike Zoom Terra Kiger', price: 140.00, colors: ['red']},
    { name: 'Salomon Speedcross', price: 130.00, colors: ['red']},
    { name: 'La Sportiva Bushido', price: 130.00, colors: ['red']},
    { name: 'Adidas Terrex Swift R2 GTX', price: 135.00, colors: ['red']},
    { name: 'Merrell Moab 2', price: 120.00, colors: ['red']}
];

for (let product of products) {
    product.description = `Lorem i Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse porta condimentum sapien, eget euismod massa maximus non. Duis vehicula et nisl a fermentum. Nunc porttitor elit consectetur, commodo mi id, consequat leo. Phasellus sem magna, cursus a libero et, porta tempus purus. Curabitur sit amet justo a urna viverra vestibulum eu nec mi. Maecenas dui nulla, fermentum rhoncus lobortis quis, imperdiet sed neque. Suspendisse id nibh magna. Cras sed felis id lectus placerat convallis. Quisque quis semper mi. Phasellus placerat lacinia bibendum.

    Nulla facilisi. Sed placerat ac sem in rutrum. Duis tortor odio, lobortis id interdum eu, tristique faucibus diam. Nullam ultricies fermentum est vel viverra. Donec convallis ex arcu, placerat ornare mauris euismod et. Maecenas viverra sit amet lacus ut tristique. Duis in erat vel sapien sagittis mollis. Nulla placerat dolor a ligula consectetur congue. Nam ultricies ligula ultrices odio hendrerit blandit.
    
    Sed pharetra viverra tellus, non porta libero feugiat ut. Curabitur et pulvinar dui. Suspendisse justo erat, tempor sed justo in, accumsan fringilla augue. Duis eget eros cursus ligula tincidunt hendrerit. Cras non velit leo. Nullam a pellentesque quam. Sed et tortor sagittis, pulvinar nibh sit amet, egestas ligula.
    
    Aenean interdum tellus odio, vel consectetur nunc porta vitae. Ut vel eros ligula. Aenean sollicitudin lectus eu tincidunt pulvinar. Integer euismod viverra sem, ac semper urna suscipit vitae. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus cursus nunc sit amet ornare vulputate. Donec feugiat, risus vel sagittis faucibus, tellus mauris maximus ligula, vitae blandit nibh leo nec elit. Nam quis elit eget purus volutpat ultrices at et dolor. Nunc in sollicitudin velit, vitae feugiat turpis. Vestibulum et dolor a erat congue tincidunt quis hendrerit lectus. Phasellus vestibulum vel dolor dapibus rhoncus. Nullam venenatis, enim in faucibus scelerisque, massa dolor convallis dolor, at consequat risus mi sed magna. Duis facilisis quam erat, vitae vulputate purus ornare ut. Proin libero mauris, ornare ut varius quis, volutpat a ligula. Nullam dapibus eros risus, et euismod quam aliquam vel.`;
}

router.get('/', async (req, res, next) => {
    res.render('index.html', { products });
});

router.get('/:shoeId', async (req, res, next) => {
    try {
        const product = products[req.params.shoeId - 1];
        res.render('product.html', { product });
    } catch {
        res.status(404).json({ message: 'Shoe not found!' });
    }
});

router.use(express.static('public'));

module.exports = router;
