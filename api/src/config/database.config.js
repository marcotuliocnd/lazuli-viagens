import mongoose from 'mongoose';

export default async function databaseFactory() {
  try {
    await mongoose.connect(
      process.env.DB_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
      },
    );
    console.log('> MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
