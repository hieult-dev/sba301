import React, { useEffect } from 'react';

function ProfileComponent() {
    //const [user, setUser] = useState(null);
   useEffect(() => {
    // This effect runs once when the component is mounted
    console.log('ProfileComponent mounted');
   }, []);
  return (
    <div>
      <h1>User Profile</h1>
      <p>This is the profile component.</p>
    </div>
  );
}

export default ProfileComponent;