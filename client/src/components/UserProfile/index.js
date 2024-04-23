import { Link } from "react-router-dom"
import React from 'react'
import UserInfoForm from "../UserInfoForm"

const UserProfile = ({profile}) => {
  return (
    <div>
        <h1>Player's Profile</h1>
        <h2>Name : {profile.name}</h2>
        <UserInfoForm/>
    </div>
  )
}

export default UserProfile