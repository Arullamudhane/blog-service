const { Router } = require("express");
const authUser = require("../middlewares/authMiddleWare");
const fetch = require("node-fetch");
const bcrypt = require("bcrypt");
const { createUser } = require("../service/userService");
const { models } = require("../models");
const dotenv = require("dotenv");
const authRoutes = Router();
const axios = require("axios");
const { createJwtToken } = require("../service/jwtService");
// const { emit } = require("npm");

dotenv.config();

// authRoutes.post("/logincheck", authUser("admin"), (req, res) => {
//   console.log("ends here");
//   res.status(200).send();
// });

// Google oAuth.2.0
// Initiates the Google Login flow
authRoutes.get("/google/login", (req, res) => {
  console.log("bbhbj", process.env.GOOGLE_CLIENT_ID);
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=profile email`;
  res.redirect(url);
});

// Callback URL for handling the Google Login response
authRoutes.get("/google/callback", async (req, res) => {
  const { code } = req.query;

  try {
    // Exchange authorization code for access token
    const { data } = await axios.post(process.env.GOOGLE_OAUTH_URL, {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      code,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
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

    if (!profile.verified_email) {
      return res.status(400).json({ message: "Email not verified" });
    }

    const existingUser = await models.User.findOne({
      where: { provider_id: profile.email },
    });

    if (existingUser) {
      console.log("existing user");
      return res.json({
        success: true,
        message: "Login successful",
        user: {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.provider_id,
          profilePicture: existingUser.profile_picture_url,
        },
        token: createJwtToken(existingUser), // Implement token generation logic
      });
    } else {
      console.log("new user");

      let newUser = await models.User.create({
        name: profile.given_name || profile.email,
        provider_id: profile.email,
        profile_picture_url: profile.picture,
        registration_type: "google",
        // password_hash: hashedPassword, // In a real application, ensure the password is hashed
      });
      // await createUser({});
      // console.log("222, ttt", ttt2);

      // Code to handle user authentication and retrieval using the profile data
      return res.json({
        success: true,
        message: "Signup successful",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.provider_id,
          profilePicture: newUser.profile_picture_url,
        },
        token: createJwtToken(newUser), // Implement token generation logic
      });
    }

    res.redirect("/kjnkjn");
  } catch (error) {
    console.error("Error:", error);
    res.redirect("/login");
  }
});

module.exports = { authRoutes };
