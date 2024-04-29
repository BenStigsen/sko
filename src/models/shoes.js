const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./connection');
const connection = require('./connection');

class Shoe extends Model { }
Shoe.init(
    {
        name: DataTypes.STRING,
        price: DataTypes.INTEGER,
    },
    { sequelize, modelName: 'shoe' },
); //for some reason only sequelize is allowed. No other variable name.

async function query(query) {
    await connection.sync();
    query();
    return
}

createShoe(
    () => {
        const nike = Shoe.build({
            name: 'test',
            price: 9999,
        });
        console.log(nike.toJSON());
    });

query(
    async () => {
        const nike = Shoe.build({
            name: 'testttttttttttttttttttttttttttttttttttttttt',
            price: 99999999999999999999999,
        });
        console.log(nike.toJSON());
    }
);

function createShoe(shoe) {
    async () => {
        const createdShoe = await Shoe.create({
            name: shoe.name,
            price: shoe.price
        });
        console.log(createdShoe.toJSON())
    }
    return
}

async function createShoes(...shoes) {
    for (const shoe of shoes) {
        createShoe(shoe);
    }
    return
}

async function readShoe(id) {
    return Shoe.find(id => id === _id);
}

async function readShoes() {
    return Shoe.findAll();
}

async function updateShoe(id, shoe) {
    return Shoe.update({
        _id: shoe.id,
        name: shoe.name,
        price: shoe.price
    },
        { where: { _id: id } }
    )
}

async function deleteShoe(id) {
    return Shoe.destroy({
        where: {
            _id: id
        }
    })
}

async function deleteShoes(...ids) {
    for (const id of ids) {
        deleteShoe(id);
    }
    return
}

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
