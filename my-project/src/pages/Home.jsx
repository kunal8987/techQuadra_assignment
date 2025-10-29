import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useUsers } from "../component/UserContext";

// Define the Home functional component
const Home = () => {
  // Destructure users array and loading boolean from the custom hook
  const { users, loading } = useUsers();
  // Debug: log the users to the console
  console.log(users);
  // Create local state for the search input with initial empty string
  const [searchTerm, setSearchTerm] = useState("");

  // Memoize the filtered users so we only recompute when users or searchTerm change
  const filteredUsers = useMemo(() => {
    // Return users whose name includes the search term (case-insensitive)
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  // If data is loading, render a centered spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Render the main UI when not loading
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-1">Users</h1>
            <p className="text-sm text-gray-500">Browse and search user profiles</p>
          </div>
        </header>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <input
              type="text"
              placeholder="Search users by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-10 py-3 border border-gray-200 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Search users"
            />

            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1"
                aria-label="Clear search"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user) => (
            <Link
              key={user.id}
              to={`/user/${user.id}`}
              className="bg-white hover:shadow-lg transition-shadow rounded-xl p-5 flex items-start gap-4 border border-transparent hover:border-gray-100"
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg">
                  {user.name
                    ? user.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()
                    : "U"}
                </div>
              </div>

              {/* Details */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
                <p className="text-sm text-gray-600 mt-1">{user.email}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                    {user.address?.city ?? "Unknown city"}
                  </span>
                  <span className="ml-auto text-xs text-blue-600 font-medium">View profile →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {filteredUsers.length === 0 && (
          <div className="mt-12 text-center text-gray-500">
            <svg className="mx-auto mb-4 w-16 h-16 text-gray-300" viewBox="0 0 24 24" fill="none">
              <path d="M21 21l-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-lg">No users found matching your search.</p>
            <p className="mt-2 text-sm">Try adjusting your search or clear the filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
