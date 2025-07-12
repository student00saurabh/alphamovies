# 🎬 AlphaMovies

![AlphaMovies Banner](public/images/alpha.png)

**AlphaMovies** is a beautifully designed, responsive movie exploration platform that allows users to browse, view, and save movies. Built using the **MERN-lite stack** (MongoDB, Express, Node.js, EJS), this project emphasizes clean code, user experience, scalability, and modern web techniques.

🔗 **Live Site**: [https://alphamovies.onrender.com](https://alphamovies.onrender.com)

---

## 📌 Key Features

- 🔐 **User Authentication** (Signup, Login, Logout)
- 📬 **Welcome Email** upon Signup using NodeMailer
- 💾 **Save/Unsave Movies** to personal list (user-specific)
- 📂 **Category-wise Movie Display** with Search & Pagination
- 📄 **Detailed Movie View Page** with Save/Unsave Button
- 📱 **Mobile-Responsive Navbar Search** with custom CSS overrides
- 🎨 **AOS Scroll Animations** for elegant transitions
- ⚡ Optimized movie card grid with proper image fallback
- 🧠 Smart duplicate check to prevent re-saving movies
- 📆 Date formatting and clean UI/UX

---

## ⚙️ Technologies Used & Their Advantages

| Technology | Purpose | Why We Chose It |
|-----------|---------|-----------------|
| **Node.js** | Backend runtime | Asynchronous, non-blocking, great for scalable web apps |
| **Express.js** | Web framework | Lightweight, minimal, and flexible — better than bulky frameworks |
| **MongoDB + Mongoose** | Database | Schema-based, document-oriented, and perfect for quick development |
| **EJS** | Template engine | Gives full control of HTML with embedded JS — great for SSR |
| **Bootstrap 5** | Frontend framework | Fast, responsive layout and utilities — better than custom CSS for MVPs |
| **AOS.js** | Animations | Plug & play scroll animations for modern design |
| **Passport.js** | Authentication | Simple and extensible auth library — lighter than OAuth for basic needs |
| **NodeMailer** | Email service | Reliable email delivery during signup and password reset |

---

## 🛠 Code Structure

AlphaMovies/
├── controllers/         # Route logic (auth, movies, save, unsave)
├── models/              # Mongoose schemas (User, Movie, SavedMovie)
├── routes/              # Express routes for signup, login, movies, user actions
├── views/               # EJS templates
│   ├── layouts/         # Reusable layout boilerplates (header, footer)
│   └── movie/           # Index, Show, YourMovies, Search result pages
├── public/              # Static files: CSS, JS, images, favicon
├── utils/               # Custom utilities like wrapAsync, mail setup
├── app.js               # Main Express app with middleware and routes
└── .env                 # Environment variables (never commit this)




---

## 💡 Optimizations Implemented

- ✅ **Query Optimization**: Category & Search filters combined in a single `$or` query
- ✅ **Flash Messaging**: Shows user feedback (success/failure) without manual DOM handling
- ✅ **Image Fallback**: Default image if no movie image loads
- ✅ **Prevent Duplicate Saves**: Server-side check avoids repeated entries
- ✅ **Responsive Design**: Bootstrap + custom CSS ensures layout adapts to all devices
- ✅ **Clean EJS Components**: Reusable layouts minimize redundancy
- ✅ **Secure Sessions**: Session handling using `express-session` and `connect-flash`

---

## ✨ User Features

- 👤 **Signup**:
  - Validated form
  - Sends welcome email (via NodeMailer)
  - Session saved
- 🎟 **Login/Logout**:
  - Flash message feedback
  - Keeps session across pages
- 💾 **Save/Unsave Movies**:
  - Prevents duplicates
  - Accessible via “Your Movies” page
- 🔍 **Smart Search & Filters**:
  - Case-insensitive regex-based search
  - Paginated results
- 🎞 **Movie Page**:
  - Shows image, title, short/long description
  - Responsive layout with AOS fade-up animations
- 📱 **Mobile Optimized Navbar**:
  - Custom styled search bar with auto-sizing input
  - Doesn’t break layout with hamburger + logo

---

## 📬 Signup Email Sample

When a user signs up, they receive a clean, branded HTML email:

```html
<h2>Welcome to AlphaMovies, Saurabh!</h2>
<p>You're now part of the cinematic journey!</p>
<ul>
  <li>💾 Save your favorite movies</li>
  <li>🎬 Explore by category</li>
  <li>📅 See latest additions first</li>
</ul>
