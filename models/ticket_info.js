const Joi = require("joi");
const mongoose = require("mongoose");
const { userSchema } = require("./user");
const { Flight } = require("./flight");
const { Flight_details } = require("./flight_details"); ///

const Ticket_info = mongoose.model(
  "ticket_info",

  new mongoose.Schema({
    user_id: {
      type: userSchema,
      required: true,
    },
    flight_id: {
      type: Flight,
      required: true,
    },

    flight_departure_date: {
      type: flight_departure_date, // this is right or not ? (FK)
      required: true,
    },
    status: {
      type: boolean, //
      required: true,
      min: 0,
      max: 255,
    },
  })
);

function validateTicket_info(ticket_info) {
  const schema = {
    status: Joi.number().required(),
  };

  return Joi.validate(ticket_info, schema);
}

exports.Ticket_info = Ticket_info;
exports.validate = validateTicket_info;
