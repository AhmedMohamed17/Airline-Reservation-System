//const { Flight, validate } = require("../models/flight");
const { Flight_details, validate } = require("../models/flight_details");
const { Flight, FlightSchema } = require("../models/flight");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const flight_details = await Flight_details.find().sort("name");
  res.send(flight_details);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const flight = await Flight.findById(req.body.flightId);
  if (!flight) return res.status(400).send("Invalid Flight.");

  const flight_details = new Flight_details({
    flight: {
      _id: flight._id,
      // name: flight.name
    },
    flight_departure_date: req.body.flight_departure_date,
    price: req.body.price,
    available_seats: req.body.available_seats,
  });
  await flight_details.save();

  res.send(flight_details);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const Flight = await Flight.findById(req.body.genreId);
  if (Flight) return res.status(400).send("Invalid Flight.");

  const flight_details = await Flight_details.findByIdAndUpdate(
    req.params.id,
    {
      flight: {
        _id: flight._id,
        // name: flight.name
      },
      flight_departure_date: req.body.flight_departure_date,
      price: req.body.price,
      available_seats: req.body.available_seats,
    },
    { new: true }
  );

  if (!flight_details)
    return res
      .status(404)
      .send("The flight_details with the given ID was not found.");

  res.send(flight_details);
});

router.delete("/:id", async (req, res) => {
  const flight_details = await Flight_details.findByIdAndRemove(req.params.id);

  if (!flight_details)
    return res
      .status(404)
      .send("The flight_details with the given ID was not found.");

  res.send(flight_details);
});

router.get("/:id", async (req, res) => {
  const flight_details = await Flight_details.findById(req.params.id);

  if (!flight_details)
    return res
      .status(404)
      .send("The flight_details with the given ID was not found.");

  res.send(flight_details);
});

module.exports = router;
