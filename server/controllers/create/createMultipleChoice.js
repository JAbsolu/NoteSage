const MultipleChoice = require("../../models/MultipleChoice");
const Test = require("../../models/Test");


const createMultipleChoice = async (req, res) => {
  try {
    const { testId, question, choices } = req.body;

    // error handling for ids
    const test = await Test.findById(testId);
    if (!test) return res.status(400).json({ message: "test not found "});

    // create new multiple choice
    const multipleChoice = new MultipleChoice({
      testId,
      question,
      choices: {
        "A": null,
        "B": null,
        "C": null,
        "D": null
      }
    });

    // save the multiple choice
    await multipleChoice.save();

    // add the multiple choice to the test's content and then save
    test.contents.push(multipleChoice);
    await test.save();


    res.status(201).json({ message: "multiple choice created" })

  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
}

module.exports = createMultipleChoice;