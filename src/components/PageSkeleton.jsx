import { motion } from "motion/react";
import CreatePostSkeleton from "./CreatePostSkeleton";
import PostSkeleton from "./PostSkeleton";
import SidebarSkeleton from "./SidebarSkeleton";

const PageSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-1000"
    >
      <main className="flex-grow text-white">
        <div className="grid grid-cols-4">
          {/* Left Sidebar Skeleton */}
          <div className="p-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-between mb-4"
            >
              <div className="h-5 bg-white/20 dark:bg-gray-600/30 rounded-md w-32 animate-pulse"></div>
              <div className="w-12 h-6 bg-white/15 dark:bg-gray-600/20 rounded-full animate-pulse"></div>
            </motion.div>
            
            {/* Sidebar Content Skeleton */}
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 dark:bg-gray-700/20 rounded-xl">
                  <div className="w-6 h-6 bg-white/15 dark:bg-gray-600/20 rounded animate-pulse"></div>
                  <div className="h-4 bg-white/15 dark:bg-gray-600/20 rounded-md w-24 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="col-span-2 px-3">
            <div className="my-3">
              <CreatePostSkeleton />
            </div>
            <hr className="mx-2 border-white/20 dark:border-gray-700/30 transition-colors duration-1000" />
            <PostSkeleton count={4} />
          </div>

          {/* Right Sidebar Skeleton */}
          <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-lg border-l border-white/20 dark:border-gray-700/30 p-6 transition-all duration-1000">
            <SidebarSkeleton />
          </div>
        </div>
      </main>
      
      {/* Footer Skeleton */}
      <div className="w-full bg-white/5 backdrop-blur-lg border-t border-white/10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/15 dark:bg-gray-600/20 rounded-lg animate-pulse"></div>
            <div className="h-5 bg-white/15 dark:bg-gray-600/20 rounded-md w-20 animate-pulse"></div>
          </div>
          <div className="flex space-x-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="w-8 h-8 bg-white/15 dark:bg-gray-600/20 rounded-lg animate-pulse"></div>
            ))}
          </div>
          <div className="h-4 bg-white/15 dark:bg-gray-600/20 rounded-md w-32 animate-pulse"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default PageSkeleton;