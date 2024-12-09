const JWT = require("jsonwebtoken");

const ensureAuthentication = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(403).json({
      message: "Untherization,JWt token is require",
    });
  }
  try {
    const decoded = JWT.verify(auth, process.env.JWT_SCRECT);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Unathorized,JWt token is expired" });
  }
};

module.exports=ensureAuthentication