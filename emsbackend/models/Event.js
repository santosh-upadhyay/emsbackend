const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: 
  { type: String, 
    required: true
   },
  description: 
  { type: String, 
    required: true 
  },
  date: 
  { 
    type: Date, 
    required: true
   },
  time: 
  { type: String,
     required: true 
    },
  location: 
  { type: String,
     required: true
     },
  attendees: 
  [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    
  },
});

module.exports = mongoose.model('Event', EventSchema);
