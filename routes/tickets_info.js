const { Ticket_info, validate } = require("../models/ticket_info.js");
const { Flight } = require("../models/flight");
const { Flight_details } = require("../models/flight_details");
const { User } = require("../models/user");

const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const ticket_info = await Ticket_info.find().sort("name");
  res.send(ticket_info);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  const flight_id = await Flight.findById(req.body.flight_idId);
  // const ticket_info2 = await Ticket_info.findById(
  //   req.body.flight_departuree_dateId
  // );

  if (!user) return res.status(400).send("Invalid user_id.");
  if (!flight_id) return res.status(400).send("Invalid flight_id.");
  // if (!ticket_info2)
  //   return res.status(400).send("Invalid flight_departure_dateId.");

  const ticket_infos = new Ticket_info({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
    },
    flight_id: {
      _id: flight_id._id,
      airline_name: flight_id.airline_name,
      from_location: flight_id.from_location,
      to_location: flight_id.to_location,
      depature_time: flight_id.depature_time,
      arrival_time: flight_id.arrival_time,
      duration: flight_id.duration,
      total_seats: flight_id.total_seats,
    },
    // flight_departure_datee: {
    //   flight_departure_date: flight_departure_datee.flight_departure_date,
    // },
    status: req.body.status,
  });
  await ticket_infos.save();

  res.send(ticket_infos);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  const flight_id = await Flight.findById(req.body.flight_idId);

  if (!user) return res.status(400).send("Invalid user_id.");
  if (!flight_id) return res.status(400).send("Invalid flight_id.");

  const ticket_infos = await Ticket_info.findByIdAndUpdate(
    req.params.id,
    {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
      },
      flight_id: {
        _id: flight_id._id,
        airline_name: flight_id.airline_name,
        from_location: flight_id.from_location,
        to_location: flight_id.to_location,
        depature_time: flight_id.depature_time,
        arrival_time: flight_id.arrival_time,
        duration: flight_id.duration,
        total_seats: flight_id.total_seats,
      },

      status: req.body.status,
    },
    { new: true }
  );

  if (!ticket_infos)
    return res
      .status(404)
      .send("The ticket_info with the given ID was not found.");

  res.send(ticket_infos);
});

router.delete("/:id", async (req, res) => {
  const ticket_info = await Ticket_info.findByIdAndRemove(req.params.id);

  if (!ticket_info)
    return res
      .status(404)
      .send("The ticket_info with the given ID was not found.");

  res.send(ticket_info);
});

router.get("/:id", async (req, res) => {
  const ticket_info = await Ticket_info.findById(req.params.id);

  if (!ticket_info)
    return res
      .status(404)
      .send("The ticket_info with the given ID was not found.");

  res.send(ticket_info);
});

module.exports = router;
