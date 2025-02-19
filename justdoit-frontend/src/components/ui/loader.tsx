import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const Loader = (
    { className }: { className?: string }
) => {
    return (
        <div className={"flex flex-col items-center justify-center p-8 space-y-4" + (className ? ` ${className}` : '')}>
            {/* Logo and App Name */}
            <div className="flex items-center mb-4">
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    Just Do It ☑️
                </span>
            </div>

            {/* Animated Checkboxes */}
            <div className="flex items-center space-x-2">
                <div className="animate-bounce delay-0">
                    <Circle
                        className="text-blue-500 transition-colors duration-300"
                        size={24}
                    />
                </div>
                <div className="animate-bounce delay-100">
                    <CheckCircle2
                        className="text-purple-500 transition-colors duration-300"
                        size={24}
                    />
                </div>
                <div className="animate-bounce delay-200">
                    <Circle
                        className="text-blue-500 transition-colors duration-300"
                        size={24}
                    />
                </div>
            </div>

            {/* Loading Text */}
            <div className="text-gray-600 mt-4 text-sm font-medium animate-pulse">
                Loading your tasks...
            </div>

            {/* Progress Bar */}
            <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 animate-progress"
                    style={{
                        animation: 'progress 1.5s ease-in-out infinite'
                    }}
                />
            </div>

            <style jsx>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          50% {
            width: 100%;
          }
          100% {
            width: 0%;
          }
        }
        .delay-100 {
          animation-delay: 100ms;
        }
        .delay-200 {
          animation-delay: 200ms;
        }
      `}</style>
        </div>
    );
};

export default Loader;