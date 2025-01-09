import mongoose from "mongoose";
export default async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('database connection successful');

  } catch (error) {
    console.log('error connecting' + error.message);
    process.exit(1);
  }
}

