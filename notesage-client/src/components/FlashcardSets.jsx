const { default: Link } = require("next/link");
import { FaRegEdit } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";

const FlashcardSets = ({decks, firstName}) => {
  return (
    <>
      { decks && decks.length > 0 ? <h3 className={"font-bold text-lg mt-4 mb-3 ps-10"}>Flashcard Sets</h3> : null }
      <div className="flex flex-wrap gap-4 w-full max-h-[16em] overflow-scroll ps-10">
          { decks ? decks.map((deck, index) => (
              <Link key={index} href={`/flashcards/${deck._id}`} className="block">
                <div className="flex flex items-center bg-gray-100 p-3 rounded-lg shadow hover:bg-gray-200 transition">
                  <span className="bg-black text-white px-2 py-1 rounded font-bold">FS</span>
                  <div className="ml-4">
                    <h3 className="font-bold">{deck.title}</h3>
                    <p className="text-sm text-gray-600">{decks.length} flashcards - <span className="text-xs"> created by {firstName}</span></p>
                  </div>
                  <div className="flex justify-center items-center gap-4 ms-4">
                     <span className="flex gap-2 hover:text-[#2489D3]"> Edit<FaRegEdit className="text-xl" /> </span>
                     <span className="flex gap-2 hover:text-[#2489D3]"> Delete<FiDelete className="text-xl" /> </span>
                  </div>
                </div>
              </Link>
            )) : null
          } 
      </div>
    </>
  )
}

export default FlashcardSets;