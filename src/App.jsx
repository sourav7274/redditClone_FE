import { Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex flex-col items-center justify-center flex-1 px-4 text-center">
        <Typography variant="h4" className="mb-4">
          Discover amazing features
        </Typography>
        <Typography className="mb-8 text-gray-700">
          Sign up now to get started with our awesome application.
        </Typography>
        <div className="flex space-x-4">
          <Link to="/signup">
            <Button color="blue" size="lg">
              Sign Up
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outlined" size="lg">
              Login
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
