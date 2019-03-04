import * as mongoose from 'mongoose';
import { IBookModel } from '../../../shared/models/book.model';

const Schema = mongoose.Schema;
interface IBookEntity extends IBookModel, mongoose.Document { }
export const BookSchema = new Schema({
    title: {
        type: String,
        required: 'Enter a title'
    },
    authorId: {
        type: String,
        required: 'Select author please'
    }
});
export const BookRepository = mongoose.model<IBookEntity>('Book', BookSchema);