import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/blog");
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Login;
