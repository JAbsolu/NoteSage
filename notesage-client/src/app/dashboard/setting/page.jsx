"use client"

import DashboardNavbar from "@/components/DashboardNavbar";
import Sidebar from "@/components/Sidebar";
import { getCookie } from "@/util/cookies";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";



const SettingsPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const userId = getCookie("userId");
  const token = getCookie("token");

  // UserInfo state
  const [userInfo, setUserInfo] = useState({
    intro: "",
    school: "",
    graduationDate: "",
    image: "",
    socials: {
      twitter: "",
      linkedin: "",
      github: ""
    }
  });

  const [editMode, setEditMode] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [isPasswordSectionOpen, setIsPasswordSectionOpen] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const fetchUserData = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost/user?id=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setFirstName(result.data.firstName);
        setLastName(result.data.lastName);
        setEmailAddress(result.data.emailAddress);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  },[token, userId])

  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost/user-info?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.data) {
          setUserInfo({
            intro: result.data.intro || "",
            school: result.data.school || "",
            graduationDate: result.data.graduationDate ? new Date(result.data.graduationDate).toISOString().split('T')[0] : "",
            image: result.data.image || "",
            socials: result.data.socials || {
              twitter: "",
              linkedin: "",
              github: ""
            }
          });
          if (result.data.image) {
            setProfileImagePreview(result.data.image);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  },[userId, token])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (platform, value) => {
    setUserInfo(prev => ({
      ...prev,
      socials: {
        ...prev.socials,
        [platform]: value
      }
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
        setUserInfo(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update User basic info
      await fetch(`http://localhost/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify({
          firstName,
          lastName
        })
      });

      // Update UserInfo
      const formattedData = {
        ...userInfo,
        graduationDate: userInfo.graduationDate ? new Date(userInfo.graduationDate) : null
      };

      await fetch(`http://localhost/user-info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify({
          userId,
          ...formattedData
        })
      });

      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }

    try {
      const response = await fetch(`http://localhost/user/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify({
          userId,
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      if (response.ok) {
        alert("Password changed successfully!");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
        setIsPasswordSectionOpen(false);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchUserInfo();
  }, [fetchUserData, fetchUserInfo]);


  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar
        toggleSidebar={() => setSidebarExpanded(!sidebarExpanded)}
        firstName={firstName}
        lastName={lastName}
        emailAddress={emailAddress}
      />
      
      <div className="flex pt-16">
        {/* Sidebar */}
        <div className={`fixed h-full ${sidebarExpanded ? 'w-64' : 'w-20'} transition-all duration-300`}>
          <Sidebar isExpanded={sidebarExpanded} />
        </div>
        
        {/* Main Content */}
        <div className={`flex-1 ${sidebarExpanded ? 'ml-64' : 'ml-20'} transition-all duration-300 p-8`}>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Profile Section */}
              <div className="p-6 border-b">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Profile Information</h2>
                  {!editMode ? (
                    <button
                      onClick={() => setEditMode(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <div className="space-x-2">
                      <button
                        onClick={() => setEditMode(false)}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="col-span-1">
                    <div className="flex flex-col items-center">
                      <div className="relative mb-4">
                        {profileImagePreview ? (
                          <Image 
                            src={profileImagePreview} 
                            alt="Profile" 
                            className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
                          />
                        ) : (
                          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">No Image</span>
                          </div>
                        )}
                        {editMode && (
                          <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer">
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                            </svg>
                          </label>
                        )}
                      </div>
                      <h3 className="text-lg font-medium">{firstName} {lastName}</h3>
                      <p className="text-gray-600">{emailAddress}</p>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                          {editMode ? (
                            <input
                              type="text"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                          ) : (
                            <p className="px-3 py-2 bg-gray-50 rounded-md">{firstName}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                          {editMode ? (
                            <input
                              type="text"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                          ) : (
                            <p className="px-3 py-2 bg-gray-50 rounded-md">{lastName}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <p className="px-3 py-2 bg-gray-50 rounded-md">{emailAddress}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Introduction</label>
                        {editMode ? (
                          <textarea
                            name="intro"
                            value={userInfo.intro}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        ) : (
                          <p className="px-3 py-2 bg-gray-50 rounded-md whitespace-pre-line">
                            {userInfo.intro || "No introduction provided"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Education Section */}
             <div className="p-6 border-b">
                <h2 className="text-xl font-semibold mb-4">Education</h2>
                <div className="space-y-4">
                  <div className="mt-2 mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Intro</label>
                    <p>No intro</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">School/University</label>
                    {editMode ? (
                      <input
                        type="text"
                        name="school"
                        value={userInfo.school}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    ) : (
                      <p className="px-3 py-2 bg-gray-50 rounded-md">{userInfo.school || "Not specified"}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Date</label>
                    {editMode ? (
                      <input
                        type="date"
                        name="graduationDate"
                        value={userInfo.graduationDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    ) : (
                      <p className="px-3 py-2 bg-gray-50 rounded-md">
                        {userInfo.graduationDate || "Not specified"}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Social Media Section */}
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold mb-4">Social Media</h2>
                <div className="space-y-4">
                  <div> 
                    <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
                    {editMode ? (
                      <input
                        type="url"
                        value={userInfo.socials.twitter}
                        onChange={(e) => handleSocialChange("twitter", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="https://twitter.com/username"
                      />
                    ) : (
                      <p className="px-3 py-2 bg-gray-50 rounded-md">
                        {userInfo.socials.twitter || "Not provided"}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                    {editMode ? (
                      <input
                        type="url"
                        value={userInfo.socials.linkedin}
                        onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="https://linkedin.com/in/username"
                      />
                    ) : (
                      <p className="px-3 py-2 bg-gray-50 rounded-md">
                        {userInfo.socials.linkedin || "Not provided"}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                    {editMode ? (
                      <input
                        type="url"
                        value={userInfo.socials.github}
                        onChange={(e) => handleSocialChange("github", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="https://github.com/username"
                      />
                    ) : (
                      <p className="px-3 py-2 bg-gray-50 rounded-md">
                        {userInfo.socials.github || "Not provided"}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Password Section */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Password</h2>
                  <button
                    onClick={() => setIsPasswordSectionOpen(!isPasswordSectionOpen)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  >
                    {isPasswordSectionOpen ? "Cancel" : "Change Password"}
                  </button>
                </div>

                {isPasswordSectionOpen && (
                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <input
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                        minLength={6}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Update Password
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
