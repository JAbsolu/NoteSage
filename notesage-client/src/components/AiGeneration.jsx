import { BsStars } from "react-icons/bs";

const AiGeneration = () => {
  return (
    <div className="p-6 rounded-lg mt-6 mx-2">
            <div className="flex">
              <h2 className="font-bold mb-4 me-1 text-lg">
                Generate from text with AI
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
              <button className="bg-white text-gray-500 border px-4 py-2 rounded-lg hover:bg-blue-dark transition">
                Generate Flashcards
              </button>
            </div>
    </div>
  )
}

export default AiGeneration;