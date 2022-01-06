import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app = express();

app.use(bodyParser.json({ limit: '30mg', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mg', extended: true }));
app.use(cors());
app.use('/posts', postRoutes);

const CONNECTION_URL =
	'mongodb://anthony:anthony123@cluster0-shard-00-00.ovnfp.mongodb.net:27017,cluster0-shard-00-01.ovnfp.mongodb.net:27017,cluster0-shard-00-02.ovnfp.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-u6722y-shard-0&authSource=admin&retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose
	.connect(CONNECTION_URL)
	.then(() =>
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
	)
	.catch((error) => console.log(error.message));
