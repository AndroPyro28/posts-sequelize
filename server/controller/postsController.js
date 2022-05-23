const { Posts, Likes } = require('../models');

module.exports.getPosts = async (req, res) => {
    
    const allData = await Posts.findAll({ include: [Likes] });
    // console.log(allData)
    return res.status(200).json(allData);
}

module.exports.createPost = async (req, res) => {
    const post = req.body.values;
    const { currentUser } = req;
    post.username = currentUser.username;
    post.UserId = currentUser.id;
    const resDB = await Posts.create(post);

    return res.status(200).json({
        resDB,
        success: true
    });
}

module.exports.getPostById = async (req, res) => {
    const { id } = req.params;

    try {
        const resDB = await Posts.findByPk(id); // getting a post by provided id it will return 1 object contains postText, title etc
        return res.status(200).json(resDB);
    } catch (error) {
        console.log(error);
    }
}

module.exports.deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        const resDB = await Posts.destroy({
            where: {
                id
            }
        });

        return res.status(200).json(resDB);
    }
    catch (error) {

    }
}

module.exports.editPost = async (req, res) => {
    const { id, type, newContent } = req.body;

    try {
        if (type === "title") {
            const resDB = await Posts.update({title: newContent }, {
                where: {
                    id
                }
            })
        } else {
            const resDB = await Posts.update({postText: newContent }, {
                where: {
                    id
                }
            })
        }
        return res.status(200).json({
            success: true,
            msg: `${type} has been updated!`
        });
    } catch (error) {
        console.error(error);
    }
}