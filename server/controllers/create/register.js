const User = require("../../models/User");

const register = async (req, res) => {
  try {
    const { firstName, lastName, emailAddress, password } = req.body;
    
    // check if the user exists
    const existingUser = await User.findOne({ emailAddress });
    
    if (existingUser) res.status(400).json({ message: "Email already in use"});

    // create new user
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      password: password
    });

    // save the user
    await user.save();

    res.status(201).json({ message: "User registered succesfully", data: user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

module.exports = register;