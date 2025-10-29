import React from "react";
import { useParams, Link } from "react-router-dom";
import { useUsers } from "../component/UserContext";

const UserDetail = () => {
  // Get the `id` param from the URL
  const { id } = useParams();
  // Access users from context
  const { users } = useUsers();

  // Find the user matching the route `id` (convert id to number)
  const user = users.find((u) => u.id === parseInt(id));

  // If no user matches, render a friendly fallback UI
  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <div className="mx-auto mb-4 w-20 h-20 flex items-center justify-center rounded-full bg-red-50">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 9v3m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            User not found
          </h1>
          <p className="text-gray-600 mb-6">
            We couldn't locate that user. The user may have been removed or the
            link is incorrect.
          </p>

          <Link
            to="/"
            className="inline-block px-5 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 transition-colors"
          >
            Back to Users
          </Link>
        </div>
      </div>
    );
  }

  // Render the user detail layout when a user is found
  // Prepare some derived values for a nicer UI
  const initials = (user.name || "")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Users
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="md:flex">
          {/* Left column: avatar + basic */}
          <div className="md:w-1/3 bg-gradient-to-br from-indigo-50 to-white p-6 flex flex-col items-center justify-center gap-4">
            <div
              className="w-28 h-28 flex items-center justify-center rounded-full text-2xl font-semibold text-white"
              style={{ background: "linear-gradient(135deg,#6366f1,#7c3aed)" }}
              aria-hidden="true"
            >
              {initials || "U"}
            </div>
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-sm text-gray-500">{user.username || "—"}</p>
            </div>

            <div className="mt-3 w-full">
              <a
                href={`mailto:${user.email}`}
                className="block text-sm text-gray-700 hover:text-indigo-600 truncate"
              >
                <span className="font-medium">Email:</span>{" "}
                {user.email ?? "N/A"}
              </a>
              <a
                href={user.phone ? `tel:${user.phone}` : undefined}
                className="block text-sm text-gray-700 hover:text-indigo-600 mt-1"
              >
                <span className="font-medium">Phone:</span>{" "}
                {user.phone ?? "N/A"}
              </a>
              <a
                href={
                  user.website
                    ? user.website.startsWith("http")
                      ? user.website
                      : `https://${user.website}`
                    : undefined
                }
                target="_blank"
                rel="noreferrer"
                className="block text-sm text-gray-700 hover:text-indigo-600 mt-1 truncate"
              >
                <span className="font-medium">Website:</span>{" "}
                {user.website ?? "N/A"}
              </a>
            </div>
          </div>

          {/* Right column: address, company, actions */}
          <div className="md:w-2/3 p-6">
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-semibold text-gray-700">Profile</h2>
              <div className="text-sm text-gray-400">{`ID: ${user.id}`}</div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  Address
                </h3>
                <p className="text-sm text-gray-700">
                  {user.address?.street ?? "N/A"}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  {user.address?.city
                    ? `${user.address.city} • ${user.address?.zipcode ?? ""}`
                    : "N/A"}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  Company
                </h3>
                <p className="text-sm text-gray-700">
                  {user.company?.name ?? "N/A"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {user.company?.catchPhrase ?? ""}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to={`/users/${user.id}/edit`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm rounded-md shadow-sm hover:bg-indigo-700"
              >
                Edit Profile
              </Link>

              <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 text-sm rounded-md hover:bg-gray-50"
              >
                Back to list
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
