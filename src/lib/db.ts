import mongoose, {MongooseOptions} from "mongoose";


const connectDb = async (url: string | undefined = process.env.MONGODB_URI) => {

  if (mongoose.connection.readyState === 0) {
    if (!url) {
      throw new Error("MongoURI is missing.");
    }

    const mongooseOpts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: true
    } as MongooseOptions

    await mongoose.connect(url!, mongooseOpts)
  }

  return mongoose.connection;
}

export default connectDb;