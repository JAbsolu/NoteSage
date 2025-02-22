'use client';

import { About, FinalStatement, Offer, Purpose, WhyNoteSage } from "../../../public/about";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const AboutPage = () => {
  return (
    <>
    <Navbar />
    <div className="flex bg-gray-150 justify-center flex-column h-[86.5vh]">  
      {/* Right Side - About Us Section */}
      <div className="w-1/2 p-10 flex flex-col text-auto">
        <h2 className="text-3xl font-semibold mb-2 text-center mb-10">About us</h2>
        <p className="text-md"> {About} </p>
        <h3 className="text-xl font-semidold mb-2 mt-4">Our Purpose</h3>
        <p className="text-md">{ Purpose} </p>
        <h3 className="text-xl font-semidold mb-2 mt-4">Why NoteSage?</h3>
        <p className="text-md"> {WhyNoteSage} </p>
        <h3 className="text-xl font-semidold mb-2 mt-4">Our Offer</h3>
        <p> {Offer }</p>
        <p className="text-md mt-2"> {FinalStatement} </p>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default AboutPage;