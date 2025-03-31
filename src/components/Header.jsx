import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full py-6 bg-blue-600 text-white text-center">
      <Typography variant="h2" className="font-bold">
        Our App
      </Typography>
      <nav className="mt-4">
        <Link to="/" className="mx-2 text-white">
          Home
        </Link>
        <Link to="/about" className="mx-2 text-white">
          About
        </Link>
        <Link to="/contact" className="mx-2 text-white">
          Contact
        </Link>
      </nav>
    </header>
  );
};

export default Header;
