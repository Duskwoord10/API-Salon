import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('SalonDB', 'root', 'Albert2004...', {
  host: 'testsalonapi.cr2a8g24okao.us-east-1.rds.amazonaws.com',
  port: 3306, // Specify the port separately
  dialect: 'mysql',
  logging: false,
  ssl:'Amazon RDS'
  
});

export default sequelize;
