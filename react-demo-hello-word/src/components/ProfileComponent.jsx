import React, { useEffect } from "react";

function ProfileCompenent() {
    useEffect(() => {
        console.log("ProfileComponent mounted");
    }, []);
    return <h1>Profile Component</h1>;
}

export default ProfileCompenent;