const Sequelize = require('sequelize');

//Conexión a BD
const sequelize = new Sequelize('prueba', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

//Autenticación 
sequelize
    .authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch(err => {
    console.error('Unable to connect to the database:', err);
});

const Model = Sequelize.Model;

class User extends Model {}
User.init({
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING
    } 
}, {
    sequelize,
    modelName: 'user'
});

//función que crea un usuario con nombre y apellido pasados por parámetro y luego cambia el nombre a 'Juan'
async function insertarYActualizar(nombre, apellido) {
    const usuario = await User.create({
        firstName: nombre,
        lastName: apellido
    })
    console.log(usuario.toJSON());

    await usuario.update({firstName: 'Juan'}, {
        where:{
            firstName: nombre,
            lastName: apellido
        }
    
    })
    await (
        console.log(usuario.toJSON())
    );
}

//Ejecución
sequelize.sync()
    .then(() => {
        insertarYActualizar('Pedro', 'Ramirez')     
    });




