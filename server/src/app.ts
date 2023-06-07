import express from "express"
import cors from "cors";
import { Request, Response, NextFunction } from "express";
import ProfileRoutes from "./Routes/profileRoutes"
import RepoRoutes from "./Routes/repoRoutes"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions: cors.CorsOptions = {
    origin: true,
    credentials: true
}

app.use(cors(corsOptions));

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin as string);
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );

    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE'
    );
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
})

app.use("/user", ProfileRoutes);
app.use("/repo", RepoRoutes);

app.get("/api", (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    return res.status(200).send({ message: "happy request" });
})

export default app;