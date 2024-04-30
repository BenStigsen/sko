const { Model, DataTypes } = require('sequelize');
const connection = require('./connection');

class Shoe extends Model { }
const sequelize = connection;
Shoe.init(
    {
        name: DataTypes.STRING,
        price: DataTypes.INTEGER,
    },
    { sequelize, modelName: 'shoe' },//for some reason only sequelize is allowed. No other variable name.
);

async function createShoe(shoe) {
    await connection.sync();
    const createdShoe = await Shoe.create({
        name: shoe.name,
        price: shoe.price
    });
    console.log(createdShoe.toJSON());
}

function createShoes(...shoes) {
    for (let shoe of shoes) {
        createShoe(shoe);
    }
}

async function readShoe(id) {
    await connection.sync();
    const found = await Shoe.findOne({ where: { id: id } });
    if (found === null) {
        console.log('No shoe found matching the id.');
    } else {
        console.log(found.toJSON());
        return found;
    }
}

async function readShoes(print) {
    await connection.sync();
    const shoes = await Shoe.findAll();
    if (print) {
        for (let shoe of shoes) {
            console.log(shoe.toJSON());
        }
    }
    return shoes
}

async function updateShoe(id, shoe) {
    await Shoe.update({
        name: shoe.name,
        price: shoe.price
    },
        { where: { id: id } }
    )
    console.log('Updated to:')
    readShoe(id);
}

//Not checking if id exists in the database. Doesn't present an error if given invalid id.
async function deleteShoe(id) {
    await Shoe.destroy({
        where: {
            id: id
        }
    });
    console.log('id: ' + id + ' successfully deleted.')
}

//Same for this since it invokes the other.
function deleteShoes(...ids) {
    for (const id of ids) {
        deleteShoe(id);
    }
}

console.log('test')
const adidias = Shoe.build({
    name: 'Adidas',
    price: 420
});

module.exports = {
    createShoe,
    createShoes,
    readShoe,
    readShoes,
    updateShoe,
    deleteShoe,
    deleteShoes,
    Shoe
};
