import mongoose from 'mongoose'
import dotenv from "dotenv";

dotenv.config();
const MONGODB_URL = process.env.MONGODB_URL

const db_Connection = async () => {
	try {
		const connectionInstance = await mongoose.connect(MONGODB_URL)
		console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
	} catch (error) {
		console.log(`MONGODB connection FAILED : ${error}`);
		process.exit(1)
	}
}

export default db_Connection;
