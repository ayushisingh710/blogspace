import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Mongoose connection established");
    });

    connection.on("error", (err) => {
      console.error("Mongoose connection error: ", err);
      process.exit();
    });
  } catch (error) {
    console.error("Something goes wrong");
    console.error(error);
  }
}
