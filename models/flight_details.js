const Joi = require("joi");
const mongoose = require("mongoose");
const { FlightSchema } = require("./flight");

const Flight_details = mongoose.model(
  "flight_details",
  new mongoose.Schema({
    flight_departure_date: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    flight: {
      //(FK)
      type: FlightSchema,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      max: 1000,
    },
    available_seats: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
  })
);

function validateFlight(flight_details) {
  const schema = {
    flight_departure_date: Joi.string().min(5).max(50).required(),
    flightId: Joi.objectId().required(),
    price: Joi.number().min(0).required(),
    available_seats: Joi.number().min(0).required(),
  };

  return Joi.validate(flight_details, schema);
}

exports.Flight_details = Flight_details;
exports.validate = validateFlight;
