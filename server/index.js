import express from 'express'
import mongoose from 'mongoose'
import { PORT, MONGODBURL } from './config.js';
import { error } from 'console';
import { Book } from './models/bookModel.js';
import bookRoute from './routes/booksRoutes.js'
import cors from 'cors';

const app = express();

// MIDDLEWARE FOR PARSING THE REQUEST BODY
app.use(express.json());

// MIDDLEWARE FOR HANDLING CORS POLICY
// METHOD 1
app.use(cors());
// METHOD 2
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Hello MERN Stack");
});

app.use('/books', bookRoute);

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