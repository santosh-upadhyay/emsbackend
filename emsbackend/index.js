const express = require('express');
const connectDB = require('./config/db');
const app = express();

require('dotenv').config();
connectDB();

app.use(express.json({ extended: false }));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
