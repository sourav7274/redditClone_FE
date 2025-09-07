import { Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "./contexts/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden transition-all duration-1000"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-50"
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
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 dark:bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-50"
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
            className="absolute top-40 left-40 w-80 h-80 bg-blue-500 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-50"
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

        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />

          <main className="flex-1 flex items-center justify-center px-4">
            <div className="text-center max-w-4xl mx-auto">
              {/* Hero Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h1"
                  className="mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 dark:from-gray-100 dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent font-bold text-6xl md:text-8xl transition-all duration-1000"
                >
                  Reddit Clone
                </Typography>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Typography
                    variant="h3"
                    className="mb-8 text-white/90 dark:text-gray-100 font-light text-2xl md:text-3xl transition-colors duration-1000"
                  >
                    Connect, Share, and Discover
                  </Typography>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Typography className="mb-12 text-white/70 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed transition-colors duration-1000">
                    Join our vibrant community where ideas flourish,
                    conversations spark, and connections are made. Share your
                    thoughts, discover new perspectives, and be part of
                    something amazing.
                  </Typography>
                </motion.div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link to="/signup">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
                    >
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        Get Started
                      </motion.span>
                    </Button>
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link to="/login">
                    <Button
                      variant="outlined"
                      size="lg"
                      className="border-2 border-white/30 dark:border-gray-400/30 text-white dark:text-gray-100 hover:bg-white/10 dark:hover:bg-gray-800/20 font-semibold px-8 py-4 rounded-full backdrop-blur-sm transition-all duration-300"
                    >
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                      >
                        Sign In
                      </motion.span>
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Features Preview */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {[
                  {
                    icon: "💬",
                    title: "Engage",
                    desc: "Join conversations and share your thoughts",
                  },
                  {
                    icon: "🔗",
                    title: "Connect",
                    desc: "Build meaningful relationships with like-minded people",
                  },
                  {
                    icon: "🚀",
                    title: "Discover",
                    desc: "Explore new ideas and trending topics",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 hover:bg-white/15 dark:hover:bg-gray-800/30 transition-all duration-300"
                  >
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <Typography
                      variant="h6"
                      className="text-white dark:text-gray-100 font-semibold mb-2 transition-colors duration-1000"
                    >
                      {feature.title}
                    </Typography>
                    <Typography className="text-white/70 dark:text-gray-300 text-sm transition-colors duration-1000">
                      {feature.desc}
                    </Typography>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </main>

          <Footer />
        </div>
      </motion.div>
    </ThemeProvider>
  );
};

export default App;
