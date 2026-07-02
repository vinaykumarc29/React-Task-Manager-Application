import React from "react";
import { Link } from "react-router";
import "./PageNotFound.css";

function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-card">
        <h1 className="error-code">404</h1>

        <h2>Oops! Page Not Found</h2>

        <p>
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <Link to="/" className="back-btn">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFound;