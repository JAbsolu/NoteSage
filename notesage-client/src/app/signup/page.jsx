"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useRouter } from "next/navigation";
import AuthCheck from "../hoc/AuthCheck";
import { createNotificationList } from "@/util";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState(); //handle form error messages
  const router = useRouter(); //use router

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createNotificationList = async (userId) => {
      try {
        const response = await fetch(`http://localhost/create-notification-list?id=${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
  
        const result = await response.json();
  
        if (!response.ok) {
          console.log("error creating notification list", result.message);
          return;
        }
  
        console.log(result.message);
  
      } catch (error) {
        console.log(error.message);
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      setSignupError("Passwords do not match");
      return;
    }
    try {
      const response = await fetch("http://localhost/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      })
    
      const result = await response.json();

      if (!response.ok) {
        console.log("error creatig user", result.message);
        return;
      }

      if (response.ok) {
        const userId = result.data._id
        createNotificationList(userId);
        setRegistrationMessage(result.message)
      }

      // alert(JSON.stringify(result))
      if (response.ok) router.push("/login");
    } catch (error) {
      setRegistrationMessage(error)
    }
    
  };

  return (
    <>
      <Navbar />
      <section className="min-h-[85.8vh] flex flex-col items-center justify-center bg-blue">
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-6 py-3 bg-blue text-white font-semibold rounded-lg hover:bg-blue-600 transition"
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
          <p className="text-red-500 text-center">
            {signupError}
          </p>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default AuthCheck(Signup);
