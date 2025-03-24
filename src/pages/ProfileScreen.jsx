import React, { useState } from "react";
import {
  FaUser, FaMapMarkerAlt, FaBell, FaMobileAlt, FaKey, FaGlobe, FaEdit, FaSignOutAlt, FaTrash,
} from "react-icons/fa";

const ProfileScreen = () => {
  const [selectedSection, setSelectedSection] = useState("Account");

  return (
    <div className="min-h-screen flex justify-center items-center p-6 pb-22 pt-22">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-[0_0_10px_#00000066] flex flex-col md:flex-row overflow-hidden">
        
        {/* Sidebar (Left) */}
        <div className="md:w-1/3 p-4">
          <div className="relative flex flex-col items-center mb-6">
            <div className="w-20 h-20 md:w-16 md:h-16 bg-[var(--primary)] rounded-lg flex justify-center items-center text-white text-4xl font-bold shadow-lg">
              M
            </div>
            <h2 className="mt-2 text-xl font-semibold">Miranda West</h2>
            <p className="text-gray-500 text-sm text-center">
              Work hard in silence. Let your success be the noise.
            </p>
          </div>

          {/* Sidebar Menu */}
          <div className="space-y-2">
            <SidebarItem icon={<FaUser />} title="Account" selected={selectedSection === "Account"} onClick={() => setSelectedSection("Account")} />
            <SidebarItem icon={<FaMapMarkerAlt />} title="My Address" selected={selectedSection === "My Address"} onClick={() => setSelectedSection("My Address")} />
            <SidebarItem icon={<FaBell />} title="Notifications" selected={selectedSection === "Notifications"} onClick={() => setSelectedSection("Notifications")} />
            <SidebarItem icon={<FaMobileAlt />} title="Devices" selected={selectedSection === "Devices"} onClick={() => setSelectedSection("Devices")} />
            <SidebarItem icon={<FaKey />} title="Passwords" selected={selectedSection === "Passwords"} onClick={() => setSelectedSection("Passwords")} />
            <SidebarItem icon={<FaGlobe />} title="Language" selected={selectedSection === "Language"} onClick={() => setSelectedSection("Language")} />
          </div>
        </div>

        {/* Main Content (Right) */}
        <div className="md:w-2/3 p-6 text-[var(--primary)]">
          <h2 className="text-xl font-semibold">{selectedSection}</h2>
          <div className="mt-4 text-gray-600">{renderContent(selectedSection)}</div>
        </div>
      </div>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ icon, title, selected, onClick }) => (
  <div
    className={`flex items-center p-3 rounded-lg cursor-pointer ${
      selected ? "bg-[var(--primary)] text-white" : "bg-white text-gray-800 hover:bg-gray-200"
    }`}
    onClick={onClick}
  >
    <span className="mr-3">{icon}</span>
    <span>{title}</span>
  </div>
);

// Render detailed content
const renderContent = (section) => {
  switch (section) {
    case "My Address":
      return (
        <div className="space-y-2">
          <p className="pb-2">1234 Street Name, City, Country</p>
          <button className="flex items-center text-[var(--primary)] hover:underline">
            <FaEdit className="mr-2 text-lg" /> Edit Address
          </button>
        </div>
      );

    case "Account":
      return (
        <div className="grid gap-4">
          <DetailItem label="Full Name" value="Miranda West" />
          <DetailItem label="Email" value="miranda@example.com" />
          <DetailItem label="Contact" value="+123 456 7890" />
          <div className="flex space-x-4 mt-4">
            <button className="flex items-center px-4 py-2 rounded-lg bg-[var(--primary)] text-white">
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
            <button className="flex items-center px-4 py-2 rounded-lg bg-[var(--primary)] text-white">
              <FaTrash className="mr-2" /> Delete Account
            </button>
          </div>
        </div>
      );

    case "Notifications":
      return (
        <div className="grid gap-4">
          <NotificationToggle label="Email Alerts" />
          <NotificationToggle label="Push Notifications" />
          <NotificationToggle label="SMS Alerts" />
        </div>
      );

    case "Devices":
      return (
        <div className="grid gap-4">
          <DeviceItem device="iPhone 14" location="New York, USA" />
          <DeviceItem device="MacBook Pro" location="Los Angeles, USA" />
          <DeviceItem device="Windows PC" location="Chicago, USA" />
        </div>
      );

    case "Passwords":
      return (
        <div className="grid gap-2">
          <input type="password" placeholder="Enter new password" className="w-full p-2 border rounded-lg" />
          <button className="mt-2 px-4 py-2 bg-[var(--primary)] text-white rounded-lg">
            Change Password
          </button>
        </div>
      );

    case "Language":
      return (
        <select className="w-full p-2 border rounded-lg">
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
          <option>German</option>
        </select>
      );

    default:
      return <p>Select an option from the sidebar.</p>;
  }
};

// Detail Item Component (Grid Layout)
const DetailItem = ({ label, value }) => (
  <div className="grid grid-cols-2 bg-gray-100 p-3 rounded-lg">
    <span className="font-medium">{label}:</span>
    <span className="text-gray-600">{value}</span>
  </div>
);

// Notification Toggle Component
const NotificationToggle = ({ label }) => {
  const [enabled, setEnabled] = useState(false);
  return (
    <div className="grid grid-cols-[2fr_1fr] items-center">
      <span>{label}</span>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`w-12 h-6 rounded-full flex items-center transition duration-300 ${
          enabled ? "bg-[var(--primary)] justify-end" : "bg-gray-500 justify-start"
        }`}
      >
        <span className="w-5 h-5 bg-white rounded-full shadow-md"></span>
      </button>
    </div>
  );
};

// Device Item Component
const DeviceItem = ({ device, location }) => (
  <div className="grid grid-cols-2 bg-gray-100 p-3 rounded-lg">
    <div>
      <p className="font-medium">{device}</p>
      <p className="text-sm text-gray-500">{location}</p>
    </div>
    <button className="text-[var(--primary)] hover:underline">Remove</button>
  </div>
);

export default ProfileScreen;
