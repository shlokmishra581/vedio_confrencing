import React from 'react';
import "../App.css";

export default function LandingPage() {
    return (
        <div className="landingPageContainer">

            <nav>
                <div className="navHeader">
                    <h2>Apna Video Call</h2>
                </div>

                <div className="navlist">
                    <p>Join as guest</p>
                    <p>Register</p>

                    <div role="button">
                        <p>Login</p> 
                    </div>
                </div>
            </nav>

            <div className="landingMainContainer">

                <div>
                    <h1>
                        <span style={{ color: "#FF9839" }}>
                            Connect with your Loved Ones
                        </span>
                    </h1>

                    <p>Cover a distance by Apna Video Call</p>
                </div>

                <div>
                    <img src="/mobile.png" alt="" />
                </div>

            </div>

        </div>
    );
}