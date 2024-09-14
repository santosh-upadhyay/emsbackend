const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  const { name, description, date, time, location } = req.body;
  try {
    const newEvent = new Event({ name, description, date, time, location, createdBy: req.user.id });
    const event = await newEvent.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('attendees', 'name');
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (event.createdBy.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

    const { name, description, date, time, location } = req.body;
    event.name = name || event.name;
    event.description = description || event.description;
    event.date = date || event.date;
    event.time = time || event.time;
    event.location = location || event.location;

    await event.save();
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    if (event.createdBy.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

    await event.remove();
    res.status(200).json({ message: 'Event removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.rsvpToEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (event.attendees.includes(req.user.id)) return res.status(400).json({ message: 'Already RSVPed' });

    event.attendees.push(req.user.id);
    await event.save();
    res.status(200).json({ message: 'RSVP successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAttendees = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('attendees', 'name email');
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(event.attendees);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
