const jwt = require("jsonwebtoken");

const createJwtToken = (user) => {
  const new_token = jwt.sign(
    { userId: user.id, name: "me", role: "role2" },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );

  return new_token;
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

module.exports = { verifyToken, createJwtToken };
