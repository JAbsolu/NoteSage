import { useState, useEffect } from "react";
import Link from "next/link";
import { FiHome, FiBell } from "react-icons/fi";
import { MdOutlineComputer, MdOutlineQuiz } from "react-icons/md";
import { PiCardsThree } from "react-icons/pi";
import NotificationsModal from "@/components/Notifications"; // Import the Modal
import { getCookie } from "@/util/cookies";

const API_URL = process.env.API_URL || "http://localhost";

const getSeverity = (text) => {
  const lower = text.toLowerCase();
  if (lower.includes("error") || lower.includes("problem") || lower.includes("server")) return 'error';
  if (lower.includes("finished") || lower.includes("well done")) return 'success';
  if (lower.includes("friend") || lower.includes("request")) return 'info';
  if (lower.includes("mail") || lower.includes("warn")) return 'warning';
  return 'info';
};

const Sidebar = ({ isExpanded }) => {
  const [allNotifications, setAllNotifications] = useState([]);
  const [openModal, setOpenModal] = useState(false);

   const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const userId = getCookie("userId");
  
    useEffect(() => {
    
      const interval = setInterval(() => {
        fetch(`${API_URL}/notifications?id=${userId}`)
          .then((res) => res.json())
          .then((data) => {
            const notificationList = data?.data?.[0]?.notifications || [];
            setNotifications(notificationList);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Failed to fetch notifications", error);
            setNotifications([]);
            setLoading(false);
          });
      }, 2000); // every 2 seconds
    
      // Cleanup function
      return () => clearInterval(interval);
    
    }, [userId]); 

  return (
    <>
      <div className={`bg-blue text-white ${isExpanded ? "w-64" : "w-20"} min-h-screen p-4 mt-4 transition-all duration-300`}>
        <nav className="flex flex-col space-y-6 mt-14">
          <Link href="/dashboard" className="flex items-center space-x-2 hover:text-gray-200">
            <FiHome className="text-xl" />
            {isExpanded && <span className="text-white">Home</span>}
          </Link>

          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center space-x-2 hover:text-gray-200"
          >
            <FiBell className="text-xl -me-4" />
            <div className="flex items-center justify-center bg-red-600 border min-w-6 min-h-6 rounded-full text-xs">
              {notifications?.length || "0"}
            </div>
            {isExpanded && <span className="text-white">Notifications</span>}
          </button>

          <Link href="/dashboard/workspace" className="flex items-center space-x-2 hover:text-gray-200">
            <MdOutlineComputer className="text-xl" />
            {isExpanded && <span className="text-white">Workspace</span>}
          </Link>

          <Link href="/dashboard/flashcards" className="flex items-center space-x-2 hover:text-gray-200">
            <PiCardsThree className="text-xl" />
            {isExpanded && <span className="text-white">Flashcards</span>}
          </Link>

          <Link href="/dashboard/quizzes" className="flex items-center space-x-2 hover:text-gray-200">
            <MdOutlineQuiz className="text-xl" />
            {isExpanded && <span className="text-white">Quizzes</span>}
          </Link>
        </nav>
      </div>

      <NotificationsModal open={openModal} onClose={() => setOpenModal(false)} notifications={notifications} loading={loading} />
    </>
  );
};

export default Sidebar;