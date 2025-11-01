import { motion } from "motion/react";

const CommentSkeleton = ({ count = 3 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 p-4 bg-white/5 dark:bg-gray-700/20 rounded-xl border border-white/10 dark:border-gray-600/30"
        >
            {/* Comment Input Skeleton */}
            <div className="flex items-start space-x-3 mb-4">
                <div className="w-8 h-8 bg-white/15 dark:bg-gray-600/20 rounded-full animate-pulse"></div>
                <div className="flex-1">
                    <div className="h-20 bg-white/15 dark:bg-gray-600/20 rounded-lg mb-3 animate-pulse"></div>
                    <div className="h-8 bg-white/20 dark:bg-gray-600/30 rounded-lg w-24 animate-pulse"></div>
                </div>
            </div>

            {/* Comments List Skeleton */}
            <div className="space-y-3">
                {Array.from({ length: count }).map((_, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-start space-x-3 p-3 bg-white/5 dark:bg-gray-600/20 rounded-lg"
                    >
                        {/* Avatar Skeleton */}
                        <div className="w-8 h-8 bg-white/15 dark:bg-gray-600/20 rounded-full animate-pulse"></div>
                        <div className="flex-1">
                            {/* Name Skeleton */}
                            <div className="h-3 bg-white/15 dark:bg-gray-600/20 rounded-md w-20 mb-2 animate-pulse"></div>
                            {/* Comment Content Skeleton */}
                            <div className="space-y-1">
                                <div className="h-3 bg-white/10 dark:bg-gray-600/15 rounded-md w-full animate-pulse"></div>
                                <div className="h-3 bg-white/10 dark:bg-gray-600/15 rounded-md w-3/4 animate-pulse"></div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default CommentSkeleton;