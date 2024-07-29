import { where } from 'sequelize';
import Appointment from '../models/appointment.js';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

// Cargar el plugin customParseFormat
dayjs.extend(customParseFormat);

// Crear una nueva cita
export const createAppointment = async (req, res) => {
  const { nombres, apellidos, telefono, correo, fecha, hora } = req.body;

  try {
    // Validar y formatear la fecha
    const formattedDate = fecha ? dayjs(fecha, 'YYYY-MM-DD').format('YYYY-MM-DD') : null;
    if (!formattedDate || !dayjs(formattedDate).isValid()) {
      return res.status(400).json({ error: 'Formato de fecha inválido' });
    }

    // Validar y formatear la hora
    const validTimeFormat = /^(1[0-2]|[1-9]) (AM|PM)$/; // Formato h AM/PM
    if (hora && !validTimeFormat.test(hora)) {
      return res.status(400).json({ error: 'Formato de hora inválido' });
    }

    // Convertir la hora a formato de 12 horas con AM/PM
    const formattedHour = hora ? dayjs(`2000-01-01 ${hora}`, 'YYYY-MM-DD h A').format('h A') : null;
    if (hora && !dayjs(`2000-01-01 ${hora}`, 'YYYY-MM-DD h A').isValid()) {
      return res.status(400).json({ error: 'Formato de hora inválido' });
    }

    // Crear la cita con la fecha y hora proporcionadas
    const appointment = await Appointment.create({
      nombres,
      apellidos,
      telefono,
      correo,
      fecha: formattedDate, // Fecha en formato YYYY-MM-DD
      hora: formattedHour, // Hora en formato 12 horas con AM/PM
    });

    // Responder con la cita creada
    res.status(201).json({
      appointment,
    });
  } catch (error) {
    console.error('Error al crear la cita:', error);
    res.status(500).json({ error: 'Error al crear la cita' });
  }
};

// Obtener todas las citas
export const getAllAppointments = async (req, res) => {
  const { fecha, hora } = req.query;

  const query = {
    where: {
      ...(fecha && { fecha }),
      ...(hora && { hora }),
    },
  };

  try {
    const appointments = await Appointment.findAll(query);
    const total_people = appointments.length;
    res.json({ total_people, appointments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener una cita específica por ID
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Actualizar una cita
export const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    await appointment.update(req.body);
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar una cita
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    await appointment.destroy();
    res.json({ message: 'Appointment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
