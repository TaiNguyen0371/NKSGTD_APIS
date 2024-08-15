const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  req.user = {};
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (!token) res.status(401).json({ message: "Can't find token" });
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, data) => {
    if (err) {
      res.status(403).json({ message: "Token not correct" });
    } else {
      const decoded = jwt.decode(token, process.env.ACCESS_TOKEN); // Use the appropriate secret
      const idUser = decoded.id; // Access payload data
      req.user._id = idUser;
      next();
    }
  });
};

// const decodeToken = (req, res, next) => {
//   const authHeader = req.header("Authorization");
//   const token = authHeader && authHeader.split(" ")[1];
//   const decoded = jwt.decode(token, process.env.ACCESS_TOKEN); // Use the appropriate secret
//   const idUser = decoded.id; // Access payload data
//   req.id = idUser;
//   next();
// };

module.exports = { verifyToken };
