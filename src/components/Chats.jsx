import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import "../stylings/resources.css";
import axios from "axios";

const Chats = () => {
  const { currentUser } = useContext(AuthContext);

  const rsrcPoliceStation = ["Personnel", "Patrol Vehicel", "Police Van"];
  const rsrcHospital = ["Beds", "Ambulances", "ICUs", "Doctors", "Nurses"];
  const rsrcFireBrigades = [
    "Personnel",
    "Fire fighting vehicle",
    "Rescue Vehicle",
    "Search and Rescue Team",
  ];
  const rsrcNGO = ["Volunteers", "Tents", "Food Packets", "Water Bottles"];

  const resourcesObj = {
    police: rsrcPoliceStation,
    hospital: rsrcHospital,
    fire_brigades: rsrcFireBrigades,
    ngo: rsrcNGO,
  };

  const resourcesArr = resourcesObj[currentUser.role];

  const [resource, setResource] = useState({});

  const handleInputChange = (e) => {
    const inputId = e.target.id;
    const value = e.target.value;

    setResource((prevValue) => ({
      ...prevValue,
      [resourcesArr[inputId]]: value,
    }));
  };

  const assignResources = (e) => {
    e.preventDefault();
    console.log(resource);
    // code to assign the resource
    axios
      .post(`http://localhost:8080/api/v1/agent-message/${currentUser.role}/assign`, resource)
      .then((response) => {
        // Handle success
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });

    setResource({});
  };

  const freeResources = (e) => {
    e.preventDefault();
    // code to free the resources
    axios
      .post(`http://localhost:8080/api/v1/agent-message/${currentUser.role}/free`, resource)
      .then((response) => {
        // Handle success
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
    setResource({});
  };

  return (
    <div className="chats">
      {resourcesArr?.map((resrc, i) => (
        <div className="resourcelist">
          <div className="resourceitem" key={i}>
            <span className="resourcename">{resrc}:</span>
            <input
              id={i}
              type="number"
              onChange={handleInputChange}
              defaultValue="0"
            />
          </div>
        </div>
      ))}
      <div className="assign-free-btn">
        <button onClick={assignResources} className="requestResourceBtn">
          Assign
        </button>
        <button onClick={freeResources} className="requestResourceBtn">
          Free
        </button>
      </div>
    </div>
  );
};

export default Chats;
