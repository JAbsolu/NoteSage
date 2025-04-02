import Footer from "@/components/Footer";
import Navbar from "../../components/Navbar";  // Make sure the path is correct


export default function ContactUs() {
  return (
    <>
      <Navbar />  {/*  Navbar is added at the top */}
      <div className="min-h-[87vh] bg-blue-500 pt-20 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            Contact Us
          </h2>
          <form className="mt-6 space-y-4">
            <div className="flex space-x-3">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                required
                className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
                className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              name="reason"
              placeholder="Reason for Contact"
              required
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />  {/*  Footer is added at the bottom */}
    </>
  );
}

