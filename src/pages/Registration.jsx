import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../contexts/ThemeContext";

export function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [newUser, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...newUser, [name]: value });
  };

  const registerButton = async (e) => {
    e.preventDefault();

    if (!newUser.name || !newUser.email || !newUser.password) {
      alert("Please fill in all fields");
      return;
    }

    if (!agreedToTerms) {
      alert("Please agree to the Terms and Conditions");
      return;
    }

    setIsLoading(true);
    try {
      const result = await dispatch(addUser(newUser));
      if (result.payload) {
        // Registration successful, redirect to login
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
    setIsLoading(false);
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
        <motion.div
          className="absolute top-40 left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
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
              Join Our Community
            </Typography>
            <Typography className="text-white/70 font-light">
              Create your account and start your journey
            </Typography>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            onSubmit={registerButton}
            className="space-y-6"
          >
            {/* Name Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <label
                htmlFor="name"
                className="block text-white/80 text-sm font-medium mb-2"
              >
                Full Name
              </label>
              <Input
                size="lg"
                onChange={(e) => handleChange(e)}
                name="name"
                value={newUser.name}
                placeholder="Enter your full name"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:bg-white/20 transition-all duration-300"
                labelProps={{
                  className: "hidden",
                }}
                required
              />
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <label
                htmlFor="email"
                className="block text-white/80 text-sm font-medium mb-2"
              >
                Email Address
              </label>
              <Input
                name="email"
                value={newUser.email}
                onChange={(e) => handleChange(e)}
                size="lg"
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:bg-white/20 transition-all duration-300"
                labelProps={{
                  className: "hidden",
                }}
                required
              />
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <label
                htmlFor="password"
                className="block text-white/80 text-sm font-medium mb-2"
              >
                Password
              </label>
              <Input
                name="password"
                value={newUser.password}
                onChange={(e) => handleChange(e)}
                type="password"
                size="lg"
                placeholder="Create a strong password"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:bg-white/20 transition-all duration-300"
                labelProps={{
                  className: "hidden",
                }}
                required
              />
            </motion.div>

            {/* Terms and Conditions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="flex items-start space-x-3"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Checkbox
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="border-white/30 text-purple-500"
                  containerProps={{ className: "p-0" }}
                />
              </motion.div>
              <Typography
                variant="small"
                className="text-white/70 text-sm leading-relaxed"
              >
                I agree to the{" "}
                <a
                  href="#"
                  className="text-white hover:text-purple-200 font-medium transition-colors"
                >
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-white hover:text-purple-200 font-medium transition-colors"
                >
                  Privacy Policy
                </a>
              </Typography>
            </motion.div>

            {/* Sign Up Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button
                  type="submit"
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
                    "Create Account"
                  )}
                </Button>
              </motion.div>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
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

            {/* Google Sign Up */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button
                  variant="outlined"
                  size="lg"
                  className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 font-semibold py-3 rounded-xl backdrop-blur-sm transition-all duration-300"
                >
                  <img
                    src="https://www.material-tailwind.com/logos/logo-google.png"
                    alt="google"
                    className="h-5 w-5 mr-2"
                  />
                  Sign up with Google
                </Button>
              </motion.div>
            </motion.div>

            {/* Sign In Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="text-center"
            >
              <Typography className="text-white/70 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-white hover:text-purple-200 font-semibold transition-colors"
                >
                  Sign in
                </Link>
              </Typography>
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
