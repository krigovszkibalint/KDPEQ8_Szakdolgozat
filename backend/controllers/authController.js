const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');

// register
exports.signup = async (req, res, next) => {
    const { email } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
        return next(new ErrorResponse("Ez az e-mail cím már regisztrálva van", 400));
    }
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        next(error);
    }
}

// login
exports.signin = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        
        // validation
        if (!email) {
            return next(new ErrorResponse("Adja meg az e-mail címét", 400));
        }
        if (!password) {
            return next(new ErrorResponse("Adja meg a jelszavát", 400));
        }
        
        // check user email
        const user = await User.findOne({ email });
        if (!user) {
            return next(new ErrorResponse("Érvénytelen bejelentkezési adatok", 400))
        }
        // check user password
        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return next(new ErrorResponse("Érvénytelen bejelentkezési adatok", 400))
        }

        sendTokenResponse(user, 200, res);
    } catch (error) {
        next(error);
    }
}

// token
const sendTokenResponse = async (user, codeStatus, res) => {
    const token = await user.getJwtToken();
    res
    .status(codeStatus)
    .cookie('token', token, {maxAge: 60 * 60 * 1000, httpOnly: true })
    .json({
        success: true,
        role: user.role
    })
}

// log out
exports.logout = (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "Sikeres kijelentkezés"
    });
}

// user profile
exports.userProfile = async (req, res, next) => {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({
        success: true,
        user
    });
}