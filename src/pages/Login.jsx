import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/userSlice";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../contexts/ThemeContext";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const [loginDate, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const verifyUser = async () => {
    if (loginDate.email == "" || loginDate.password == "") {
      alert("Please enter all the details");
    } else {
      setIsLoading(true);
      const result = await dispatch(loginUser(loginDate));

      if (result.payload) {
        navigate(`/user/${result.payload._id}`);
      } else {
        console.log("Error logging in");
      }
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 transition-all duration-1000"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-8"
          >
            <Typography
              variant="h3"
              className="mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent font-bold"
            >
              Welcome Back
            </Typography>
            <Typography className="text-white/70 font-light">
              Sign in to continue your journey
            </Typography>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-6"
          >
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <label
                htmlFor="email"
                className="block text-white/80 text-sm font-medium mb-2"
              >
                Email Address
              </label>
              <Input
                onChange={(e) => handleChange(e)}
                id="email"
                size="lg"
                type="email"
                name="email"
                value={loginDate.email}
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:bg-white/20 transition-all duration-300"
                labelProps={{
                  className: "hidden",
                }}
                required={true}
              />
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <label
                htmlFor="password"
                className="block text-white/80 text-sm font-medium mb-2"
              >
                Password
              </label>
              <Input
                onChange={(e) => handleChange(e)}
                name="password"
                value={loginDate.password}
                size="lg"
                placeholder="Enter your password"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:bg-white/20 transition-all duration-300"
                labelProps={{
                  className: "hidden",
                }}
                required={true}
                type={passwordShown ? "text" : "password"}
                icon={
                  <motion.i
                    onClick={togglePasswordVisiblity}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="cursor-pointer text-white/70 hover:text-white transition-colors"
                  >
                    {passwordShown ? (
                      <EyeIcon className="h-5 w-5" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5" />
                    )}
                  </motion.i>
                }
              />
            </motion.div>

            {/* Forgot Password */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex justify-end"
            >
              <Typography
                as="a"
                href="#"
                className="text-white/70 hover:text-white text-sm font-medium transition-colors"
              >
                Forgot password?
              </Typography>
            </motion.div>

            {/* Sign In Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button
                  onClick={() => verifyUser()}
                  disabled={isLoading}
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </motion.div>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="relative my-6"
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-white/50">
                  Or continue with
                </span>
              </div>
            </motion.div>

            {/* Google Sign In */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button
                  variant="outlined"
                  size="lg"
                  className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 font-semibold py-3 rounded-xl backdrop-blur-sm transition-all duration-300 flex items-center justify-center"
                >
                  <img
                    src="https://www.material-tailwind.com/logos/logo-google.png"
                    alt="google"
                    className="h-5 w-5 mr-2"
                  />
                  Sign in with Google
                </Button>
              </motion.div>
            </motion.div>

            {/* Sign Up Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="text-center"
            >
              <Typography className="text-white/70 text-sm">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-white hover:text-purple-200 font-semibold transition-colors"
                >
                  Sign up
                </Link>
              </Typography>
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
