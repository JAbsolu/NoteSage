"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
  });

  const [registrationMessage, setRegistrationMessage] = useState(); //handle form error messages
  const router = useRouter(); //use router

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      })
    
      const result = await response.json();
      setRegistrationMessage(result.message)

      if (response.ok) router.push("/dashboard");
    } catch (error) {
      setRegistrationMessage(error)
    }
    
  };

  return (
    <>
    <Navbar />
    <section className="min-h-[87vh] flex flex-col items-center justify-center bg-blue">
      {/* Blue Background with Rounded Corners */}
      {/* <div className="absolute top-16 left-0 w-full h-[25em] bg-blue rounded-b-[50px]"></div> */}

      {/* Signup Card */}
      <div className="relative bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-center text-2xl font-semibold text-gray">Create an Account</h2>

        <form onSubmit={handleSubmit} className="mt-6">
          {/* Input Fields */}
          <div className="space-y-4">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
              required
            />
            <input
              type="email"
              name="emailAddress"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 py-3 bg-blue text-white font-semibold rounded-lg hover:bg-blue-dark transition"
          >
            Sign Up
          </button>
        </form>

        {/* Already have an account? */}
        <p className="text-center text-gray mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue font-semibold hover:underline">
            Sign in
          </Link>
        </p>
        <p className="text-center font-semibold text-blue d-none mt-4">
          {registrationMessage}
        </p>
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default Signup;
