import Bird from "../models/birds/bird.model.js";
// const { errorHandler } = require("./utils");
// const logger = require("./../logger");

function errorHandler (res, err) {
  console.log(err);
  res.status(500).send(err);
}

export function getBirds(req, res) {
  let query = {};
  if (req.params.id) {
    query._id = req.params.id;
  }
  Bird.find(query)
    // .populate("items")
    .exec((err, birds) => {
      if (err) return errorHandler(res, err);
      if (req.params.id && birds.length === 0)
        return res.status(404).send({ message: "No bird with that ID" });
      return res.status(200).json(birds);
    });
}

export function getOwnBirds(req, res) {
  let query = {
    customerID: req.user.sub, // ensure own birds only
  };

  if (req.params.id) {
    query._id = req.params.id;
  }
  Bird.find(query)
    // .populate("items")
    .exec((err, birds) => {
      if (err) return errorHandler(res, err);
      if (req.params.id && birds.length === 0)
        return res.status(404).send({ message: "No bird with that ID" });
      return res.status(200).json(birds);
    });
}

export function addBird(req, res) {
  const birdData = req.body;
  console.log(`birdData`, birdData);
  const newBird = new Bird(birdData);
  newBird.save((err, bird) => {
    if (err) return errorHandler(res, err);
    return res.status(201).json(bird);
  });
}

export function addOwnBird(req, res) {
  // { items: [{}, {}], customerID: '23k42lj34278' }
  const birdData = { ...req.body, customerID: req.user.sub };
  console.log(`birdData ${birdData}`);
  const newBird = new Bird(birdData);
  newBird.save((err, bird) => {
    if (err) return errorHandler(res, err);
    return res.status(201).json(bird);
  });
}

export function updateBird(req, res) {
  Bird.updateOne({ _id: req.params.id }, req.body, function (err, result) {
    if (err) return errorHandler(res, err);
    /// change the object
    // obj.save()
    console.log(`result ${result}`);
    if (result.nModified === 0)
      return res.status(404).send({ message: "No bird with that ID" });
    res.sendStatus(200);
  });
}

export function updateOwnBird(req, res) {
  Bird.updateOne(
    { _id: req.params.id, owner: req.user.sub },
    req.body,
    function (err, result) {
      if (err) return errorHandler(res, err);
      console.log(`result ${result}`);
      if (result.nModified === 0)
        return res.status(404).send({ message: "No bird with that ID" });
      res.sendStatus(200);
    }
  );
}

export function removeBird(req, res) {
  const birdId = req.params.id;
  Bird.deleteOne({ _id: birdId }, function (err, report) {
    if (err) return errorHandler(res, err);
    console.log(`report ${report}`);
    if (birdId && report.deletedCount === 0) {
      return res.status(404).send({ message: "No bird with that ID" });
    }
    res.sendStatus(204);
  });
}

export function removeOwnBird(req, res) {
  const birdId = req.params.id;
  Bird.deleteOne({ _id: birdId, owner: req.user.sub }, function (err, report) {
    if (err) return errorHandler(res, err);
    console.log(`report ${report}`);
    if (birdId && report.deletedCount === 0) {
      return res.status(404).send({ message: "No bird with that ID" });
    }
    res.sendStatus(204);
  });
}
