import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

require('dotenv').config()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(peocess.env.DB_CONNECT, {useNewUrlParser: true}, function(err){
  if(err){
    console.log('Erro connect to DB', err);
  }
  console.log("Connected to DB");
});

import routes from './routes';
routes(app)

app.listen(5000, console.log("App listening on port 5000"));