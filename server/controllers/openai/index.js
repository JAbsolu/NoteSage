const OpenAI = require("openai");
const dotenv = require("dotenv").config();
const Task = require("../../models/Task");

/** Open AI credentials */
const ORG_ID = process.env.OPENAI_ORG_ID;
const PROJ_ID = process.env.OPENAI_PROJECT_ID;
const API_KEY = process.env.OPENAI_API_KEY;

/** OpenAi api */
const openai = new OpenAI({
    apiKey: API_KEY,
    organization: ORG_ID,
    project: PROJ_ID,
});


const createMultipleTasks = async (id, tasks) => {
  try {
    // handle errors for userids
    if (!id) return res.status(400).json({ message: "user id not found to create task" });

    // create new tasks
    const newTasks = tasks.map((task) => ({
      userId: id,
      title: task.title,
      description: task.description,
      completed: task.completed || false,
    }));

    //save the new task
    await Task.insertMany(newTasks);
    await Task.save();
    console.log("Inserted many tasks by AI")
  } catch (err) {
    console.log(err.message)
  }
}

// Update the system prompt to REQUIRE exactly 5 news sources
const systemPrompt = `You are provided a paragraph, you are to to create multiple tasks based on what the user is asking you.
provide a json file that contains the following fields: 
[
    {
        "title": "string",
        "description": "string", 
    },
    {
        "title": "string",
        "description": "string", 
    }
]
`;


const generateByAi = async (req, res) => {
    const { id, userPrompt } = req.body;
    
    // Check if the userPrompt is empty
    if (!userPrompt) {
        return res.status(400).json({ error: "User prompt is required" });
    }
    
    // Call OpenAI
    try {
        // Call OpenAI
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
            {
                role: "system",
                content: systemPrompt,
            },
            {
                role: "user",
                content: userPrompt,
            },
            ],
            temperature: 2,
            max_tokens: 1500,
        });
        // Get the HTML response
        const tasks = await response.choices[0].message.content;
        await createMultipleTasks(id, JSON.parse(tasks));
        res.status(200).json({ message: "Tasks have been created by AI", data: tasks });

    } catch (error) {
        console.error("LLM error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


module.exports = generateByAi;
