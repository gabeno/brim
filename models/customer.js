// customer.js

var 
  mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// create schema
var customerSchema = new Schema({
  name: String,
  email: String,
  createdAt: { type: Date, default: Date.now },
  emailStatus: { type: String, default: 0 }
}, { collection: 'earlyUsers' });

// create model
var Customer = mongoose.model('Customer', customerSchema);

// export model
module.exports = Customer;