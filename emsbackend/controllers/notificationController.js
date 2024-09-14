const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  
});

exports.sendEmailNotification = async (to, subject, text) => {
  try {

  } catch (err) {
    console.error('Failed to send email:', err);
  }
};
