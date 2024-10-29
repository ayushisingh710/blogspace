"use client";
import React, { useState } from "react";
import Input from "./Input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
const initialState = {
  name: "",
  email: "",
  password: "",
};

const SignupForm = () => {
  const router = useRouter();
  const [state, setState] = useState(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (event: any) => {
    setError("");
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { name, email, password } = state;

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }
    // Regular expression pattern for a basic email validation
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!pattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    try {
      setIsLoading(true);
      const newUser = {
        name,
        email,
        password,
      };
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (response?.status === 201) {
        setSuccess("Registration Successful");
        setTimeout(() => {
          router.push("/login", { scroll: false });
        }, 1000);
      } else {
        setError(
          "An error occurred while registering. Please try again later."
        );
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <section className="container py-16">
      <form
        onSubmit={handleSubmit}
        className="border-2 border-accent rounded-lg basis-1/2"
      >
        <h2 className="text-center special-word py-2">Sign up</h2>
        <div className="flex">
          <div className="max-w-4xl mx-auto px-8 py-6 space-y-6">
            <Input
              label="Name"
              type="text"
              name="name"
              onChange={handleChange}
              value={state.name}
            />
            <Input
              label="Email"
              type="text"
              name="email"
              onChange={handleChange}
              value={state.email}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              onChange={handleChange}
              value={state.password}
            />
            {error && <div className="text-red-700">{error}</div>}
            {success && <div className="text-green-700">{success}</div>}
            <button type="submit" className="btn w-full">
              {isLoading ? "Loading..." : "Sign up"}
            </button>
            <p className="text-center">
              Already a User?{" "}
              <Link href="/login" className="text-primary">
                Login
              </Link>
            </p>
          </div>

          <div className="hidden basis-1/2 md:block items-center justify-center pt-16">
            <Image
              src="/img/signup.svg"
              alt=""
              width={400}
              height={500}
              className=""
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default SignupForm;
