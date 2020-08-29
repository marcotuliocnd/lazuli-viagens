import { Schema, model } from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const User = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    cpf: {
      type: String,
      required: true,
    },
    rg: {
      type: String,
      required: true,
    },
    cellphone: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    birthdate_at: {
      type: Date,
      required: true,
    },
    passport_number: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
    },
    fidelity: {
      type: Schema.Types.ObjectId,
      ref: 'fidelities',
      required: false,
    },
    fidelity_level: {
      type: String,
      required: false,
    },
    fidelity_level_next: {
      type: String,
      required: false,
    },
    fidelity_level_last: {
      type: String,
      required: false,
    },
    fidelity_started_at: {
      type: Date,
      required: false,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: 'roles',
      required: true,
    },
    value: {
      type: String,
      required: false,
    }
  },
  {
    timestamps: true,
    selectPopulatedPaths: true,
    toJSON: { virtuals: true },
  },
);

User.plugin(mongooseDelete, { deletedAt: true });

User
  .virtual('avatar_url')
  .get(function () {
    return (this.avatar ? `${process.env.BASE_URL}/public/avatar/${this.avatar}` : null);
  });

export default model('users', User);
