import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="flex justify-center bg-gray-200 pt-4 pb-4">
      <div>
        <div className="logo text-center">
          <Link href="/" className="font-bold text-xl">
            Ultimate Tech
          </Link>
        </div>
        <div className="links text-sm mt-4">
          <Link style={{ marginRight: "15px" }} href="/code/posts">
            Posts
          </Link>
          <Link style={{ margin: "0 15px" }} href="/product/view">
            Products
          </Link>
          <Link style={{ margin: "0 15px" }} href="/about/team">
            Our Team
          </Link>
          <Link style={{ margin: "0 15px" }} href="/about/contact">
            Contact Us
          </Link>
          <Link style={{ marginLeft: "15px" }} href="/about/portfolio">
            Portfolio
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
