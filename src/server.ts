import express from "express";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import swaggerSpec, { swaggerUIOptions } from "./config/swagger";
import router from "./router";
import db from "./config/db";

// not priority imports
import colors from "colors";

// Connect to the database and log the connection status

async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    // console.log(colors.green.bold("Database connected!"));
  } catch (error) {
    // console.log(error);
    // console.log(colors.red.bold("Unable to connect to the database:"));
  }
}

connectDB();
// Create a new express app instance
const server = express();

// Enable CORS for all requests
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("CORS Error"));
    }
  },
};

server.use(cors(corsOptions));

// read json data
server.use(express.json());

server.use(morgan("dev"));
server.use("/api/products", router);

server.use(
  "/docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec, swaggerUIOptions)
);

// End line
export default server;
export { connectDB };
