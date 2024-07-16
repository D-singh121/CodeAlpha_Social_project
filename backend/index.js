import dotenv from 'dotenv'
import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import db_Connection from './src/database/DB_Connection.js';

import user_Routes from './src/routes/user_Routes.js'
import tweet_Routes from './src/routes/tweet_Routes.js'

dotenv.config({ path: ".env" })
const PORT = process.env.PORT || 8080
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173"

db_Connection();  // connecting database 

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());

const corsOptions = {
	origin: FRONTEND_URL,
	method: ["GET", "POST", "DELETE", "PUT", "PATCH"],
	credentials: true
}
app.use(cors(corsOptions));


// Api demo
app.get('/', (req, res) => {
	res.send("Hellow,we are ready")
})

// api grouping
app.use('/api/v1/users', user_Routes)
app.use('/api/v1/tweet', tweet_Routes)

//Port Listening
app.listen(PORT, () => {
	console.log(`Server Listning on port ${PORT}`);
})

export default app;