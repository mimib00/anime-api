import { Response } from 'express'
import { db } from '../config/firebase'
import * as admin from "firebase-admin"

type PostType = {
    title: string,
    discription: string,
    trailerUrl: string,
    imageUrl: string,
    downloadLinks: string
}

type Request = {
    body: PostType,
    params: { postId: string }

}

const addPost = async (req: Request, res: Response) => {
    const { title, discription, trailerUrl, imageUrl, downloadLinks } = req.body

    try {
        const post = db.collection('Anime').doc()
        const postObject = {
            id: post.id,
            title,
            discription,
            trailerUrl,
            imageUrl,
            downloadLinks: JSON.parse(downloadLinks),
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        }

        post.set(postObject, { merge: true })
        res.status(200).send({ status: 'OK', message: "Anime has been added", data: postObject })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const editPost = async (req: Request, res: Response) => {
    const { body: { title, discription, trailerUrl, imageUrl, downloadLinks }, params: { postId } } = req

    try {
        const post = db.collection('Anime').doc(postId.toString())
        const data = (await post.get()).data() || {}
        const postObject = {
            id: data.id,
            title: title || data.title,
            discription: discription || data.discription,
            trailerUrl: trailerUrl || data.trailerUrl,
            imageUrl: imageUrl || data.imageUrl,
            downloadLinks: JSON.parse(downloadLinks) || JSON.parse(data.downloadLinks),
        }

        await post.update(postObject)
        res.status(200).send({ status: 'OK', message: "Anime has been edited", data: postObject })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const deletePost = async (req: Request, res: Response) => {
    const { postId } = req.params

    try {
        const post = db.collection('Anime').doc(postId)
        await post.delete()
        res.status(200).send({ status: 'OK', message: "Anime has been deleted" })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getPosts = async (req: Request, res: Response) => {
    try {
        const allPosts: PostType[] = []
        const snap = await db.collection('Anime').limit(15).orderBy('createdAt', 'asc').get()
        snap.forEach((doc: any) => allPosts.push(doc.data()))
        return res.status(200).json({ status: 'OK', data: allPosts })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const searchPost = async (req: any, res: Response) => {
    const query = req.query.q
    console.log(query)
    try {
        const searchPosts: PostType[] = []
        const snap = await db.collection('Anime').limit(10).where('title', '==', query).orderBy('createdAt', 'asc').get()
        snap.forEach((doc: any) => searchPosts.push(doc.data()))
        return res.status(200).json({ status: 'OK', data: searchPosts })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export { addPost, editPost, deletePost, getPosts, searchPost }