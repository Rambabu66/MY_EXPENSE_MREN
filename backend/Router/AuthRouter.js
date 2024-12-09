const { Signup, Login } = require("../Controller/AuthContoller");
const { signValidation, loginValidation } = require("../Middleware/AuthValidation");

const router = require("express").Router();

router.post("/signup", signValidation,Signup);
router.post("/login", loginValidation,Login);

module.exports = router;
