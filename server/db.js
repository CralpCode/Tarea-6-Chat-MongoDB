import { mongoose } from "mongoose";
import { MONGO_URL } from "./config.js";

export const connectDB = () => {
    try {
        mongoose.set('strictQuery', true);
        mongoose.connect(MONGO_URL);
        console.log('conectando a db')
    } catch (error) {
        console.log(error)
    }
}