import React, { useState, useEffect } from 'react';

const InnovatorProfilePage = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    email: '',
    position: '',
    company: '',
    location: { country: '', city: '' },
    phone: '',
    address: '',
    education: { qualification: '', institution: '', graduationYear: '' },
    professionalBackground: { currentRole: '', experience: '', skills: [] },
    innovationDetails: { category: '', industryFocus: [], vision: '', problem: '', stage: '' },
    collaborationPreferences: { lookingFor: [], collaborationType: '', geographical: '' },
    projects: [{ title: '', description: '', stage: '' }],
    achievements: { awards: '', patents: '' },
    portfolio: { link: '', documents: [] },
    resume: ''
  });

  // Dummy function to simulate fetching data
  useEffect(() => {
    // Assuming the user data is fetched from an API
    const fetchedData = {
      firstName: 'Kumar',
      lastName: 'Agarwal',
      dob: '1995-05-22',
      gender: 'Male',
      email: 'kumar.agarwal@email.com',
      position: 'Problem Solving Expert',
      company: 'Rajiv Gandhi Tech Sol Ltd',
      location: { country: 'India', city: 'Nuzvid' },
      phone: '+91 9876543210',
      address: 'Nuzvid, Andhra Pradesh',
      education: { qualification: 'Postgraduate', institution: 'RGIT', graduationYear: '2022' },
      professionalBackground: { currentRole: 'Innovator', experience: '3-5 years', skills: ['Design Thinking', 'Rapid Prototyping', 'Data Analytics'] },
      innovationDetails: { category: 'Green Innovation', industryFocus: ['AgriTech', 'Green Energy'], vision: 'Revolutionize agricultural methods', problem: 'High energy consumption in irrigation', stage: 'Prototype' },
      collaborationPreferences: { lookingFor: ['Mentorship', 'Funding'], collaborationType: 'Co-Development', geographical: 'Global' },
      projects: [{ title: 'Smart Irrigation App', description: 'App to control solar-powered irrigation remotely', stage: 'Prototype' }],
      achievements: { awards: 'Winner of Green Innovation Challenge 2023', patents: 'Filed for solar-powered irrigation tech' },
      portfolio: { link: 'www.rameshportfolio.com', documents: [] },
      resume: 'resume_link.pdf'
    };
    setUserData(fetchedData);
  }, []);

  const handleEdit = (field, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>

      <div className="profile-section">
        <h2>Personal Info</h2>
        <div>
          <label>Full Name: </label>
          <span>{userData.firstName} {userData.lastName}</span>
          <button onClick={() => handleEdit('firstName', 'NewFirstName')}>Edit</button>
        </div>
        <div>
          <label>DOB: </label>
          <span>{userData.dob}</span>
          <button onClick={() => handleEdit('dob', '1996-05-22')}>Edit</button>
        </div>
        <div>
          <label>Email: </label>
          <span>{userData.email}</span>
          <button onClick={() => handleEdit('email', 'newemail@example.com')}>Edit</button>
        </div>
        <div>
          <label>Phone Number: </label>
          <span>{userData.phone}</span>
          <button onClick={() => handleEdit('phone', '+91 9123456789')}>Edit</button>
        </div>
        <div>
          <label>Location: </label>
          <span>{userData.location.city}, {userData.location.country}</span>
          <button onClick={() => handleEdit('location', { city: 'NewCity', country: 'NewCountry' })}>Edit</button>
        </div>
      </div>

      <div className="profile-section">
        <h2>Education</h2>
        <div>
          <label>Highest Qualification: </label>
          <span>{userData.education.qualification}</span>
          <button onClick={() => handleEdit('education', { qualification: 'Master\'s', institution: 'University X', graduationYear: '2023' })}>Edit</button>
        </div>
        <div>
          <label>Institution: </label>
          <span>{userData.education.institution}</span>
        </div>
        <div>
          <label>Year of Graduation: </label>
          <span>{userData.education.graduationYear}</span>
        </div>
      </div>

      <div className="profile-section">
        <h2>Professional Background</h2>
        <div>
          <label>Current Role: </label>
          <span>{userData.professionalBackground.currentRole}</span>
        </div>
        <div>
          <label>Years of Experience: </label>
          <span>{userData.professionalBackground.experience}</span>
        </div>
        <div>
          <label>Key Skills: </label>
          <span>{userData.professionalBackground.skills.join(', ')}</span>
        </div>
      </div>

      <div className="profile-section">
        <h2>Innovation Details</h2>
        <div>
          <label>Innovation Category: </label>
          <span>{userData.innovationDetails.category}</span>
        </div>
        <div>
          <label>Industry Focus: </label>
          <span>{userData.innovationDetails.industryFocus.join(', ')}</span>
        </div>
        <div>
          <label>Vision: </label>
          <span>{userData.innovationDetails.vision}</span>
        </div>
        <div>
          <label>Problem Being Solved: </label>
          <span>{userData.innovationDetails.problem}</span>
        </div>
        <div>
          <label>Current Stage: </label>
          <span>{userData.innovationDetails.stage}</span>
        </div>
      </div>

      <div className="profile-section">
        <h2>Collaboration Preferences</h2>
        <div>
          <label>Looking For: </label>
          <span>{userData.collaborationPreferences.lookingFor.join(', ')}</span>
        </div>
        <div>
          <label>Preferred Collaboration Type: </label>
          <span>{userData.collaborationPreferences.collaborationType}</span>
        </div>
        <div>
          <label>Geographical Preferences: </label>
          <span>{userData.collaborationPreferences.geographical}</span>
        </div>
      </div>

      <div className="profile-section">
        <h2>Projects</h2>
        {userData.projects.map((project, index) => (
          <div key={index}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <span>Stage: {project.stage}</span>
          </div>
        ))}
      </div>

      <div className="profile-section">
        <h2>Achievements</h2>
        <div>
          <label>Awards: </label>
          <span>{userData.achievements.awards}</span>
        </div>
        <div>
          <label>Patents: </label>
          <span>{userData.achievements.patents}</span>
        </div>
      </div>

      <div className="profile-section">
        <h2>Portfolio</h2>
        <div>
          <label>Portfolio Link: </label>
          <span>{userData.portfolio.link}</span>
        </div>
      </div>

      <div className="profile-section">
        <h2>Resume</h2>
        <div>
          <a href={userData.resume} download>Download Resume</a>
        </div>
      </div>
    </div>
  );
};

export default InnovatorProfilePage;
