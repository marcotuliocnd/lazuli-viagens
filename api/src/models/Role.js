import { Schema, model } from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import mongooseSlugPlugin from 'mongoose-slug-plugin';

const Role = new Schema(
  {
    name: String,
    slug: String,
    description: String,
  },
  {
    timestamps: true,
  },
);

Role.plugin(mongooseDelete);
Role.plugin(mongooseSlugPlugin, { tmpl: '<%=name%>' });

export default model('roles', Role);
