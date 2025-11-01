import { motion } from "motion/react";

const PostSkeleton = ({ count = 3 }) => {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-lg p-6 rounded-2xl border border-white/20 dark:border-gray-700/30 transition-all duration-1000"
        >
          {/* Header Skeleton */}
          <div className="flex items-center space-x-3 mb-4">
            {/* Avatar Skeleton */}
            <div className="w-10 h-10 bg-white/20 dark:bg-gray-600/30 rounded-full animate-pulse"></div>
            <div className="flex-1">
              {/* Name Skeleton */}
              <div className="h-4 bg-white/20 dark:bg-gray-600/30 rounded-md w-32 mb-2 animate-pulse"></div>
              {/* Date Skeleton */}
              <div className="h-3 bg-white/15 dark:bg-gray-600/20 rounded-md w-20 animate-pulse"></div>
            </div>
          </div>

          {/* Title Skeleton */}
          <div className="mb-3">
            <div className="h-6 bg-white/20 dark:bg-gray-600/30 rounded-md w-3/4 mb-2 animate-pulse"></div>
          </div>

          {/* Description Skeleton */}
          <div className="mb-4 space-y-2">
            <div className="h-4 bg-white/15 dark:bg-gray-600/20 rounded-md w-full animate-pulse"></div>
            <div className="h-4 bg-white/15 dark:bg-gray-600/20 rounded-md w-5/6 animate-pulse"></div>
            <div className="h-4 bg-white/15 dark:bg-gray-600/20 rounded-md w-4/5 animate-pulse"></div>
          </div>

          {/* Image Skeleton (randomly show/hide to simulate real posts) */}
          {Math.random() > 0.4 && (
            <div className="h-96 w-full bg-white/15 dark:bg-gray-600/20 rounded-xl mb-4 animate-pulse"></div>
          )}

          {/* Action Buttons Skeleton */}
          <div className="flex items-center gap-6">
            {/* Like Button Skeleton */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/15 dark:bg-gray-600/20 rounded-lg animate-pulse"></div>
              <div className="h-4 bg-white/15 dark:bg-gray-600/20 rounded-md w-8 animate-pulse"></div>
            </div>
            
            {/* Comment Button Skeleton */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/15 dark:bg-gray-600/20 rounded-lg animate-pulse"></div>
              <div className="h-4 bg-white/15 dark:bg-gray-600/20 rounded-md w-8 animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PostSkeleton;