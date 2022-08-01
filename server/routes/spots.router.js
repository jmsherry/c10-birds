import path from 'path';
import express from 'express';

import {
  getSpots,
  addSpot,
  updateSpot,
  removeSpot,
  // getOwnSpots,
  // addOwnSpot,
  // updateOwnSpot,
  // removeOwnSpot,
} from "../controllers/spots.controller.js";

const router = express.Router();

router
  .get(
    "/:id?",
    getSpots
  )
  .post("/", addSpot)
  .put("/:id", updateSpot)
  .delete("/:id", removeSpot)
  

export default router;