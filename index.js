import express from 'express';
import bodyParser from 'body-parser';
import appointmentRoutes from './routes/appointments.js';
import sequelize from './db.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', appointmentRoutes);

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  try {
    await sequelize.sync();
    console.log('Database connected and synchronized');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
