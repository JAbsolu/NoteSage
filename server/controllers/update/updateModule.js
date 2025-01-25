const Module = require("../../models/Module");

const updateModule = async (req, res) => {
  try {
    const { id } = req.query;
    const { title, public } = req.body;

    //validate user and card id
    const module = await  Module.findById(id);
    if (!module) return res.status(400).json({ message: "invalid module id" });

    //create filter
    const filter = { _id: id };
    const update = { title: title, public: public };

    await Module.findOneAndUpdate(filter, update);
    const updatedModule = await Module.findOne(filter);

    res.status(200).json({ message: "module has been updated", update: updatedModule });

  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
}

module.exports = updateModule;