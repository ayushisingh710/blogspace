"use client";
import React, { useEffect, useState } from "react";
// @ts-nocheck
import Link from "next/link";
import { ModeToggle } from "./theme-toggle";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import demoImage from "@/public/img/demo_image.jpg";
const Navbar = () => {
  const [userData, setUserData] = useState({});
  const { data: session, status } = useSession();
  const user = session?.user as {
    _id: string;
    name?: string;
    email?: string;
    image?: string;
  };
  async function fetchUser() {
    try {
      const res = await fetch(
        `http://localhost:3000/api/user/${session?.user?._id}`
      );
      const resData = await res.json();
      setUserData(resData);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchUser();
  }, [session?.user?._id]);
  const pathname = usePathname();
  return (
    <div className="container p-6 h-16 flex items-center justify-between ">
      <Link href="/">
        <h2>
          Blog<span className="special-word">Space</span>.
        </h2>
      </Link>
      <ul className="flex items-center gap-3">
        <li>
          <Link
            href="/blog"
            className={pathname === "/blog" ? "text-primary font-bold" : ""}
          >
            Blog
          </Link>
        </li>
        {session?.user ? (
          <>
            <li>
              <Link
                href="/create-blog"
                className={
                  pathname === "/create-blog" ? "text-primary font-bold" : ""
                }
              >
                Create
              </Link>
            </li>
            <li>
              <div className="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Image
                      src={
                        userData?.avatar?.url
                          ? userData?.avatar?.url
                          : demoImage
                      }
                      alt="avatar"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-10 h-10 rounded-full cursor-pointer"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <button onClick={() => signOut()}>Logout</button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={`/user/${session?.user?._id.toString()}`}>
                        Profile
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                href="/login"
                className={
                  pathname === "/login" ? "text-primary font-bold" : ""
                }
              >
                Log In
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className={
                  pathname === "/signup" ? "text-primary font-bold" : ""
                }
              >
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
