import { Request, Response, Router } from "express";
import auth from "../middleware/auth";
import Post from "../entities/Post";
import Sub from "../entities/Sub";
import Comment from "../entities/Comment";
import user from "../middleware/user";

const createPost = async (req: Request, res: Response) => {
  const { title, body, sub } = req.body;

  const user = res.locals.user;

  if (title.trim() === "")
    return res.status(400).json({ title: "Title cannot be empty" });

  try {
    const subRecord = await Sub.findOneOrFail({ name: sub });
    const post = new Post({ title, body, user, sub: subRecord });
    await post.save();

    return res.status(201).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getPosts = async (_: Request, res: Response) => {
  try {
    const posts = await Post.find({
      order: { createdAt: "DESC" },
      relations: ["sub", "votes", "comments"],
    });

    if (res.locals.user) {
      posts.forEach((p) => {
        p.setUserVote(res.locals.user);
      });
    }

    return res.json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getPost = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;

  try {
    const posts = await Post.findOneOrFail(
      { identifier, slug },
      { relations: ["sub", "votes"] }
    );

    return res.json(posts);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "Post not found" });
  }
};

const commentOnPost = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;
  const body = req.body.body;
  const user = res.locals.user;

  try {
    const post = await Post.findOneOrFail({
      identifier,
      slug,
    });

    const comment = new Comment({ body, user, post });
    await comment.save();

    return res.json(comment);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const router = Router();
router.post("/", user, auth, createPost);
router.get("/", user, getPosts);
router.get("/:identifier/:slug", user, getPost);
router.post("/:identifier/:slug/comments", user, auth, commentOnPost);

export default router;
