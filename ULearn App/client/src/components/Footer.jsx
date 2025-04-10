import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 p-4 mt-10 text-center text-sm text-gray-600">
      <p>© {new Date().getFullYear()} ULearn. All rights reserved.</p>
      <p>
        Built for lifelong learners.
      </p>
    </footer>
  );
};

export default Footer;
