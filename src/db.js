require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/vetpet`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
// const { Recipe } = sequelize.models;
// const {Diet} = sequelize.models
const { Administrator, Appointment, Notification, Owner, Pet, Product, Sale, TypeNotification, TypeUser, User, Vaccination, Vaccine, Veterinarian, Visit } = sequelize.models;

// Aca vendrian las relaciones

// // MUCHOS-MUCHOS -- notifications-users
const pet_owner = sequelize.define("pet_owner", {}, { timestamps: false });
Pet.belongsToMany(Owner, { through: pet_owner, foreignKey: "idPet" }) // belongs To Many
Owner.belongsToMany(Pet, { through: pet_owner, foreignKey: "idOwner" }) // belongs To Many

Pet.hasMany(Vaccination, {
  foreignKey: 'idPet'
})

Vaccination.belongsTo(Vaccine, {
  foreignKey: 'idVaccine'
})

Pet.hasMany(Appointment, {
  foreignKey: 'idPet'
})

Appointment.belongsTo(Visit, {
  foreignKey: 'idVisit'
})

Pet.hasMany(Visit, {
  foreignKey: 'idPet'
})

User.belongsTo(TypeUser, {
  foreignKey: 'idTypeUser'
})

Owner.belongsTo(User, {
  foreignKey: 'idUser'
})

Veterinarian.belongsTo(User, {
  foreignKey: 'idUser'
})

Administrator.belongsTo(User, {
  foreignKey: 'idUser'
})

// Alumno.hasMany(Asistencia,{
//   foreignKey: 'idAlumno'
// })
// Alumno.hasMany(Notas,{
//   foreignKey: 'idAlumno'
// })
// Usuario.hasMany(Curso,{
//   foreignKey: 'idUsuario'
// })
// Materia.hasMany(Notas,{
//   foreignKey: 'idMateria'
// })
// TipoUsuario.hasMany(Usuario,{
//   foreignKey: 'idTipoUsuario'
// })
// Alumno.belongsToMany(Usuario, {through: 'UsuarioAlumno'})
// Usuario.belongsToMany(Alumno, {through: 'UsuarioAlumno'})

// Pago.belongsToMany(Usuario, {through: 'UsuarioPago'})
// Usuario.belongsToMany(Pago, {through: 'UsuarioPago'})
// ConceptoPago.hasMany(Pago,{
//   foreignKey: 'idConceptoPago'
// })

// Alumno.belongsToMany(Notificacion, {through: 'NotificacionAlumno'})
// Notificacion.belongsToMany(Alumno, {through: 'NotificacionAlumno'})

// TipoNotificacion.hasMany(Notificacion,{
//   foreignKey: 'idTipoNotificacion'
// })

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
