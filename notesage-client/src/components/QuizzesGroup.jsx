import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";

const QuizzesGroup = ({ quizzes, firstName }) => {
  return (
    <>
    { quizzes && quizzes.length > 0 ? <h3 className="font-bold text-lg mt-4 mb-3 ps-10">Quizzes</h3> : null }
    <div className="flex flex-wrap gap-4 w-full max-h-[16em] overflow-scroll ps-10">
      { quizzes ? quizzes.map((quiz, index) => (
          <Link key={index} href={`/flashcards/${index + 1}`} className="block">
            <div className="flex flex items-center bg-gray-100 p-3 rounded-lg shadow hover:bg-gray-200 transition">
              <span className="bg-black text-white px-2 py-1 rounded font-bold">Q</span>
              <div className="ml-4">
                <h3 className="font-bold">{quiz.title}</h3>
                <p className="text-sm text-gray-600">{quizzes.length} total items - <span className="text-xs"> created by {firstName}</span></p>
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

export default QuizzesGroup;