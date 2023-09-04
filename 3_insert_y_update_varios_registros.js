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

//función que varios usuario y luego les cambia el nombre
async function insertarYActualizarVariosRegistros(){
    const usuario1 = await User.create({
        firstName: 'Pedro',
        lastName: 'Ramirez'
    })
    await(
        console.log(usuario1.toJSON())
    );
    await usuario1.update({firstName: 'Carlos'}, {
        where:{
            firstName: 'Pedro',
            lastName: 'Ramirez'
        }
    })
    await(
        console.log(usuario1.toJSON())
    );
    const usuario2 = await User.create({
        firstName: 'Brian',
        lastName: 'Cruz'
    })
    await(
        console.log(usuario2.toJSON())
    );
    await usuario2.update({firstName: 'Gonzalo'}, {
        where:{
            firstName: 'Brian',
            lastName: 'Cruz'
        }
    })
    await(
        console.log(usuario2.toJSON())
    );
    const usuario3 = await User.create({
        firstName: 'Martin',
        lastName: 'Rodolfi'
    })
    await(
        console.log(usuario3.toJSON())
    );
    await usuario3.update({firstName: 'José'}, {
        where:{
            firstName: 'Martín',
            lastName: 'Rodolfi'
        }
    })
    await(
        console.log(usuario3.toJSON())
    );

}

insertarYActualizarVariosRegistros();