const { Router} = require("express");
const { authMiddleware } = require("../middleware/authmiddleware");
const { createPost, getPosts, deletePosts, updatePost } = require("../controllers/postController");
const { postValidations, updatePostValidations } = require("../validations/expressValidator");
const router = Router();
router.post("/create-post", [authMiddleware, postValidations], createPost);
router.get("/get-posts", authMiddleware, getPosts);
router.get("/delete-post/:id", authMiddleware, deletePosts);

router.put("/update-post",[authMiddleware, updatePostValidations], updatePost);


module.exports = router;