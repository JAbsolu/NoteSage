const Module = require("../../models/Module");

const getModules = async (req, res) => {
  try {
    // get modules
    const modules = await Module.find();

    if (modules.length > 0) { 
      res.status(200).json({ message: "all modules retrieved", data: modules });
    } else {
      res.status(200).json({ message: "no modules found", data: [] });
    }

  } catch (err) {
    res.status(404).json({ message: "not found", error: err.message });
  }
}

module.exports = getModules;