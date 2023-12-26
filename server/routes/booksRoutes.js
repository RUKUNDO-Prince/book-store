import express from 'express'
import { Book } from '../models/bookModel.js';

const router = express.Router()

// ROUTE FOR SAVING A NEW BOOK
router.post('/books', async (request, response) => {
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

// ROUTE TO GET ALL THE BOOKS FROM DB
router.get('/books', async (request, response) => {
    try {
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

// ROUTE TO GET A SINGLE BOOK BY ID
router.get('/books/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const book = await Book.findById(id);

        return response.status(200).json({book});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

// ROUTE TO UPDATE A BOOK
router.put('/books/:id', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: "Send all required fields: title, author and publish year!",
            });
        }

        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: "Book not found." })
        }

        return response.status(200).send({ message: "Book updated successfully" });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// ROUTE TO DELETE A BOOK
router.delete('/books/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: "Book not found!" });
        }

        return response.status(200).send({ message: "Book deleted successfully!" })
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;