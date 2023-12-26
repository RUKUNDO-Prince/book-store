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

// ROUTE FOR SAVING A NEW BOOK
app.post('/books', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: "Send all required fields: title, author and publish year!",
            });
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook);
        response.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

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