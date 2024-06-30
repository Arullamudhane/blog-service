const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

const blogRoutes = require("./src/routes/blogRoutes");
const authRoutes = require("./src/routes/authRoutes");
const version = "/api/v1";

app.use(`${version}/blog`, blogRoutes.blogRoutes);
app.use(``, authRoutes);

// app.get("/google/callback", async (req, res) => {
//   res.send("Google OAuth Callback Url!");
// });

const dotenv = require("dotenv");
const fetch = require("node-fetch");

const db = require("./src/config/database");

dotenv.config();

const GOOGLE_ACCESS_TOKEN_URL = process.env.GOOGLE_ACCESS_TOKEN_URL;

const GOOGLE_OAUTH_URL = process.env.GOOGLE_OAUTH_URL;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const GOOGLE_CALLBACK_URL = "http%3A//localhost:3000/google/callback";

const GOOGLE_OAUTH_SCOPES = [
  "https%3A//www.googleapis.com/auth/userinfo.email",

  "https%3A//www.googleapis.com/auth/userinfo.profile",
];

app.get("/", async (req, res) => {
  console.log("erew");
  const state = "some_state";
  const scopes = GOOGLE_OAUTH_SCOPES.join(" ");
  const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${GOOGLE_OAUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_CALLBACK_URL}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;
  res.redirect(GOOGLE_OAUTH_CONSENT_SCREEN_URL);
});

app.listen(PORT, () => {
  console.log("Server running on port 3000");
});
