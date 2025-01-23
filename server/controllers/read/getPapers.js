const Paper = require("../../models/Paper");

const getPapers = async (req, res) => {
  try {
    // get papers
    const papers = await Paper.find();

    res.status(200).json({ data: papers });

  } catch (err) {
    res.status(404).json({ message: "not found", error: err.message });
  }
}

module.exports = getPapers;