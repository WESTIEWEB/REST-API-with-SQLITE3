const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const HttpError = require("../utils/httpError");

exports.signup = async (data) => {
	const { fullname, gender, email, password, address, phone } = data;

	const existingUser = await User.findOne({ where: { email } });

	const existingPhone = await User.findOne({ where: { phone } });

	if (existingUser) {
		throw new HttpError("Email already exists", 400);
	}

	if (existingPhone) {
		throw new HttpError("Phone number already exists",400);
	}

	const salt = await bcrypt.genSalt(10);
	const encryptedPassword = await bcrypt.hash(password, salt);
	const user = await User.create({
		fullname,
		gender,
		email,
		password: encryptedPassword,
		address,
		phone,
	});
	delete user.dataValues.password;
	const token = jwt.sign({ user }, process.env.JWT_SECRET);
	return { token, ...user.dataValues };
};

exports.login = async (data) => {
	const { email, password } = data;
	const user = await User.findOne({ where: { email } });
	if (!user) {
		throw new HttpError("Invalid email or password", 400);
	}
	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		throw new HttpError("Invalid email or password", 400);
	}
	// console.log(user)
	delete user.dataValues.password;
	const token = jwt.sign({ user }, process.env.JWT_SECRET);
	return { token, ...user.dataValues };
};

