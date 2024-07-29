import express from 'express';
import { createAppointment, getAllAppointments, getAppointmentById, updateAppointment, deleteAppointment } from '../controllers/appointmentsController.js';

const router = express.Router();

router.post('/citas', createAppointment);
router.get('/citas', getAllAppointments);
router.get('/citas/:id', getAppointmentById);
router.put('/citas/:id', updateAppointment);
router.delete('/citas/:id', deleteAppointment);

export default router;
