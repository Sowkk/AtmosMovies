import React, { useEffect } from 'react';

function CurrentLocation({ onLocationFetched, onPermissionChange }) {
  useEffect(() => {
    //navigator is a windows object
    if (navigator.geolocation) {//if browser supports geolocation

      navigator.geolocation.getCurrentPosition(
        //success callback func
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          onPermissionChange('granted'); // Calling the callback to update permission status
          onLocationFetched(location); // Calling the callback to pass the location
        },

        //failure callback func
        (error) => {
          // error.PERMISSION_DENIED indicates the user denied permission
          if (error.code === error.PERMISSION_DENIED) {
            onPermissionChange('denied'); // Calling the callback to update permission status
          } else {//remaining errors
            console.error("Error while getting location", error);
          }
        }
      );
    } else {//if not supports
      console.error('Geolocation is not supported by this browser.');
    }
  }, [onLocationFetched, onPermissionChange]);

  return null; // This component doesn't render anything
}

export default CurrentLocation;
