import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "C:/Users/manoj555/Desktop/prismonix_chatgpt/frontend/src/styles/InnovatorForm.css"; // Relative import

const InnovatorForm = () => {
  const [formData, setFormData] = useState({
    location: "",
    education: "",
    currentRole: "",
    skills: [],
    industryFocus: "",
    expertise: "",
    innovationCategories: [],
    innovativeVision: "",
    collaborationType: "",
    needs: [],
    portfolioURL: "",
    termsAccepted: false,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dropdownOptions = {
    currentRole: ["Student", "Entrepreneur", "Researcher", "Innovator", "Industry Professional", "Freelancer", "Investor"],
    skills: ["Idea Generation", "Prototyping", "Design Thinking", "Market Research", "Business Development", "Strategic Planning", "Product Design", "Pitch Deck Creation", "Fundraising", "Entrepreneurship"],
    industryFocus: ["Agriculture", "AI & Machine Learning", "Automation & Robotics", "Biotechnology", "Clean Energy & Environment", "Construction & Real Estate", "Consumer Goods & Services", "Cybersecurity", "E-Commerce", "EdTech", "Finance & FinTech", "Gaming & Entertainment"],
    expertise: ["Product Design", "Business Strategy", "Project Management", "Software Development", "Hardware Engineering", "UI/UX Design", "Data Science & AI", "Machine Learning", "Blockchain Development"],
    innovationCategories: ["Technology", "Healthcare", "Education", "Environment", "Social Impact"],
    collaborationType: ["Technical Support", "Investment", "Co-Founder Search", "Idea Validation", "Mentorship", "Team Building", "Networking", "Market Research"],
    needs: ["Mentorship", "Funding", "Team Building", "Networking", "Collaboration"],
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMultiSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options).filter((opt) => opt.selected).map((opt) => opt.value);
    setFormData((prev) => ({ ...prev, [name]: selectedValues }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      alert("Please accept the terms and conditions.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication token not found. Please log in again.");
      navigate("/sign-in");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/innovator-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Unknown error");
      }

      alert("Profile saved successfully!");
      navigate("/innovatorhome");
    } catch (error) {
      console.error("Profile save error:", error);
      alert(`Failed to save profile: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-creation-container">
      <h1>Welcome Innovator!</h1>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Where Are You From?</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} disabled={loading} />
        </div>

        <div className="form-group">
          <label>Education</label>
          <input type="text" name="education" value={formData.education} onChange={handleChange} disabled={loading} />
        </div>

        <div className="form-group">
          <label>Current Role</label>
          <select name="currentRole" value={formData.currentRole} onChange={handleChange} disabled={loading}>
            <option value="">Select an option</option>
            {dropdownOptions.currentRole.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Skills</label>
          <select name="skills" multiple onChange={handleMultiSelectChange} disabled={loading}>
            {dropdownOptions.skills.map((skill) => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Industry Focus</label>
          <select name="industryFocus" value={formData.industryFocus} onChange={handleChange} disabled={loading}>
            <option value="">Select an option</option>
            {dropdownOptions.industryFocus.map((focus) => (
              <option key={focus} value={focus}>{focus}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Expertise</label>
          <select name="expertise" value={formData.expertise} onChange={handleChange} disabled={loading}>
            <option value="">Select an option</option>
            {dropdownOptions.expertise.map((exp) => (
              <option key={exp} value={exp}>{exp}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Innovation Categories</label>
          <select name="innovationCategories" multiple onChange={handleMultiSelectChange} disabled={loading}>
            {dropdownOptions.innovationCategories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Innovative Vision</label>
          <textarea name="innovativeVision" value={formData.innovativeVision} onChange={handleChange} disabled={loading} rows="5" placeholder="Describe your vision..." />
        </div>

        <div className="form-group">
          <label>Collaboration Type</label>
          <select name="collaborationType" value={formData.collaborationType} onChange={handleChange} disabled={loading}>
            <option value="">Select an option</option>
            {dropdownOptions.collaborationType.map((collab) => (
              <option key={collab} value={collab}>{collab}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Needs</label>
          <select name="needs" multiple onChange={handleMultiSelectChange} disabled={loading}>
            {dropdownOptions.needs.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Portfolio URL</label>
          <input type="url" name="portfolioURL" value={formData.portfolioURL} onChange={handleChange} disabled={loading} />
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} disabled={loading} />
            I accept the terms and conditions.
          </label>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>{loading ? "Saving..." : "Save Profile"}</button>
      </form>
    </div>
  );
};

export default InnovatorForm;
