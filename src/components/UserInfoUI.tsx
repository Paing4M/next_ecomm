'use client'

import {UserButton, useUser} from "@clerk/nextjs";
import React from "react";

interface UserInfoUIProps {
  handleSignInModal: () => void
  className?: string
}

const UserInfoUI = ({handleSignInModal, className}: UserInfoUIProps) => {
  const {user} = useUser()


  return (
    <div>
      {!user ? (
        <button onClick={handleSignInModal} className={`border-none outline-none text-md font-bold ${className}`}>
          Sign in
        </button>

      ) : (
        <UserButton appearance={{
          elements: {
            userButtonAvatarBox: {
              width: '35px',
              height: '35px',
            }
          }
        }}/>
      )}

    </div>
  )
}

export default UserInfoUI