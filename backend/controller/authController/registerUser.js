const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, profileImageUrl, admininviteToken } = req.body;

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "User already Exist" });
        }

        let role = "member";
        if (admininviteToken && admininviteToken == process.env.ADMIN_INVITE_TOKEN) {
            role = "admin";
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            name,
            email,
            password: hashPassword,
            profileImageUrl,
            role
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        })

    } catch (error) {
        res
            .status(500)
            .json({ message: "Error registering user", error: error.message });
    }

}



