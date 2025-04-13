import { useEffect, useRef, useState } from "react";
import { BsStars } from "react-icons/bs";
import OpenAI from "openai";

const AiGeneration = () => {
  const messagesEndRef = useRef(null);

  const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  const ORG_ID = process.env.NEXT_PUBLIC_OPENAI_ORG_ID;
  const PROJ_ID = process.env.NEXT_PUBLIC_OPENAI_PROJECT_ID;

  const client = new OpenAI({
    apiKey: API_KEY,
    organization: ORG_ID,
    project: PROJ_ID,
    dangerouslyAllowBrowser: true
  });

  const generateWithAi = async (prompt) => {
    setAiResponse("");

    const newUserMessage = { role: "user", content: prompt };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);

    try {
      const stream = await client.chat.completions.create({
        model: "gpt-4o",
        messages: updatedMessages,
        stream: true,
      });

      let assistantReply = "";

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          assistantReply += content;
          setAiResponse((prev) => prev + content);
        }
      }

      // Finalize assistant message
      setMessages((prev) => [...prev, { role: "assistant", content: assistantReply }]);
    } catch (error) {
      console.error("Streaming error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateWithAi = async () => {
    if (!question.trim()) return;
    const prompt = question;
    setQuestion("");
    generateWithAi(prompt);
  };
  
const AiGeneration = () => {
  return (
    <div className="p-6 rounded-lg mt-6 mx-2">
            <div className="flex">
              <h2 className="font-bold mb-4 me-1 text-lg">
                Generate with AI
              </h2>
              <BsStars className="mt-1 text-lg" />
            </div>
            <textarea
              className="w-full p-4 border rounded-lg bg-gray-100"
              placeholder="Add your notes here"
            ></textarea>
            <div className="flex items-center mt-4 space-x-4">
              <button className="flex items-center space-x-2 bg-white text-gray-500 border px-4 py-2 rounded-lg hover:bg-blue-dark transition">
                <span>Upload file</span>
              </button>
              <button className="bg-white text-gray-500 border px-4 py-2 rounded-lg hover:bg-blue-dark transition" onClick={handleGenerateWithAi}>
                Generate Flashcards
              </button>
            </div>
    </div>
  )
}

export default AiGeneration;
