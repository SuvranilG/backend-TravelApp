const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const User = require("../model/user.model");

const loginHandler = async (req, res) => {
    try{
        const user = await User.findOne({ number: req.body.number });
        !user && res.status(401).json({ message: "Incorrect Mobile Number" });

        const decodedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET_KEY).toString(CryptoJS.enc.Utf8);
        decodedPassword !== req.body.password && res.status(401).json({ message: "Incorrect Password"});

        const { password, ...rest } = user._doc;
        const accessToken = jwt.sign( {username: user.username, userid:user._id}, process.env.ACCESS_TOKEN )

        // jwt.verify returns username from token
        const verifiedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN);
        const userIdFromToken = verifiedToken.id;
        console.log('User _ID:', userIdFromToken);


        res.json({...rest, accessToken, userIdFromToken});

    }catch(err){
        console.log(err)
    }
}

module.exports = loginHandler;