const jwt = require("jsonwebtoken");
const { verifyToken } = require("../service/jwtService");

const authUser = (requiredRole) => {
  return (req, res, next) => {
    console.log("aaaaannnn");
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: "Authorization header required" });
    }

    const token = authorization.substring("Bearer ".length);
    console.log("token -", token);
    // return res.status(401).json({ message: "Token has expired" });

    try {
      const decoded = verifyToken(token); // Replace 'tokenSecret' with your actual secret
      console.log("dcoded -", decoded);
      const { exp, iss, role } = decoded;

      console.log("role -", role, iss);

      // Check if the token has expired
      if (Date.now() >= exp * 1000) {
        return res.status(401).json({ message: "Token has expired" });
      }

      // Check if the issuer is correct (optional, if you have a specific issuer)
      if (role !== "role2") {
        // Replace 'yourIssuer' with your actual issuer
        return res.status(401).json({ message: "Token issuer invalid" });
      }

      // Check if the user has the required role
      // if (requiredRole && role !== requiredRole) {
      //   return res.status(403).json({ message: "Insufficient permissions" });
      // }

      // Attach the decoded token to the request object (optional, for later use)
      // req.user = decoded;

      console.log("jjj");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token", error });
    }
  };
};

module.exports = authUser;
