"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from '../components/Navbar';
import './globals.css';
import homeImage from "../../public/home-img.png";
import Footer from "../components/Footer";
import AuthCheck from "./hoc/AuthCheck";

const Home = () => {
  return (
    <>
      <Navbar />
      <section className="bg-light-gray min-h-[87vh] flex items-start justify-center px-6 py-20">
        <div className="max-w-8xl mx-40 flex flex-col md:flex-row items-center justify-between w-full">
          
          {/* Left Side - Text & Buttons */}
          <div className="md:w-1/2 my-12">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-black">
              Learn online <br />
              <span className="text-black">Everyday, Anytime,</span> <br />
              and Anywhere.
            </h1>
            <p className="text-gray mt-6 text-lg mb-16">
              Over <span className="font-bold">1000+</span> quizzes and flashcards to prepare <br/>for exams and quizzes.
            </p>

            {/* Buttons */}
            <div className="mt-6 mb-16 flex space-x-6">
              <Link href="/signup" className="px-8 py-2 border-2 border-blue bg-blue text-white rounded-full text-lg font-semibold hover:bg-blue-dark transition">
                Sign up for free
              </Link>
              <Link href="/how-it-works" className="px-8 py-2 border-2 border-blue text-blue rounded-full text-lg font-semibold hover:bg-blue hover:text-white transition">
                How it Works
              </Link>
            </div>

            {/* Stats Section */}
            <div className="mt-10 flex space-x-16">
              <div className="text-start">
                <span className="text-yellow text-3xl font-bold">1000+</span>
                <p className="text-gray text-lg">Flashcards <br /> and Quizzes</p>
              </div>
              <div className="text-start">
                <span className="text-blue text-3xl font-bold">5000+</span>
                <p className="text-gray text-lg">Students <br /> Learning</p>
              </div>
              <div className="text-start">
                <span className="text-orange text-3xl font-bold">500+</span>
                <p className="text-gray text-lg">Professors and <br /> Tutors</p>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-[550px] h-[550px]">
              <div className="absolute inset-0 bg-orange rounded-full"></div>
              <Image
                src={homeImage}
                alt="Student Learning"
                fill
                style={{ objectFit: "contain" }}
                className="relative z-10"
              />
            </div>
          </div>
          
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default AuthCheck(Home);
