import { Request, Response } from 'express';
import {RequestModel} from '../middlewares/authMiddleware'
import { BookRepository } from '../repositories/bookRepository';

interface GetByAuthorIdBookParams{
    authorId:number;
}

interface GetBookParams{
}

interface GetByIdBookParams{
    bookId:number;
}

interface DeleteBookParams{
    bookId:number;
}

interface UpdateBookParams{
    bookId:number;
}

export class BookController{

    public add (req: RequestModel<{}>, res: Response) {       
        let newBook = new BookRepository(req.body);
        newBook.save((err, book) => {
            if (err) return res.status(500).send('Error on the server.');  
            res.json(book);
        });
    }

    public getByAuthorId (req: RequestModel<GetByAuthorIdBookParams>, res: Response) {
        let authorId = req.params.authorId;
        BookRepository.find({ authorId :authorId}, (err, book) => {
            if (err) return res.status(500).send('Error on the server.');
            res.json(book);
        });
    }

    public get (req: RequestModel<GetBookParams>, res: Response) {
        BookRepository.find({}, (err, book) => {
            if (err) return res.status(500).send('Error on the server.');
            res.json(book);
        });
    }


    public getById (req: RequestModel<GetByIdBookParams>, res: Response) {           
        BookRepository.findById(req.params.bookId, (err, book) => {
            if (err) return res.status(500).send('Error on the server.');
            res.json(book);
        });
    }

    public update (req: RequestModel<DeleteBookParams>, res: Response) {           
        BookRepository.findOneAndUpdate({ _id: req.params.bookId }, req.body, { new: true }, (err, contact) => {
            if (err) return res.status(500).send('Error on the server.');
            res.json(contact);
        });
    }

    public delete (req: RequestModel<UpdateBookParams>, res: Response) {           
        BookRepository.remove({ _id: req.params.bookId }, (err) => {
            if (err) return res.status(500).send('Error on the server.');
            res.json({ message: 'Successfully deleted contact!'});
        });
    }
    
}