import * as functions from "firebase-functions";
import * as express from "express";
import { addPost, editPost, deletePost } from "./postController/postController";

const app = express();

app.get("/", (req, res) => res.status(200).send("Hello World"));

app.post('/add', addPost)

app.patch('/:postId', editPost)
app.delete('/:postId', deletePost)

exports.api = functions.region("europe-west1").https.onRequest(app);
