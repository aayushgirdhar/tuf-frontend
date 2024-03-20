import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="w-full shadow-lg">
      <div className="flex justify-between items-center w-[95%] mx-auto p-3">
        <h1 className="text-neutral-700 text-4xl">takeUforward</h1>
        <div className="flex gap-8">
          <Link
            to="/"
            className="text-lg shadow-sm hover:scale-110 transition-all bg-red-100 text-orange-700 border border-orange-700 rounded-xl px-5 py-2"
          >
            Code
          </Link>
          <Link
            to="/submissions"
            className="text-lg shadow-sm hover:scale-110 transition-all bg-red-100 text-orange-800 border border-orange-700 rounded-xl px-5 py-2"
          >
            Submissions
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
