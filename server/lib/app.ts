import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/routes";
import * as mongoose from "mongoose";
import * as cors from "cors";
import { environment } from "./environment/environment";

class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();
    public mongoUrl: string =environment().mongoDbConnectionString;

    constructor() {
        this.app = express();
        this.app.use(cors());
        this.config();        
        this.routePrv.routes(this.app);     
        this.mongoSetup();
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files 
        this.app.use(express.static('public'));
    }

    private mongoSetup(): void{
        mongoose.connect(this.mongoUrl, {useNewUrlParser: true});        
    }

}

export default new App().app;