import * as mongoose from 'mongoose';
import { IAuthorModel } from '../../../shared/models/author.model';

const Schema = mongoose.Schema;
interface IAuthorEntity extends IAuthorModel, mongoose.Document { }
export const AuthorSchema = new Schema({
    name: {
        type: String,
        required: 'Enter a name'
    }
});
export const AuthorRepository = mongoose.model<IAuthorEntity>('Author', AuthorSchema);