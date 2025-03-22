import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";

const LessonGroup = ({ modules, firstName }) => {
  return (
    <>
    <h3 className="font-bold text-lg mt-4 mb-3 ps-10">Lesson Groups</h3>
    <div className="flex flex-wrap gap-4 w-full max-h-[16em] overflow-scroll ps-10">
    { modules ? modules.map((module, index) => (
        <Link key={index} href={`/flashcards/${index + 1}`} className="block">
          <div className="flex flex items-center bg-gray-100 p-3 rounded-lg shadow hover:bg-gray-200 transition">
            <span className="bg-black text-white px-2 py-1 rounded font-bold">LG</span>
            <div className="ml-4">
              <h3 className="font-bold">{module.title}</h3>
              <p className="text-sm text-gray-600">{modules.length} total items - <span className="text-xs"> created by {firstName}</span></p>
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

export default LessonGroup;