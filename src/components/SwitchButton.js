import React, { useState } from "react";

function SwitchButton() {
  const [activeTab, setActiveTab] = useState("employee");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <ul className="flex justify-end mt-3 bg-accent py-1 px-1 rounded-full">
      <li
        className={`py-2 px-4 rounded-full cursor-pointer ${
          activeTab === "employee"
            ? "bg-white text-accent"
            : "bg-accent text-white"
        }`}
        onClick={() => handleTabChange("employee")}
      >
        Member
      </li>
      <li
        className={`py-2 px-4 rounded-full cursor-pointer ${
          activeTab === "hirer"
            ? "bg-white text-accent"
            : "bg-accent text-white"
        }`}
        onClick={() => handleTabChange("hirer")}
      >
        Partner
      </li>
    </ul>
  );
}

export default SwitchButton;
