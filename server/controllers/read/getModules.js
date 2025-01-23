const Module = require("../../models/Module");

const getModules = async (req, res) => {
  try {
    // get modules
    const modules = await Module.find();

    res.status(200).json({ data: modules });

  } catch (err) {
    res.status(404).json({ message: "not found", error: err.message });
  }
}

module.exports = getModules;