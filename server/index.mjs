import express from "express";
import cors from "cors";
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'
import { PORT } from "./config.mjs";

import indexRoutes from "./routes/index.routes.mjs";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));


app.use(cors());
app.use(express.json());

app.use(indexRoutes);
app.use(express.static("public"));

app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);