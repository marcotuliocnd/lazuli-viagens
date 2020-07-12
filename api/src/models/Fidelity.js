import { Schema, model } from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import mongooseSlugPlugin from 'mongoose-slug-plugin';

const Fidelity = new Schema(
  {
    name: String,
    slug: String,
    description: String,
  },
  {
    timestamps: true,
  },
);

Fidelity.plugin(mongooseDelete);
Fidelity.plugin(mongooseSlugPlugin, { tmpl: '<%=name%>' });

export default model('fidelities', Fidelity);
