import React from "react";

const User = () => {
    // Retrieve the username from localStorage
    const username = localStorage.getItem("username");
    console.log(username)

    return (
        <div className="user-page">
            <h1>Welcome to the {username} Page</h1>
            <p>You are successfully logged in!</p>
        </div>
    );
};

export default User;
