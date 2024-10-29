import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="container h-screen flex flex-col gap-5 justify-center items-center">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" className="bg-accent p-3 rounded-full">
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
