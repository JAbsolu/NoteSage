const Paper = require("../../models/Paper");

const updatePaper = async (req, res) => {
  try {
    const { id } = req.query;
    const { title, body } = req.body;

    //validate user and card id
    const paper = await Paper.findById(id);
    if (!paper) return res.status(400).json({ message: "invalid paper id" });

    //create filter
    const filter = { _id: id };
    const update = { title: title, body: body };

    await Paper.findOneAndUpdate(filter, update);
    const updatedPaper = await Paper.findOne(filter);

    res.status(200).json({ message: "paper has been updated", update: updatedPaper });

  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
}

module.exports = updatePaper;