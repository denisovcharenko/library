
import { RequestModel, RequestPost } from '../middlewares/authMiddleware';
import { Response } from 'express';
import * as bcryptjs from "bcryptjs";
import * as jsonwebtoken from "jsonwebtoken";
import { authConfig } from "../config"
import { UserRepository } from '../repositories/userRepository';

export class AuthController {

    public register(req: RequestPost<{ fullName: string, email: string, password: string }>, res: Response) {
        var hashedPassword = bcryptjs.hashSync(req.body.password, 8);

        UserRepository.create({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashedPassword
        },
            (err, user) => {
				console.log(err);
                if (err) return res.status(500).send("There was a problem registering the user.")
                // create a token
                var token = jsonwebtoken.sign({ id: user._id, fullName: user.fullName, email: user.email }, authConfig.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({ auth: true, token: token, user: user });
            });
    }

    public login(req: RequestPost<{ login: string, password: string }>, res: Response) {
        UserRepository.findOne({ email: req.body.login }, (err, user) => {
            if (err) return res.status(500).send('Error on the server.');
            if (!user) return res.status(400).send('No user found.');
            var passwordIsValid = bcryptjs.compareSync(req.body.password, user.password);
            if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
            var token = jsonwebtoken.sign({ id: user._id, fullName: user.fullName, email: user.email }, authConfig.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token, user: user });
        });
    }

    public profile(req: RequestModel<{}>, res: Response) {
        res.status(200).send(req.user);
    }
}
