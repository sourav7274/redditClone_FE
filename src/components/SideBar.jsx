import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useTheme } from "../contexts/ThemeContext";
import {
  HomeIcon,
  InboxIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ChartBarIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

const Sidebar = ({ user }) => {
  const { isDark } = useTheme();

  const navItems = [
    {
      name: "Home",
      href: `/user/${user?._id}`,
      icon: HomeIcon,
      description: "Your dashboard",
    },
    {
      name: "Inbox",
      href: "/inbox",
      icon: InboxIcon,
      description: "Messages & notifications",
    },
    {
      name: "Profile",
      href: `/userDetails/${user?._id}`,
      icon: UserIcon,
      description: "View your profile",
    },
    {
      name: "Analytics",
      href: "#",
      icon: ChartBarIcon,
      description: "Your activity stats",
      disabled: true,
    },
    {
      name: "Settings",
      href: "#",
      icon: Cog6ToothIcon,
      description: "Account preferences",
      disabled: true,
    },
  ];

  const recentActivities = [
    {
      type: "post",
      text: "Created a new post",
      time: "2h ago",
      icon: ChatBubbleLeftRightIcon,
    },
    { type: "like", text: "Liked 3 posts", time: "4h ago", icon: HeartIcon },
    {
      type: "comment",
      text: "Commented on discussion",
      time: "6h ago",
      icon: ChatBubbleLeftRightIcon,
    },
    {
      type: "friend",
      text: "Added 2 new friends",
      time: "1d ago",
      icon: UserIcon,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="w-80 bg-white/10 dark:bg-gray-800/20 backdrop-blur-lg border-r border-white/20 dark:border-gray-700/30 p-6 transition-all duration-1000"
    >
      {/* User Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center space-x-3 mb-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
          >
            <span className="text-white font-bold text-lg">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </span>
          </motion.div>
          <div>
            <h3 className="text-white dark:text-gray-100 font-semibold text-lg transition-colors duration-1000">
              {user?.name || "User"}
            </h3>
            <p className="text-white/70 dark:text-gray-300 text-sm transition-colors duration-1000">
              {user?.email || "user@example.com"}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mb-8"
      >
        <h4 className="text-white/90 dark:text-gray-200 font-semibold mb-4 text-sm uppercase tracking-wider transition-colors duration-1000">
          Navigation
        </h4>
        <div className="space-y-2">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
            >
              <Link
                to={item.href}
                className={`group flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                  item.disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-white/10 dark:hover:bg-gray-700/30 hover:translate-x-1"
                }`}
                title={item.disabled ? "Coming soon" : item.description}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-lg ${
                    item.disabled
                      ? "bg-gray-500/20"
                      : "bg-white/10 dark:bg-gray-700/30 group-hover:bg-purple-500/20"
                  } transition-all duration-300`}
                >
                  <item.icon className="w-5 h-5 text-white dark:text-gray-200 transition-colors duration-1000" />
                </motion.div>
                <div className="flex-1">
                  <p className="text-white dark:text-gray-100 font-medium transition-colors duration-1000">
                    {item.name}
                  </p>
                  <p className="text-white/60 dark:text-gray-400 text-xs transition-colors duration-1000">
                    {item.description}
                  </p>
                </div>
                {item.disabled && (
                  <span className="text-xs text-white/40 dark:text-gray-500 px-2 py-1 bg-white/5 dark:bg-gray-600/20 rounded-full transition-colors duration-1000">
                    Soon
                  </span>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.nav>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mb-8"
      >
        <h4 className="text-white/90 dark:text-gray-200 font-semibold mb-4 text-sm uppercase tracking-wider transition-colors duration-1000">
          Recent Activity
        </h4>
        <div className="space-y-3">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
              className="flex items-start space-x-3 p-3 rounded-xl hover:bg-white/5 dark:hover:bg-gray-700/20 transition-all duration-300"
            >
              <div className="p-2 rounded-lg bg-white/10 dark:bg-gray-700/30">
                <activity.icon className="w-4 h-4 text-white/80 dark:text-gray-300 transition-colors duration-1000" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/90 dark:text-gray-200 text-sm font-medium transition-colors duration-1000">
                  {activity.text}
                </p>
                <p className="text-white/50 dark:text-gray-400 text-xs transition-colors duration-1000">
                  {activity.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Logout Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        className="mt-auto"
      >
        <Link
          to="/"
          className="group flex items-center space-x-3 p-3 rounded-xl hover:bg-red-500/20 hover:border-red-500/30 border border-transparent transition-all duration-300"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-red-500/20 group-hover:bg-red-500/30 transition-all duration-300"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 text-red-400" />
          </motion.div>
          <div className="flex-1">
            <p className="text-red-400 font-medium group-hover:text-red-300 transition-colors duration-300">
              Log Out
            </p>
            <p className="text-red-400/60 text-xs group-hover:text-red-300/60 transition-colors duration-300">
              Sign out of your account
            </p>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
