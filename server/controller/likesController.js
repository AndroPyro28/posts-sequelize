const { Likes } = require("../models")
module.exports.likeorDislikePost = async (req, res) => {
    const currentUser = req.currentUser;
    const { PostId } = req.body;
    const { id } = currentUser;

    const isLiked = await Likes.findOne({
        where: {
            PostId: PostId,
            UserId: id,
        }
    });

    if (!isLiked) { // if it is not already liked then we will like it and query it to the database
        const resDB = await Likes.create({
            PostId,
            UserId: id
        })
        return res.send("liked the post")
    }
    else { // else we will unliked it and destroy it in the database
        const resDB = await Likes.destroy({
            where: {
                PostId,
                UserId: id
            }
        })
        return res.send("Unliked the post")
    }
}