import * as functions from "firebase-functions";
import * as express from "express";
import { addPost, editPost } from "./postController/postController";

const app = express();

app.get("/", (req, res) => res.status(200).send("Hello World"));

app.post('/add', addPost)

app.patch('/update/:postId', editPost)

exports.api = functions.region("europe-west1").https.onRequest(app);
