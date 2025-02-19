import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const TaskLoader = () => {
    return (
        <div className="inline-flex items-center gap-2">
            <div className="relative w-5 h-5">
                <div className="absolute inset-0">
                    <CheckCircle2
                        className="w-5 h-5 text-purple-500 animate-spin"
                    />
                </div>
                <div className="absolute inset-0 animate-ping opacity-40">
                    <CheckCircle2
                        className="w-5 h-5 text-blue-500"
                    />
                </div>
            </div>
            <span className="text-sm text-gray-600 font-medium">
                Loading...
            </span>
        </div>
    );
};

export default TaskLoader;