"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from './components/navbar';
import './globals.css';
import homeImage from "../../public/home-img.png";

const Home = () => {
  return (
    <>
      <Navbar />
      <section className="bg-light-gray min-h-screen flex items-start justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between w-full">
          
          {/* Left Side - Text & Buttons */}
          <div className="md:w-1/2 my-12">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-black">
              Learn online <br />
              <span className="text-black">Everyday, Anytime,</span> <br />
              and Anywhere.
            </h1>
            <p className="text-gray mt-4 text-lg mb-12">
              Over <span className="font-bold">1000+</span> quizzes and flashcards to prepare for exams and quizzes.
            </p>

            {/* Buttons */}
            <div className="mt-6 mb-12 flex space-x-4">
              <Link href="/signup" className="px-6 py-2 bg-blue text-white rounded-full text-lg font-semibold hover:bg-blue-dark transition">
                Sign up Today
              </Link>
              <Link href="/how-it-works" className="px-6 py-2 border-2 border-blue text-blue rounded-full text-lg font-semibold hover:bg-blue hover:text-white transition">
                How it Works
              </Link>
            </div>

            {/* Stats Section */}
            <div className="mt-10 flex space-x-8">
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
            <div className="relative w-[500px] h-[500px]">
              <div className="absolute inset-0 bg-orange rounded-full"></div>
              <Image
                src={homeImage}
                alt="Student Learning"
                layout="fill"
                objectFit="contain"
                className="relative z-10"
              />
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Home;
