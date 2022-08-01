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

import { checkJwt } from '../auth_middleware/jwt-checker.js';

const router = express.Router();

router
  .get(
    "/:id?",
    getSpots
  )
  .post("/", checkJwt, addSpot)
  .put("/:id", updateSpot)
  .delete("/:id", removeSpot)
  

export default router;