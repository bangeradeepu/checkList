import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";
import Content from "./content";
const App = () => {
  const GoogleAPIKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const dataAPI = import.meta.env.VITE_DATA_API;
  const [cred,setCred] = useState('');
  const [cookieEmail, setCookieEmail] = useState("");
  const [cookiePicture, setCookiePicture] = useState("");
  const [cookieName, setCookieName] = useState("");
  const [cookieSubId, setCookieSubId] = useState("");
  useEffect(() => {
    const emailCookie = Cookies.get("email");
    if (emailCookie) {
      setCookieEmail(emailCookie);
    }
    const picture = Cookies.get("picture");
    if (picture) {
      setCookiePicture(picture);
    }
    const name = Cookies.get("givenName");
    if (name) {
      setCookieName(name);
    }
    const sub = Cookies.get("subId");
    if (sub) {
      setCookieSubId(sub);
    }
  });

  const handleLogout = () => {
    Cookies.remove("email");
    Cookies.remove("givenName");
    Cookies.remove("picture");
    Cookies.remove("subId");
    setCred('');
    window.location.reload();
  };


  return (
    <div>
      {!cookieEmail ? (
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const credentialResponseDecoded = jwtDecode(
              credentialResponse.credential
            );
            Cookies.set("email", credentialResponseDecoded.email);
            Cookies.set("givenName", credentialResponseDecoded.given_name);
            Cookies.set("subId", credentialResponseDecoded.sub);
            Cookies.set("picture", credentialResponseDecoded.picture);
            setCred(credentialResponseDecoded.email);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          useOneTap
          size="medium"
          shape="circle"
        />
      ):(
        <Router>
        <Routes>
          <Route
            path="/"
            element={<Content onLogout={handleLogout} subId={cookieSubId} dataAPI={dataAPI} />}
          ></Route>
        </Routes>
      </Router>
      )}

     
    </div>
  );
};

export default App;
