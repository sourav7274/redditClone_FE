import { motion } from "motion/react";

const SidebarSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-lg border-l border-white/20 dark:border-gray-700/30 p-6 transition-all duration-1000"
    >
      {/* Welcome Message Skeleton */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-5 bg-white/20 dark:bg-gray-600/30 rounded-md w-32 animate-pulse"></div>
        <div className="w-12 h-6 bg-white/15 dark:bg-gray-600/20 rounded-full animate-pulse"></div>
      </div>

      {/* Friends Section Skeleton */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-5 bg-white/20 dark:bg-gray-600/30 rounded-md w-24 animate-pulse"></div>
          <div className="w-8 h-8 bg-white/15 dark:bg-gray-600/20 rounded-lg animate-pulse"></div>
        </div>
        
        {/* Friend Items Skeleton */}
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-white/5 dark:bg-gray-700/20 rounded-xl"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/15 dark:bg-gray-600/20 rounded-full animate-pulse"></div>
                <div>
                  <div className="h-4 bg-white/15 dark:bg-gray-600/20 rounded-md w-20 mb-1 animate-pulse"></div>
                  <div className="h-3 bg-white/10 dark:bg-gray-600/15 rounded-md w-12 animate-pulse"></div>
                </div>
              </div>
              <div className="w-8 h-8 bg-white/15 dark:bg-gray-600/20 rounded-lg animate-pulse"></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* People You May Know Section Skeleton */}
      <div className="mb-6">
        <div className="h-5 bg-white/20 dark:bg-gray-600/30 rounded-md w-36 mb-4 animate-pulse"></div>
        <div className="space-y-3">
          {Array.from({ length: 2 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-white/5 dark:bg-gray-700/20 rounded-xl"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/15 dark:bg-gray-600/20 rounded-full animate-pulse"></div>
                <div>
                  <div className="h-4 bg-white/15 dark:bg-gray-600/20 rounded-md w-20 mb-1 animate-pulse"></div>
                  <div className="h-3 bg-white/10 dark:bg-gray-600/15 rounded-md w-16 animate-pulse"></div>
                </div>
              </div>
              <div className="w-8 h-8 bg-white/15 dark:bg-gray-600/20 rounded-lg animate-pulse"></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Activities Section Skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-white/15 dark:bg-gray-600/20 rounded animate-pulse"></div>
                <div className="h-4 bg-white/15 dark:bg-gray-600/20 rounded-md w-28 animate-pulse"></div>
              </div>
              <div className="w-4 h-4 bg-white/15 dark:bg-gray-600/20 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SidebarSkeleton;