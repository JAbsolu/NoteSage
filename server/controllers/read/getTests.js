const Test = require("../../models/Test");

const getTests = async (req, res) => {
  try {
    const tests = await Test.find();

    if (tests.length > 0) {
      res.status(200).json({ message: `all tests have been retrieved`, data: tests });
    } else {
      res.status(200).json({ message: `no tests choices found` });
    }
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
}

module.exports = getTests;