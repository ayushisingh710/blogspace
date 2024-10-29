import SignupForrm from "@/components/SignupForm";
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Signup = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/blog");
  return (
    <div>
      <SignupForrm />
    </div>
  );
};

export default Signup;
