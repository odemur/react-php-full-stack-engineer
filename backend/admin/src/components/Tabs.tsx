import React, { useState } from "react";
import Users from "./Users";
import Subscribers from "./Subscribers";

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("users");

  function handleTabClick(tab: string) {
    setActiveTab(tab);
  }

  return (
    <div>
      <h3>Dashboard</h3>
      <div className="mt-4">
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handleTabClick("users")}
        >
          <button className="btn btn-warning">Usuários do Sistema</button>
        </span>{" "}
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handleTabClick("newsletter")}
        >
          <button className="btn btn-warning">Assinantes da Newsletter</button>
        </span>
      </div>
      {activeTab === "users" ? <Users /> : <Subscribers />}
    </div>
  );
};

export default Tabs;
