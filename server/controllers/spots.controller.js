import Spot from "../models/spots/spots.model.js";
// const { errorHandler } = require("./utils");
// const logger = require("./../logger");

function errorHandler (res, err) {
  console.log(err);
  res.status(500).send(err);
}

export function getSpots(req, res) {
  let query = {};
  if (req.params.id) {
    query._id = req.params.id;
  }
  Spot.find(query)
    .populate("bird")
    .exec((err, spots) => {
      if (err) return errorHandler(res, err);
      if (req.params.id && spots.length === 0)
        return res.status(404).send({ message: "No spot with that ID" });
      return res.status(200).json(spots);
    });
}

export function getOwnSpots(req, res) {
  let query = {
    customerID: req.user.sub, // ensure own spots only
  };

  if (req.params.id) {
    query._id = req.params.id;
  }
  Spot.find(query)
    .populate("bird")
    .exec((err, spots) => {
      if (err) return errorHandler(res, err);
      if (req.params.id && spots.length === 0)
        return res.status(404).send({ message: "No spot with that ID" });
      return res.status(200).json(spots);
    });
}

export function addSpot(req, res) {
  const spotData = req.body;
  console.log(`spotData`, spotData);
  const newSpot = new Spot(spotData);
  newSpot.save((err, spot) => {
    if (err) return errorHandler(res, err);
    return res.status(201).json(spot);
  });
}

export function addOwnSpot(req, res) {
  // { items: [{}, {}], customerID: '23k42lj34278' }
  const spotData = { ...req.body, customerID: req.user.sub };
  console.log(`spotData ${spotData}`);
  const newSpot = new Spot(spotData);
  newSpot.save((err, spot) => {
    if (err) return errorHandler(res, err);
    return res.status(201).json(spot);
  });
}

export function updateSpot(req, res) {
  Spot.updateOne({ _id: req.params.id }, req.body, function (err, result) {
    if (err) return errorHandler(res, err);
    /// change the object
    // obj.save()
    console.log(`result ${result}`);
    if (result.nModified === 0)
      return res.status(404).send({ message: "No spot with that ID" });
    res.sendStatus(200);
  });
}

export function updateOwnSpot(req, res) {
  Spot.updateOne(
    { _id: req.params.id, owner: req.user.sub },
    req.body,
    function (err, result) {
      if (err) return errorHandler(res, err);
      console.log(`result ${result}`);
      if (result.nModified === 0)
        return res.status(404).send({ message: "No spot with that ID" });
      res.sendStatus(200);
    }
  );
}

export function removeSpot(req, res) {
  const spotId = req.params.id;
  Spot.deleteOne({ _id: spotId }, function (err, report) {
    if (err) return errorHandler(res, err);
    console.log(`report ${report}`);
    if (spotId && report.deletedCount === 0) {
      return res.status(404).send({ message: "No spot with that ID" });
    }
    res.sendStatus(204);
  });
}

export function removeOwnSpot(req, res) {
  const spotId = req.params.id;
  Spot.deleteOne({ _id: spotId, owner: req.user.sub }, function (err, report) {
    if (err) return errorHandler(res, err);
    console.log(`report ${report}`);
    if (spotId && report.deletedCount === 0) {
      return res.status(404).send({ message: "No spot with that ID" });
    }
    res.sendStatus(204);
  });
}
