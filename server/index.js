import express from 'express'
import { Mongoose } from 'mongoose';
import { PORT, MONGODBURL } from './config.js';
import { error } from 'console';

const app = express();

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Hello MERN Stack");
});

app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
});

Mongoose
    .connect(MONGODBURL)
    .then((result) => {
        console.log('App successfully connected to the database');
    }).catch((err) => {
       console.log(error); 
    });