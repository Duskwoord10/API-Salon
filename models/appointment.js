import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Appointment = sequelize.define('Appointment', {
  nombres: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATEONLY, // Guarda la fecha en formato YYYY-MM-DD
    allowNull: false
  },
  hora: {
    type: DataTypes.STRING, // Guarda la hora en formato 12 horas (AM/PM)
    allowNull: false
  }
  
});

(async () => {
  await sequelize.sync({ alter: true });
})();

export default Appointment;
