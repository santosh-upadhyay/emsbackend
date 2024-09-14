const express = require('express');
const router = express.Router();
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  rsvpToEvent,
  getAttendees,
} = require('../controllers/eventController');
const auth = require('../middleware/auth');

router.post('/', auth, createEvent);
router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.put('/:id', auth, updateEvent);
router.delete('/:id', auth, deleteEvent);
router.post('/:id/rsvp', auth, rsvpToEvent);
router.get('/:id/attendees', getAttendees);

module.exports = router;
