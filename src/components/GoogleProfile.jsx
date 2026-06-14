import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { authServerAxios, googleApiAxios } from "../lib/axios.lib";

const GoogleProfile = () => {
  const [userData, setUserData] = useState(null);
  const googleAccessToken = Cookies.get('access_token') || '';
  console.log("googleAccessToken", googleAccessToken);

  useEffect(() => {
    (async () => {
      if (googleAccessToken) {
        try {
          // Retrieve user info
          const userResponse = await googleApiAxios.get('/userinfo', {
            headers: {
              Authorization: `Bearer ${googleAccessToken}`,
            },
          });
          console.log("userResponse", userResponse);
          setUserData(() => userResponse.data);
        } catch (error) {
          window.location.href = '/';
          console.error(error);
          console.log(JSON.stringify(error, undefined, 2));
        }
      } else if (location.pathname.includes('v2')) {
        try {
          const response = await authServerAxios.get('/user/profile/google');
          console.log("response", response);
          setUserData(() => response.data.user);
        } catch (error) {
          if (error.status === 403 || error.status === 500) {
            window.location.href = '/';
          }
        }
      } else {
        window.location.href = '/';
      }
    })();
  }, []);

  return (
    <div className='w-full min-h-screen flex flex-col items-center p-12 gap-4 text-neutral-200 bg-neutral-900'>
      <div className='mt-4 flex flex-col gap-6 items-center'>
        <div className='bg-neutral-700 h-max w-max p-6 rounded-full'>
          <svg
            className='fill-neutral-900 stroke-neutral-900'
            strokeWidth='0'
            viewBox='0 0 488 512'
            height='6rem'
            width='6rem'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z'></path>
          </svg>
        </div>
        <div className='flex flex-col justify-center'>
          <p className='text-xl mb-4 text-center'>
            Hello {userData?.name || userData?.email} you&apos;ve
            <br /> logged in with <span className='italic text-neutral-400'>{userData?.email}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoogleProfile;