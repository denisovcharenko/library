import * as mongoose from 'mongoose';
import { IUserModel } from '../../../shared/models/user.model';
interface IUserEntity extends IUserModel, mongoose.Document { }
mongoose.model('User', new mongoose.Schema({
  email: String,
  fullName: String,
  password:String
}));

export const UserRepository = mongoose.model<IUserEntity>('User');

