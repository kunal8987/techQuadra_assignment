
# React User Management App

A simple user management frontend application built with React and Tailwind CSS. This app allows users to view, search, and add new users, with data fetched from an external API and stored locally.

## Features

- **Home Page**: Displays a list of users with search functionality by name. Includes both API-fetched and locally created users.
- **User Detail Page**: Shows detailed information for a selected user, including name, email, phone, website, and address.
- **Create User Page**: A form to add new users, stored in local state (not persisted to the API).
- **Search Functionality**: Case-insensitive search to filter users by name.
- **Responsive Design**: Built with Tailwind CSS for a clean, mobile-friendly interface.
- **Routing**: Uses React Router for navigation between pages.

## Technologies Used

- **React**: For building the user interface.
- **React Router**: For client-side routing.
- **Tailwind CSS**: For styling and responsive design.
- **Axios**: For making HTTP requests to the external API.
- **Context API**: For state management of user data.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/kunal8987/techQuadra_assignment
   cd my-project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Tailwind CSS** (if not already done):
   - Install Tailwind CSS:
     ```bash
     npm install -D tailwindcss postcss autoprefixer
     npx tailwindcss init -p
     ```
   - Update `tailwind.config.js`:
     ```javascript
     /** @type {import('tailwindcss').default} */
     module.exports = {
       content: [
         "./src/**/*.{js,jsx,ts,tsx}",
       ],
       theme: {
         extend: {},
       },
       plugins: [],
     }
     ```
   - Add Tailwind directives to `src/index.css`:
     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```

## Usage

1. **Start the development server**:
   ```bash
   npm start
   ```
   The app will run on `http://localhost:3000`.

2. **Navigate the app**:
   - **Home Page (/)**: View the list of users, use the search bar to filter by name, and click on a user to view details.
   - **User Detail Page (/user/:id)**: Displays detailed information for the selected user.
   - **Create User Page (/create)**: Fill out the form to add a new user, then return to the home page to see it in the list.

## Project Structure

```
user-management-app/
├── public/
│   └── index.html
├── src/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── UserDetail.jsx
│   │   ├── CreateUser.jsx
│   │   
│   ├── component/
│   │   └── UserContext.jsx
|   |    └── Navbar.jsx
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

- **pages/**: Contains the main UI components (Home, UserDetail, CreateUser).
- **component/**: Contains the UserContext for managing user state.
- **App.js**: Main app component with routing.
- **index.js**: Entry point for the React app.

## API

The app fetches initial user data from [JSONPlaceholder](https://jsonplaceholder.typicode.com/users), a free REST API for testing and prototyping.

- **Endpoint**: `https://jsonplaceholder.typicode.com/users`
- **Data**: Returns an array of user objects with fields like id, name, email, address, phone, and website.

Locally created users are stored in memory and combined with API data for display.



This README provides a clear overview, installation steps, and usage instructions to help users get started with the app. If you need any modifications or additional sections, let me know!
