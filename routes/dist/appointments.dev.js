"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _appointmentsController = require("../controllers/appointmentsController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/citas', _appointmentsController.createAppointment);
router.get('/citas', _appointmentsController.getAllAppointments);
router.get('/citas/:id', _appointmentsController.getAppointmentById);
router.put('/citas/:id', _appointmentsController.updateAppointment);
router["delete"]('/citas/:id', _appointmentsController.deleteAppointment);
var _default = router;
exports["default"] = _default;