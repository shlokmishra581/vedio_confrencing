import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css";
import mobileImage from "./mobile.png.jpeg";

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

                    <div role='button'>
                        <p>Login</p> 
                    </div>
                </div>
            </nav>

            <div className="landingMainContainer">
                <div>
                    <h1>
                        <span style={{ color: "#ff9839" }}>
                            Connect with your Loved Ones
                        </span>
                    </h1>

                    <p>Cover a distance by Apna Video Call</p>
                    <div role="button">
                        <Link to="/auth">Get started</Link>
                    </div>
                </div>

                <div>
                    <img src={mobileImage} alt="Video call on two smartphones" />
                </div>
            </div>
        </div>
    );
}