const userServices = require('../services/user');
const { validateLogin, validateSignUp } = require('../utils/validations/usersValidation');
const { MSG_TYPES } = require('../utils/msgTypes')


exports.signup = async (req, res) => {
    try{
        const { error } = validateSignUp(req.body);
        if(error) return res.status(404).json({ message: error.details[0].message })

        const user = await userServices.signup(req.body);
        res.status(201).json({ message: MSG_TYPES.ACCOUNT_CREATED, user})


    }catch(error) { 
        res.status(error.statusCode || 500).json({message : error.message})
    }

}

exports.login = async (req, res) => {
    try {
        const { error } = validateLogin(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        
        const user = await userServices.login(req.body);
        res.status(200).json({ message: MSG_TYPES.LOGGED_IN, user });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}
