const { Router } = require("express");
const authUser = require("../middlewares/authMiddleWare");
const fetch = require("node-fetch");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser } = require("../service/userService");

const authRoutes = Router();
const axios = require("axios");

authRoutes.post("/login", authUser);

const CLIENT_ID =
  "68323717873-gg97vp5qjrid9dtvl7a56lisb35sios6.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:3000/api/v1/auth/google/callback";

// Initiates the Google Login flow
authRoutes.get("/google/login", (req, res) => {
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

authRoutes.get("/login", (req, res) => {});

authRoutes.post("/register", async (req, res) => {
  try {
    console.log("11hhjh11");
    // const { username, password } = req.body;
    // const hashedPassword = await bcrypt.hash(password, 10);
    console.log("1111");
    await createUser({});
    console.log("222");
    await res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Logout route
authRoutes.get("/logout", (req, res) => {
  // Code to handle user logout
  res.redirect("/login");
});

// / User login
authRoutes.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = { authRoutes };
