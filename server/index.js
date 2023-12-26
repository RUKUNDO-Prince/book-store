import express from 'express'
import mongoose from 'mongoose'
import { PORT, MONGODBURL } from './config.js';
import { error } from 'console';
import { Book } from './models/bookModel.js';

const app = express();

// MIDDLEWARES FOR PARSING THE REQUEST BODY
app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Hello MERN Stack");
});



mongoose
    .connect(MONGODBURL)
    .then((result) => {
        console.log('App successfully connected to the database');
        
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    }).catch((err) => {
       console.log(error); 
    });