"use client";
import { DashboardContext } from "@/app/context/ApiContext";
import Image from "next/image";
import React, { useContext } from "react";

const ProfileCard = () => {
  const { currentUser, lastLoginTime } = useContext(DashboardContext);

    // Handle case where currentUser might be null or undefined
    const userImage = currentUser?.image || "https://via.placeholder.com/85";
    const username = currentUser?.username || "Unknown User";

  return (
    <>
      <Image
        src={userImage}
        alt={username}
        className="profile-image"
        width={85} // Adjust width to match placeholder size
        height={85} // Adjust height to match placeholder size
      />
      <div className="profile-details">
        <h2>{currentUser.username}</h2>
      </div>
      <h6>
        Last login: {lastLoginTime} <span></span>
      </h6>
    </>
  );
};

export default ProfileCard;
