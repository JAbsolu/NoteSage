const Paper = require("../../models/Paper");

const getPapers = async (req, res) => {
  try {
    // get papers
    const papers = await Paper.find();

    if (papers.length > 0) { 
      res.status(200).json({ message: "all papers retrieved", data: papers });
    } else {
      res.status(200).json({ message: "no papers found", data: [] });
    }

  } catch (err) {
    res.status(404).json({ message: "not found", error: err.message });
  }
}

module.exports = getPapers;