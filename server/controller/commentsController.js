const { Comments } = require('../models');

module.exports.getCommentById = async (req, res) => {
    const postId = req.params.postId;

    const comments = await Comments.findAll({ // getting all the comments by a postId, it will returns a array of objects
        where: {
            PostId: postId
        }
    })

    return res.status(200).json(comments);
}

module.exports.createComment = async (req, res) => {

    //creating comment
    const { commentBody, PostId } = req.body.values;
    const { username, id} = req.currentUser;

    const resDb = await Comments.create({ //inserting a comment to a post
        commentBody,
        PostId,
        username,
        UserId: id
    });

    return res.status(200).json({
        comment: resDb,
        success: true
    });
}

module.exports.deleteComment = async (req, res) => {
    const { id } = req.params;
    // deleting a comment by id
    const resDB = await Comments.destroy({
        where: {
            id
        }
    })
    console.log(resDB);
    return res.status(200).json({ resDB, success: true })
}