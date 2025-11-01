import { motion } from "motion/react";

const CreatePostSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="max-w-3xl bg-white/10 dark:bg-gray-800/20 backdrop-blur-lg p-6 rounded-2xl shadow-md border border-white/20 dark:border-gray-700/30 transition-all duration-1000"
    >
      {/* Header Skeleton */}
      <div className="h-6 bg-white/20 dark:bg-gray-600/30 rounded-md w-32 mb-4 animate-pulse"></div>
      
      {/* Title Input Skeleton */}
      <div className="h-10 bg-white/15 dark:bg-gray-600/20 rounded-lg mb-2 animate-pulse"></div>
      
      {/* Description Input Skeleton */}
      <div className="h-24 bg-white/15 dark:bg-gray-600/20 rounded-lg mb-4 animate-pulse"></div>
      
      {/* Bottom Actions Skeleton */}
      <div className="flex items-center justify-between">
        {/* Image Upload Skeleton */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/15 dark:bg-gray-600/20 rounded-full animate-pulse"></div>
          <div className="h-4 bg-white/15 dark:bg-gray-600/20 rounded-md w-20 animate-pulse"></div>
        </div>
        
        {/* Post Button Skeleton */}
        <div className="h-10 bg-white/20 dark:bg-gray-600/30 rounded-lg w-16 animate-pulse"></div>
      </div>
    </motion.div>
  );
};

export default CreatePostSkeleton;