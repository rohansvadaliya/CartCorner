import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [imageError, setImageError] = useState(false);

  const handleSignout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const email = user?.email || "admin@example.com";
  const name = user?.firstname ? `${user?.firstname} ${user?.lastname}` : "Admin";
  const profileImage = user?.profilePicture || null;

  const handleImageError = () => {
    setImageError(true);
  };

  // Generate avatar with initials
  const getInitials = () => {
    if (user?.firstname && user?.lastname) {
      return `${user.firstname.charAt(0)}${user.lastname.charAt(0)}`.toUpperCase();
    }
    return "A";
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              {profileImage && !imageError ? (
                <img
                  width={100}
                  height={100}
                  src={profileImage}
                  alt="Profile"
                  className="rounded-circle mb-3"
                  onError={handleImageError}
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div
                  width={100}
                  height={100}
                  className="rounded-circle mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: "#0d6efd",
                    color: "white",
                    fontSize: "36px",
                    fontWeight: "bold",
                    margin: "0 auto",
                  }}
                >
                  {getInitials()}
                </div>
              )}
              <h3 className="card-title mb-2">{name}</h3>
              <p className="text-muted mb-4">{email}</p>
              <button
                className="btn btn-danger"
                onClick={handleSignout}
              >
                Sign Out
              </button>
              <button
                className="btn btn-secondary ms-2"
                onClick={() => navigate("/admin")}
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
