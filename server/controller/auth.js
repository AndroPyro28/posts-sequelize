module.exports.auth = async (req,res) => {

    const {currentUser} = req;
    
    return res.status(200).json(currentUser);

}