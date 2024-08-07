"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const isValidUsername = (username: string) => {
    const usernameRegex = /^[a-zA-Z0-9]{5,15}$/;
    return usernameRegex.test(username);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const usernameOrEmail = e.target[0].value;
    const password = e.target[1].value;

    if (usernameOrEmail.includes("@")) {
      if (!isValidEmail(usernameOrEmail)) {
        setError("Email is invalid");
        return;
      }
    } else {
      if (!isValidUsername(usernameOrEmail)) {
        setError("Username is invalid. It should be 5-15 alphanumeric characters with no spaces.");
        return;
      }
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      usernameOrEmail,
      password,
    });

    if (res?.error) {
      setError("Invalid username/email or password");
    } else {
      setError("");
      if (res?.url) router.replace("/");
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <main className="bg-[#fafafa] min-h-screen"> 
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="bg-white p-8 rounded-xl shadow-lg w-96">
          <h1 className="text-black text-4xl text-center font-semibold mb-8">Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Username or Email"
              required
            />
            <input
              type="password"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Sign In
            </button>
            <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          </form>
         
          <div className="text-center text-gray-500 mt-4">- OR -</div>
          <Link
            className="block text-center text-blue-500 hover:underline mt-2"
            href="/register"
          >
            Register Here
          </Link>
        </div>
      </div>
      </main>
    )
  );
};

export default Login;
