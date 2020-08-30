import { Schema, model } from 'mongoose';

const Testimonial = new Schema(
  {
    title: String,
    description: String,
    image: String,
  },
  {
    timestamps: true,
    timestamps: true,
    selectPopulatedPaths: true,
    toJSON: { virtuals: true },
  },
);

Testimonial
  .virtual('image_url')
  .get(function () {
    return (this.image ? `${process.env.BASE_URL}/public/${this.image}` : null);
  });

export default model('testimonials', Testimonial);
