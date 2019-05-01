const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  ltv: {
    type: Number,
    required: true
  },
  activated: {
    type: Boolean, 
    required: true
  },
  preference: {
    type: String,
    required: true
  }
}, { timestamps: true }
);

module.exports = mongoose.model('Customer', customerSchema);
