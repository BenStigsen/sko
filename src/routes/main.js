const express = require('express');
const router = express.Router();

const { readShoe, readShoes } = require('../models/shoes');

const products = [
    { 
        name: 'Sort Plateau Stilet', 
        image: 'stilettos/1.jpg', 
        price: 500.00, 
        colors: ['black', 'red'], 
        description: "Sort Plateau sandal i ruskindslook med en hælhøjde på 9,5 cm og en plateauhøjde på 3 cm. Disse stilfulde sandaler er designet til at give dig ekstra højde og elegance. Perfekte til formelle begivenheder eller en aften i byen, de kombinerer komfort med et sofistikeret look. Den robuste hæl og plateau sikrer, at du kan gå komfortabelt hele natten. Normal i størrelse, så vælg din sædvanlige skostørrelse." 
    },
    { 
        name: 'Sort Plateau Stilet', 
        image: 'stilettos/2.jpg', 
        price: 350.00, 
        colors: ['black', 'blue'], 
        description: "Disse højhælede sorte plateau sandaler er fremstillet i ruskindslook og har smukke remme fortil samt en lynlås bagtil for nem påtagning. Sandalerne er designet til at være både elegante og komfortable, hvilket gør dem ideelle til både casual og formelle lejligheder. Den høje hæl tilføjer en dramatisk effekt, mens plateauet sikrer stabilitet og komfort. Tilgængelig i flere farver for at matche dit outfit perfekt." 
    },

    { 
        name: 'Sort Sneakers', 
        image: 'sneakers/1.jpg', 
        price: 300.00, 
        colors: ['black'], 
        description: "Disse super fine sorte sneakers tilbyder en fantastisk pasform og en rigtig god sål, der giver optimal komfort hele dagen. De er alsidige nok til at blive båret med både jeans og kjoler, hvilket gør dem perfekte til både hverdagsbrug og mere formelle begivenheder. Sneakersene er almindelige i størrelsen, så du kan vælge din sædvanlige skostørrelse. Deres stilfulde design kombineret med praktiske funktioner gør dem til et must-have i enhver garderobe." 
    },
    { 
        name: 'Sneakers', 
        image: 'sneakers/2.jpg', 
        price: 250.00, 
        colors: ['black', 'red', 'white', 'grey'], 
        description: "Disse letvægtige sneakers med snørrebånd er designet med en fleksibel sål og en god pasform, der sikrer maksimal komfort. De er perfekte til både hverdag og festlige lejligheder, hvilket gør dem til en alsidig tilføjelse til din skosamling. Sneakersene er almindelige i størrelsen og er tilgængelige i flere farver, så du kan finde det perfekte par til dit outfit. De kombinerer stil og funktionalitet, hvilket gør dem ideelle til ethvert formål." 
    },
    { 
        name: 'Lilla Sneakers', 
        image: 'sneakers/3.jpg', 
        price: 300.00, 
        colors: ['blue', 'red'], 
        description: "Disse super fine lilla sneakers tilbyder en fantastisk pasform og en rigtig god sål, der giver optimal komfort hele dagen. De kan nemt matches med både jeans og kjoler, hvilket gør dem perfekte til både hverdagsbrug og mere formelle begivenheder. Sneakersene er almindelige i størrelsen, så du kan vælge din sædvanlige skostørrelse. Deres unikke lilla farve tilføjer et spændende element til ethvert outfit, og de er lige så komfortable, som de er stilfulde." 
    },
    { 
        name: 'Sort Sneakers', 
        image: 'sneakers/4.jpg', 
        price: 250.00, 
        colors: ['black'], 
        description: "Disse flotte sorte sneakers tilbyder en super god pasform og er designet med en ruskindslook overdel og en lille kant af fin lak detalje. De kan bruges til både hverdag og fest, hvilket gør dem til en alsidig tilføjelse til din garderobe. Sneakersene er små i størrelsen, så det anbefales at vælge en størrelse større end din sædvanlige. Deres elegante design kombineret med komfortable funktioner gør dem perfekte til enhver anledning." 
    },

    { 
        name: 'Støvle med pelskant', 
        image: 'boots/1.jpg', 
        price: 350.00, 
        colors: [], 
        description: "Disse dejlige varme sorte støvler med pelskant og lækkert foer er perfekte til kolde vinterdage. De har en god rustik sål, der sikrer et solidt greb på glatte overflader. Lavet af imiteret ruskind og pels, tilbyder disse støvler både stil og funktionalitet. De er ideelle til vintervejr og holder dine fødder varme og komfortable hele dagen. Deres klassiske design gør dem nemme at parre med forskellige outfits." 
    },
    { 
        name: 'Khaki støvle', 
        image: 'boots/2.jpg', 
        price: 350.00, 
        colors: [], 
        description: "Disse dejlige varme foret vinterstøvler med ombuk giver dig mulighed for at bære dem med eller uden pelskant, afhængigt af dit look. De har en god rustik sål, der passer perfekt til vintervejret og sikrer et solidt greb på glatte overflader. Støvlerne er lavet til at holde dine fødder varme og komfortable i kolde forhold, hvilket gør dem til en praktisk og stilfuld tilføjelse til din vintergarderobe." 
    },
    { 
        name: 'Sort støvle', 
        image: 'boots/3.jpg', 
        price: 350.00, 
        colors: ['black'], 
        description: "Denne stilfulde sorte støvle er designet til at være både funktionel og trendy. Med en holdbar konstruktion og et komfortabelt indre, er disse støvler perfekte til både hverdagsbrug og mere formelle begivenheder. Deres tidløse design gør dem til en alsidig tilføjelse til enhver garderobe, mens deres robuste ydre sikrer langvarig brug." 
    },
    { 
        name: 'Sort støvle med spænde', 
        image: 'boots/4.jpg', 
        price: 300.00, 
        colors: ['black', 'brown'], 
        description: "Disse elegante sorte støvler med spændedetaljer kombinerer mode og funktionalitet. De er designet til at give både komfort og stil, hvilket gør dem perfekte til både hverdagsbrug og særlige begivenheder. Den robuste konstruktion sikrer holdbarhed, mens spænderne tilføjer et trendy touch til dit outfit. Fås i både sort og brun for at matche forskellige looks." 
    },
    { 
        name: 'Khaki støvle med rem', 
        image: 'boots/5.jpg', 
        price: 300.00, 
        colors: ['black', 'brown'], 
        description: "Disse trendy khaki støvler med rem detaljer tilbyder en moderne stil og en robust konstruktion, ideelle til både daglig brug og udendørs eventyr. De er designet til at være komfortable og holdbare, hvilket gør dem til et praktisk valg for enhver, der ønsker både stil og funktion. Tilgængelige i sort og brun, så du kan vælge den farve, der bedst passer til din garderobe." 
    },

    { 
        name: 'Sort Plateau sandal', 
        image: 'stilettos/1.jpg', 
        price: 500.00, 
        colors: ['black', 'red'], 
        description: "Disse sorte plateau sandaler i ruskindslook har en hælhøjde på 9,5 cm og en plateauhøjde på 3 cm. De er designet til at tilføje ekstra højde og stil til dit outfit, hvilket gør dem ideelle til både fester og formelle arrangementer. Sandalerne har en robust hæl og et komfortabelt plateau, der sikrer, at du kan danse hele natten uden ubehag. Normal i størrelse, så vælg din sædvanlige skostørrelse." 
    },
    { 
        name: 'Sort Plateau sandal', 
        image: 'stilettos/2.jpg', 
        price: 350.00, 
        colors: ['black', 'blue'], 
        description: "Disse højhælede sorte plateau sandaler i ruskindslook har smukke remme fortil og en praktisk lynlås bagtil. Designet til at kombinere komfort med høj stil, er disse sandaler perfekte til at løfte dit look til næste niveau. Den høje hæl tilføjer en dramatisk effekt, mens plateauet sikrer stabilitet og komfort. Tilgængelig i flere farver for at matche dit outfit perfekt." 
    },
];


for (let i = 0; i < products.length; i += 1) {
    products[i].id = i;
}

router.get('/', async (req, res, next) => {
    res.render('index.html', { products });
});

router.get('/category/:category', async (req, res, next) => {
    const category = req.params.category;
    switch (category) {
        case 'stilettos':
            res.render('index.html', { products: products.slice(0, 2) });
            break;
        case 'sneakers':
            res.render('index.html', { products: products.slice(2, 6) });
            break;
        case 'boots':
            res.render('index.html', { products: products.slice(6, 11) });
            break;
        case 'sandals':
            res.render('index.html', { products: products.slice(11, 13) });
            break;
        default:
            res.render('index.html', { products });
            break;
    }
});

router.get('/:shoeId', async (req, res, next) => {
    try {
        const product = products[req.params.shoeId];
        res.render('product.html', { product });
    } catch {
        res.status(404).json({ message: 'Shoe not found!' });
    }
});

router.use(express.static('public'));

module.exports = router;
