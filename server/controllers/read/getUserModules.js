const Module = require("../../models/Module");
const User = require("../../models/User");

const getModules = async (req, res) => {
  try {
    const { moduleId, id } = req.query;

    //handle id errors
    const user = await User.findById(id);
    if (!user) return res.status(400).json({ message: "user id is needed to access this information" });
    
    const userModules = await Module.find({ userId: id })

      // handle other errors
      if (userModules.length > 0) {
        res.status(200).json({ message: "Modules have been retrieved ", data: userModules });
      } else {
        res.status(200).json({ message: "no modules found", data: [] });
      }

  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
}

module.exports = getModules;