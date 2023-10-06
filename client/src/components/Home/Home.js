import "./Home.css"
import React from "react";
function Home({username,email}){
    const user = username;
    const em = email;
    return (
        <div className="homePage">
            <h1>Welcome to the Home Page</h1>
            <p>User:{user}</p>
            <p>Email:{em}</p>
        </div>
    );
}

export default Home;