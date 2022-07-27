import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BirdSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Bird = mongoose.model("Bird", BirdSchema);

export default Bird;