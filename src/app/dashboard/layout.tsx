"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const menuItems = [
  { name: "New Bookings", href: "/dashboard/new-booking" },
  { name: "Previus Bookings", href: "/dashboard/previous-bookings" },
  { name: "Modify bookings", href: "/dashboard/modify-booking" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userEmail, setUserEmail] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const email = localStorage.getItem("userEmail");
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      setUserEmail(email || "");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Sidebar */}
      <div className="w-72 bg-gradient-to-b from-green-500 to-green-600 flex flex-col items-center py-10 shadow-xl">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-white shadow flex items-center justify-center mb-4 border-4 border-green-200">
          <img
            src="/profile.png"
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
            height={150}
            width={150}
          />
        </div>
        {/* Email */}
        <div className="text-white mb-10 text-center text-lg font-medium tracking-wide">
          {userEmail ? userEmail : "Email Of user logged in"}
        </div>
        {/* Navigation Buttons */}
        <div className="flex flex-col space-y-6 w-full px-8">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block py-3 px-4 rounded-lg bg-white text-black text-center font-semibold shadow transition-all duration-150 border border-transparent hover:bg-green-50 hover:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 focus:ring-offset-green-100
                ${
                  pathname === item.href
                    ? "ring-2 ring-green-700 border-green-700"
                    : ""
                }
              `}
            >
              {item.name}
            </Link>
          ))}
        </div>
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-auto mb-2 text-white underline hover:text-green-200 text-sm transition-colors duration-150"
        >
          Logout
        </button>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center overflow-y-auto">
        <div className="mt-12 mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-gray-800 drop-shadow-sm">
            IIT ROORKEE LHC BOOKING PORTAL
          </h1>
        </div>
        <div className="w-full flex-1 flex flex-col items-center px-2 md:px-0">
          {children}
        </div>
      </div>
    </div>
  );
}
