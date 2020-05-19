const Joi = require("joi");
const mongoose = require("mongoose");
const { userSchema } = require("./user");
const { FlightSchema } = require("./flight");
//const { Flight_details } = require("./flight_details"); ///

const Ticket_info = mongoose.model(
  "ticket_info",

  new mongoose.Schema({
    user: {
      type: userSchema,
      required: true,
    },
    flight_id: {
      type: FlightSchema,
      required: true,
    },

    // flight_departure_datee: {
    //   type: flight_departure_date, // this is right or not ? (FK)
    //   required: true,
    // },
    status: {
      type: Boolean,
      default: false,
      //
    },
  })
);

function validateTicket_info(ticket_info) {
  const schema = {
    userId: Joi.objectId().required(),
    flight_idId: Joi.objectId().required(),
    // flight_departure_dateId: Joi.objectId().required(),
    status: Joi.number().required(),
  };

  return Joi.validate(ticket_info, schema);
}

exports.Ticket_info = Ticket_info;
exports.validate = validateTicket_info;
