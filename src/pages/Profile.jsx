
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";

export default function Profile() {
  const { currentUser, updateUsers } = useAuth();

  const [form, setForm] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || ""
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    setMessage("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone) {
      setMessage("Please fill in all fields.");
      return;
    }

    const updatedUser = {
      ...currentUser,
      name: form.name,
      email: form.email,
      phone: form.phone
    };

    const updatedUsers = JSON.parse(
      localStorage.getItem("qspiders_users") || "[]"
    );

    let userFound = false;

    for (let i = 0; i < updatedUsers.length; i++) {
      if (updatedUsers[i].id === currentUser.id) {
        updatedUsers[i] = updatedUser;
        userFound = true;
        break;
      }
    }

    if (!userFound) {
      updatedUsers.push(updatedUser);
    }

    updateUsers(updatedUsers);
    localStorage.setItem(
      "qspiders_currentUser",
      JSON.stringify(updatedUser)
    );

    setMessage("Profile updated successfully!");
  }

  if (!currentUser) {
    return <div className="profile-empty">Please login to view your profile.</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-heading">
        <span className="profile-eyebrow">MY ACCOUNT</span>
        <h1>My Profile</h1>
        <p>Manage your personal information and account details.</p>
      </div>

      <div className="profile-layout">
        <div className="profile-card">
          <div className="profile-avatar">
            {form.name.charAt(0).toUpperCase()}
          </div>

          <h2>{form.name}</h2>
          <p>{currentUser.role === "admin" ? "Administrator" : "Student"}</p>

          <div className="profile-info">
            <div>
              <span>Email Address</span>
              <strong>{form.email}</strong>
            </div>

            <div>
              <span>Phone Number</span>
              <strong>{form.phone || "Not added"}</strong>
            </div>

            <div>
              <span>Account Type</span>
              <strong>
                {currentUser.role === "admin" ? "Admin Account" : "Student Account"}
              </strong>
            </div>
          </div>
        </div>

        <div className="profile-form-card">
          <div className="profile-form-heading">
            <h2>Personal Information</h2>
            <p>Update your profile information below.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="profile-form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="profile-form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="profile-form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>

            {message && (
              <div className="profile-message">
                {message}
              </div>
            )}

            <button type="submit" className="profile-save-btn">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
