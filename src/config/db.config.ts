import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../middleware/logger";
import { DB_URI } from "../serviceUrl";

const ConnectDB = async():Promise<void>=>{
    try {
        if (DB_URI == undefined) throw new Error("DB_URI is undefined, please check .env file")
        await mongoose.connect(DB_URI)
        logger.info("Successfully connected to DB")
    } catch (error) {
        console.log(error);
        logger.error("Error connecting to DB")
    }
}




export default ConnectDB;