"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import AuthCheck from "../hoc/AuthCheck";
import { setCookie } from "@/util/cookies";

const API_URL = process.env.API_URL || "http://localhost";

const Signin = () => {
  const [formData, setFormData] = useState({
    emailAddress: "",
    password: "",
  });

  const [loginMssg, setLoginMssg] = useState(); // handle login error messages
  const [error, setError] = useState(); // handle login error messages
  const router = useRouter() // use router

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      })
    
      const result = await response.json();

      if (!response.ok) {
        console.log("Status:", response.status, result.message);
        setError(result.message)
        return;
      }

      const userId = result.userId;
      const token = result.token;
      setCookie("userId", userId, {expires: 7, secure: true});
      setCookie("token", token, {expires: 7, secure: true});
      router.push("/dashboard");
      setLoginMssg(result.message);

    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <section className="min-h-[85.8vh] flex flex-col items-center justify-center bg-blue">
        {/* Blue Background with Rounded Corners */}
        {/* <div className="absolute top-16 left-0 w-full h-[25em] bg-blue rounded-b-[50px]"></div> */}

        {/* Sign-In Card */}
        <div className="relative bg-white shadow-lg rounded-xl p-12 w-full max-w-lg">
          <h2 className="text-center text-xl text-gray">Sign in to your account</h2>

          <form onSubmit={handleSubmit} className="mt-6">
            {/* Input Fields */}
            <div className="space-y-4">
              <input
                type="email"
                name="emailAddress"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-4 py-3 bg-blue text-white font-semibold rounded-lg transition hover:bg-blue-600"
            >
              Sign in
            </button>
          </form>

          {/* Don't have an account? */}
          <p className="text-start text-gray mt-4">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-blue font-semibold hover:underline">
              create account
            </Link>
          </p>

          {/* Forgot password */}
          <Link href="/signup" className="text-blue font-semibold hover:underline">
            Forgot password?{" "}
          </Link>
          
          <p className="text-center mt-4 text-green-500 font-semibold">
            {loginMssg}
          </p>
          <p className="text-center mt-4 text-red-500 font-semibold">
            {error}
          </p>
        </div>
      </section>
      <Footer/>
    </>
  );
}

export default AuthCheck(Signin);
