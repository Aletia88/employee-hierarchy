import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <div className="max-w-screen">
      <nav className="back text-white h-14 px-5">
        <ul className="flex justify-between  gap-1 items-center h-full mr-4 tracking-wider">
          <li>
            <Link href="/">
              <Image src="/perago.png" alt="" width={100} height={100} />
            </Link>
          </li>
          <li className="px-2 cursor-pointer">
            <Link href="/Hierarchy">Employee Hierarchy</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
