const { Flight, validate } = require("../models/flight");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const flight = await Customer.find().sort("name");
  res.send(flight);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let flight = new Flight({
    airline_name: req.body.airline_name,
    from_location: req.body.from_location,
    to_location: req.body.to_location,
    depature_time: req.body.depature_time,
    arrival_time: req.body.arrival_time,
    duration: req.body.duration,
    total_seats: req.body.total_seats,
  });
  flight = await flight.save();

  res.send(flight);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const flight = await Flight.findByIdAndUpdate(
    req.params.id,
    {
      airline_name: req.body.airline_name,
      from_location: req.body.from_location,
      to_location: req.body.to_location,
      depature_time: req.body.depature_time,
      arrival_time: req.body.arrival_time,
      duration: req.body.duration,
      total_seats: req.body.total_seats,
    },
    { new: true }
  );

  if (!flight)
    return res.status(404).send("The flight with the given ID was not found.");

  res.send(flight);
});

router.delete("/:id", async (req, res) => {
  const flight = await Flight.findByIdAndRemove(req.params.id);

  if (!flight)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(flight);
});

router.get("/:id", async (req, res) => {
  const flight = await Flight.findById(req.params.id);

  if (!flight)
    return res.status(404).send("The flight with the given ID was not found.");

  res.send(flight);
});

module.exports = router;
