'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import * as jose from 'jose';
import {
  Card,
  CardHeader,
  CardContent,
} from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { useUserStore } from "@/lib/stores/userStore"

const Callback = () => {
  const [userInfo, setUserInfo] = useState(null);
  const searchParams = useSearchParams();

useEffect(() => {
  const code = searchParams.get('code');

  const fetchToken = async (code) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/token`, { code });
    console.log("OAuth Code received from Fayda:", code);
    const { access_token } = response.data;

    const userInfoResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/userinfo/`, {
      access_token,
    });

    const decodedUserInfo = await decodeUserInfoResponse(userInfoResponse.data);

    // Send to Express API to store
    const savedUser = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, decodedUserInfo);

    // Set to localStorage and state
    localStorage.setItem('userInfo', JSON.stringify(savedUser.data));
    setUserInfo(savedUser.data);
    
  useUserStore.getState().setUser({
  name: savedUser.data.name,
  role: savedUser.data.role || "citizen",
  email: savedUser.data.email,
})
console.log("Redirecting to /");

    // Redirect to dashboard
    window.location.href = '/'; 

  } catch (error) {
    console.error('Error fetching token or user info:', error);
  }
};

  if (code) {
    fetchToken(code);
  } else {
    // try to load from localStorage
    const stored = localStorage.getItem('userInfo');
    if (stored) {
      setUserInfo(JSON.parse(stored));
    }
  }

  const handleLogout = () => {
  localStorage.removeItem('userInfo');
  setUserInfo(null);
};
}, [searchParams]);


  return (
    <div className="flex min-h-screen bg-white text-black">
      <aside className="w-64 bg-black text-white p-6 hidden md:block">
        <div className="text-2xl font-bold mb-6 flex items-center space-x-3">
          <img src="/national-id-logo.png" alt="Logo" className="h-8 w-8" />
          <span>Fayda Dashboard</span>
        </div>
        <nav>
          <ul className="space-y-4 text-sm">
            <li className="text-gray-400">Home</li>
            <li className="text-gray-400">Users</li>
            <li className="text-gray-400">Settings</li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">User Information</h1>
        {userInfo ? (
          <Card className="max-w-3xl mx-auto shadow-md">
            <CardHeader className="flex items-center space-x-4">
              <Avatar className="h-20 w-20 border border-black">
                <AvatarImage src={userInfo.picture} alt="User" />
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">{userInfo.name || 'N/A'}</h2>
                <p className="text-sm text-muted-foreground">{userInfo.email || 'N/A'}</p>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Info label="Gender" value={userInfo.gender} />
                <Info label="Phone" value={userInfo.phone_number} />
                <Info label="Nationality" value={userInfo.nationality} />
                <Info label="Date of Birth" value={userInfo.birthdate} />
                <Info
                  label="Address"
                  value={
                    userInfo.address
                      ? `${userInfo.address.zone}, ${userInfo.address.woreda}, ${userInfo.address.region}`
                      : 'N/A'
                  }
                />
              </ul>
            </CardContent>
          </Card>
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div>
    <Label className="text-sm font-medium text-gray-600">{label}</Label>
    <p className="text-black">{value || 'N/A'}</p>
  </div>
);

const decodeUserInfoResponse = async (userinfoJwtToken) => {
  try {
    return jose.decodeJwt(userinfoJwtToken);
  } catch (error) {
    console.error('Error decoding JWT user info:', error);
    return null;
  }
};

export default Callback;
