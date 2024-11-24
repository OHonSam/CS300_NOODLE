const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col items-center justify-between sm:flex-row">
        {/* Left Section */}
        <p className="text-sm mb-4 sm:mb-0">
          &copy; {new Date().getFullYear()} CS300 SE Project. All rights reserved.
        </p>

        {/* Right Section */}
        <div className="flex space-x-4">
          <a
            href="#"
            className="hover:text-gray-400 transition-colors"
            aria-label="Twitter"
          >
            Twitter
          </a>
          <a
            href="#"
            className="hover:text-gray-400 transition-colors"
            aria-label="Facebook"
          >
            Facebook
          </a>
          <a
            href="#"
            className="hover:text-gray-400 transition-colors"
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
