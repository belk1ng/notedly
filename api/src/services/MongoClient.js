import mongoose from "mongoose";

class MongoClient {
  constructor(host) {
    this.host = host;

    mongoose.connection.on("connected", () => {
      console.log("✅ Successfully connected to MongoDB");
    });

    mongoose.connection.on("error", (err) => {
      console.log(
        [
          "🚫 MongoDB connection error. Please make sure MongoDB is running.",
          err,
        ].join("\n"),
      );
    });
  }

  async connect() {
    await mongoose.connect(this.host);
  }

  async disconnect() {
    await mongoose.connection.close();
  }
}

export default new MongoClient(process.env.DB_HOST);
