import "dotenv/config";
import mongoose from "mongoose";

export default async function connectToDatabase() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("Conexión a la Base de Datos establecida.");
  } catch (error) {
    // console.error("Error al conectar a la Base de Datos:", error);
    console.error("Error al conectar a la Base de Datos:");
  }
}
