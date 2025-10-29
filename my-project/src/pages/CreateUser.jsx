import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../component/UserContext";

// Define the CreateUser functional component
const CreateUser = () => {
  // Initialize form data state with name, email, and city
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
  });

  // Initialize errors state to store validation messages
  const [errors, setErrors] = useState({});

  // Get the addUser function from context
  const { addUser } = useUsers();

  // Get the navigate function from react-router
  const navigate = useNavigate();

  // Handle input changes for all form fields
  const handleChange = (e) => {
    // Destructure name and value from the event target
    const { name, value } = e.target;
    // Update the corresponding field in formData
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when the user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate the form and return an object of errors
  const validateForm = () => {
    // Object to collect validation errors
    const newErrors = {};

    // Validate name: required and non-empty after trimming
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Validate email: required and basic email format
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Validate city: required and non-empty after trimming
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    // Return collected errors (empty object if no errors)
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    // Run validation and capture any errors
    const formErrors = validateForm();
    // If there are validation errors, set them and abort submit
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Add the new user via context
    addUser(formData);
    // Navigate back to the users list
    navigate("/");
  };

  // Render the form UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            <span className="mr-2 text-xl">←</span> Back to Users
          </button>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
          {/* Left decorative panel */}
          <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-indigo-600 to-teal-500 text-white p-8">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold">Add New User</h2>
            <p className="mt-2 text-sm text-white/90 text-center px-6">
              Create a user to manage assignments. All fields are required.
            </p>
          </div>

          {/* Form panel */}
          <div className="p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">
              Create User
            </h1>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition ${
                    errors.name
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-200 focus:ring-indigo-100"
                  }`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition ${
                    errors.email
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-200 focus:ring-indigo-100"
                  }`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City name"
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition ${
                    errors.city
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-200 focus:ring-indigo-100"
                  }`}
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-lg shadow-md transform hover:-translate-y-0.5 transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
                  </svg>
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
