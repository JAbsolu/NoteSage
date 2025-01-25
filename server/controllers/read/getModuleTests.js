const Test = require("../../models/Test");
const Module = require("../../models/Module");

const getModuleTests = async (req, res) => {
  try {
    const { id } = req.query;
    //check if module exists with id
    const module = await Module.findById(id);

    if (!module) return res.status(400).json({ message: "invalid module id " });

    // get the tests associated with the module
    const tests = await Test.find({ moduleId: id });

    if (tests.length > 0) {
      res.status(200).json({ message: "all module tests retrieved", data: tests });
    } else {
      res.status(200).json({ message: "no module tests found", data: [] });
    }

  } catch (err) {
    res.status(400).json({ message: "server error", error: err.message });
  }
}

module.exports = getModuleTests;