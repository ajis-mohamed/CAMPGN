import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
            <div className="text-center max-w-md mx-auto">
                {/* Large 404 Header */}
                <h1 className="text-9xl font-extrabold text-indigo-600 tracking-widest">404</h1>

                {/* Error Badge */}
                <div className="bg-indigo-500 text-white px-2 text-sm rounded rotate-12 absolute inline-block">
                    Page Not Found
                </div>

                {/* Description */}
                <p className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                    Oops! You've wandered off the path.
                </p>
                <p className="text-gray-500 mb-8">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        to="/"
                        className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition duration-200"
                    >
                        Back to Dashboard
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto px-6 py-3 bg-white text-gray-700 border border-gray-300 font-medium rounded-lg shadow-sm hover:bg-gray-50 transition duration-200"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}