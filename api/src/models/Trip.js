import { Schema, model } from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const Trip = new Schema(
  {
    from: String,
    to: String,
    started_at: Date,
    finished_at: Date,
    payment_at: Date,
    payment_method: String,
    value: Number,
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    more: String,
  },
  {
    timestamps: true,
    selectPopulatedPaths: true,
    toJSON: { virtuals: true },
  },
);

Trip.plugin(mongooseDelete);

export default model('trips', Trip);
