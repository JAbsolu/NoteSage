"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/app/components/navbar";
import Footer from "../components/footer";
import { useRouter } from "next/navigation";
import AuthCheck from "../hoc/AuthCheck";

const Signin = () => {
  const [formData, setFormData] = useState({
    emailAddress: "",
    password: "",
  });

  const [loginMssg, setLoginMssg] = useState(); // handle login error messages
  const router = useRouter() // use router

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      })
    
      const result = await response.json();

      if (response.ok && result.token) {
        Cookies.set("user-id", result.userId, { secure: true });
        Cookies.set("auth-token", result.token, { secure: true });
        router.push("/dashboard");
      } else {
        setLoginMssg(result.message);
      }

    } catch (error) {
      setLoginMssg(error.message);
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
          <h2 className="text-center text-2xl font-semibold text-gray">Sign in to your account</h2>

          <form onSubmit={handleSubmit} className="mt-6">
            {/* Input Fields */}
            <div className="space-y-4">
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
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-6 py-3 bg-blue text-white font-semibold rounded-lg hover:bg-blue-dark transition"
            >
              Sign in
            </button>
          </form>

          {/* Don't have an account? */}
          <p className="text-center text-gray mt-4">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-blue font-semibold hover:underline">
              Create an account
            </Link>
          </p>
          <p className="text-center mt-4 text-red-500 font-semibold">
            {loginMssg}
          </p>
        </div>
      </section>
      <Footer/>
    </>
  );
}

export default AuthCheck(Signin);
