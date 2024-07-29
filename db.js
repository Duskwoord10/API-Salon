import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('Salon', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging:false
});

export default sequelize;
