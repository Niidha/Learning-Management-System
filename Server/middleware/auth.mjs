import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

export const Auth = async (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader) {
        return res.status(401).send({ message: "Access denied. No token provided." });
      }
  
      const [type, token] = authHeader.split(" ");
      if (type !== "Bearer" || !token) {
        return res.status(401).send({ message: "Invalid token format." });
      }
  
      // Verify token with different possible secret keys
      let decoded;
      const secretKeys = [
        process.env.JWT_KEY_ADMIN,
        process.env.JWT_KEY_PROVIDER,
        process.env.JWT_KEY_STUDENT
      ];
  
      for (let key of secretKeys) {
        try {
          decoded = jwt.verify(token, key);
          break;
        } catch (error) {
          continue;
        }
      }
  
      if (!decoded) {
        return res.status(401).send({ message: "Invalid token." });
      }
  
      req.user = decoded; // Attach user data to request
      next();
    } catch (err) {
      console.error(err);
      if (err.name === "JsonWebTokenError") {
        return res.status(401).send({ message: "Invalid token." });
      }
      if (err.name === "TokenExpiredError") {
        return res.status(401).send({ message: "Token expired." });
      }
      return res.status(500).send({ message: "Internal server error." });
    }
  };
  export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).send({ message: "Access denied. Insufficient permissions." });
      }
      next();
    };
  };