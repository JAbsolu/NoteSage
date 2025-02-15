const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const {
      emailAddress,
      password
    } = req.body;

    // check if the user exists
    const user = await User.findOne({ emailAddress });

    //compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!user ) {
      return res.status(400).json({ message: "No account found with this email address" });
    } else if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    // generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { 
      expiresIn: "1h",
    });

    res.status(200).json({ token });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }

}

module.exports = login;