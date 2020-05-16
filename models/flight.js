const Joi = require("joi");
const mongoose = require("mongoose");
const FlightSchema = new mongoose.Schema({
  airline_name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  from_location: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  to_location: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  depature_time: {
    ////
    // type: Date,
    type: String,
    trim: true,
  },
  arrival_time: {
    ////
    // type: Date,
    type: String,
    trim: true,
  },
  duration: {
    //////
    type: Number,
    min: 0,
  },
  total_seats: {
    //////
    type: Number,
    min: 0,
  },
});
const Flight = mongoose.model("Flight", FlightSchema);

function validateFlight(flight) {
  const schema = {
    airline_name: Joi.string().min(5).max(50).required(),
    from_location: Joi.string().min(5).max(50).required(),
    to_location: Joi.string().min(5).max(50).required(),
    depature_time: Joi.string().min(1).max(50).required(), ///
    arrival_time: Joi.string().min(1).max(50).required(), ///
    duration: Joi.number().min(0).required(),
    total_seats: Joi.number().min(0).required(),
  };

  return Joi.validate(flight, schema);
}

exports.Flight = Flight;
exports.FlightSchema = FlightSchema;
exports.validate = validateFlight;
