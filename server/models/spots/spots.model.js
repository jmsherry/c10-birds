import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SpotsSchema = new Schema({
  bird: { type: Schema.Types.ObjectId, ref: "Bird" },
  user: { type: String, required: true },
  datetime: { type: Date, default: Date.now },
});

const Spot = mongoose.model("Spot", SpotsSchema);

export default Spot;
