const jwt = require("jsonwebtoken");
const { User } = require("../models");

async function verifyToken(req, res, next) {
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			const token = req.headers.authorization.split(" ")[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			console.log("decoded", decoded);
			const user = await User.findOne({ where: { id: decoded.user.id } });
			req.user = user;
			return next();
		} catch (error) {
			console.log(error);
			res.status(400).send("Invalid token");
		}
	} else {
		return res.status(404).send("Bearer token is missing");
	}
}
module.exports = verifyToken;
