const express = require('express');
const router = express.Router();
const { sendEmailNotification } = require('../controllers/notificationController');

// Placeholder route for notifications
router.post('/send', (req, res) => {
  const { to, subject, text } = req.body;
  sendEmailNotification(to, subject, text);
  res.status(200).json({ message: 'Notification sent' });
});

module.exports = router;
