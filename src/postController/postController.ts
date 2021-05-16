import { Response } from 'express'
import { db } from '../config/firebase'

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

export { addPost, editPost }