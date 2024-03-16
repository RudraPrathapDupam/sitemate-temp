import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import https from 'https';
// import { readFileSync } from 'fs';
// import { resolve, join } from 'path';

import routes from './routes/index.js';
import { seedDb } from './utils/seed.js';
import cors from "cors";

const app = express();

// Bodyparser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const isProduction = process.env.NODE_ENV === 'production';

// DB Config
const dbConnection = isProduction ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV;

// Connect to Mongo
mongoose
  .connect(dbConnection, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('MongoDB Connected...');
    seedDb();
  })
  .catch((err) => console.log(err));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var corsOptions = {
  origin: "http://localhost:3080",
  methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"]
};
app.use(cors(corsOptions));

// Use Routes
app.use('/', routes);

// app.use('/public/images', express.static(join(__dirname, '../public/images')));

// Serve static assets if in production
if (isProduction) {
  const port = process.env.PORT || 80;
  app.listen(port, () => console.log(`Server started on port ${port}`));
} else {
  const port = process.env.PORT || 5000;
  const httpsOptions = {}
  const server = https.createServer(httpsOptions, app).listen(port, () => {
    console.log('https server running at ' + port);
  });
}
