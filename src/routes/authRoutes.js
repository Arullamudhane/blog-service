const { Router } = require("express");
const authUser = require("../middlewares/authMiddleWare");
const fetch = require("node-fetch");

const authRoutes = Router();
const axios = require("axios");

authRoutes.post("/login", authUser);

const CLIENT_ID =
  "68323717873-gg97vp5qjrid9dtvl7a56lisb35sios6.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:3000/api/v1/auth/google/callback";

// Initiates the Google Login flow
authRoutes.get("/google", (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
  res.redirect(url);
});

// Callback URL for handling the Google Login response
authRoutes.get("/google/callback", async (req, res) => {
  const { code } = req.query;

  try {
    // Exchange authorization code for access token
    const { data } = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    });

    const { access_token, id_token } = data;

    // Use access_token or id_token to fetch user profile
    const { data: profile } = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    console.log(profile);

    // Code to handle user authentication and retrieval using the profile data

    res.redirect("/kjnkjn");
  } catch (error) {
    console.error("Error:", error);
    res.redirect("/login");
  }
});

// Logout route
authRoutes.get("/logout", (req, res) => {
  // Code to handle user logout
  res.redirect("/login");
});

module.exports = { authRoutes };
