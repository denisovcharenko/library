import { Response } from 'express';
import {RequestModel} from '../middlewares/authMiddleware'
import { AuthorRepository } from '../repositories/authorRepository';

interface GetByIdAuthorParams{
    authorId:number;
}

interface DeleteAuthorParams{
    authorId:number;
}

interface UpdateAuthorParams{
    authorId:number;
}

export class AuthorController{

    public add (req: RequestModel<{}>, res: Response) {
        let newAuthor = new AuthorRepository(req.body);
    
        newAuthor.save((err, author) => {
            if (err) return res.status(500).send('Error on the server.');
            res.json(author);
        });
    }

    public get (req: RequestModel<{}>, res: Response) {
        AuthorRepository.find({}, (err, author) => {
            if (err) return res.status(500).send('Error on the server.');
            res.json(author);
        });
    }

    public getById (req: RequestModel<GetByIdAuthorParams>, res: Response) {           
        AuthorRepository.findById(req.params.authorId, (err, author) => {
            if (err) return res.status(500).send('Error on the server.');
            res.json(author);
        });
    }

    public update (req: RequestModel<UpdateAuthorParams>, res: Response) {           
        AuthorRepository.findOneAndUpdate({ _id: req.params.authorId }, req.body, { new: true }, (err, author) => {
            if (err) return res.status(500).send('Error on the server.');
            res.json(author);
        });
    }

    public delete (req: RequestModel<DeleteAuthorParams>, res: Response) {           
        AuthorRepository.remove({ _id: req.params.authorId }, (err) => {
            if (err) return res.status(500).send('Error on the server.');
            res.json({ message: 'Successfully deleted contact!'});
        });
    }
    
}