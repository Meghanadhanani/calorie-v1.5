// import './globals.css';
import Link from "next/link";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FaInfo } from "react-icons/fa";
import { PiNotePencilBold } from "react-icons/pi";
import { MdMarkEmailRead } from "react-icons/md";

const Navbar = () => {
  return (
    <div className="border-r-2 border-gray-200  w-[100%] flex flex-col h-[100vh]">
      <h1 className="text-center text-4xl font-semibold text-slate-800 mt-6">
        Calorie Tracker
      </h1>
      <div className="w-full  flex justify-center h-[90%]">
        <ul className=" w-[70%] mt-11 text-lg text-gray-800 font-semibold">
          <Link href="/">
            <li className="bg-white border-2 border-white shadow-lg p-3 rounded-lg mb-5 flex items-center gap-5">
              <PiNotePencilBold className="text-green-500 font-extrabold text-2xl" />
              Dashboard
            </li>
          </Link>
          <Link href="/details">
            <li className="bg-white border-2 border-white shadow-lg  p-3 rounded-lg mb-5 flex items-center gap-5">
              <FaInfo className="text-green-500 font-extrabold text-2xl" />
              Details
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
