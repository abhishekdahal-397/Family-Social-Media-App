const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1]; // Extract token from headers

	if (!token) {
		return res.status(401).json({ message: "No token found" });
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(403).json({ message: "Invalid token" });
		}

		req.id = decoded.userId; // Assuming decoded object has userId
		next();
	});
};

module.exports = verifyToken;
