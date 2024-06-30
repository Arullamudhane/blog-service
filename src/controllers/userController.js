const dotenv = require("dotenv");

dotenv.config();

app.post(
  "/login",
  () => {},
  (req, res) => {
    //   const { username, password } = req.body;
    //   const user = users.find((user) => user.username === username);

    //   if (!user || user.password !== password) {
    //     res.status(400);
    //     res.send({ message: "Invalid username or password" });
    //     return;
    //   }

    if ("aa" === "aa") {
      const token = jwt.sign(
        {
          role: "testrole",
        },
        "tokenSecret",
        {
          algorithm: "HS256",
          expiresIn: "50m",
          issuer: "my-api",
          subject: "123",
        }
      );
      res.send({ token });
      return;
    }
  }
);

// add the function to let only admin access it
app.get("/users/:userId", validateRequest("admin"), (req, res) => {
  //   const { params } = req;
  //   const { userId } = params;

  console.log("uyguguygyug");
  const user = users.find((user) => user.id === userId);

  if (!user) {
    res.sendStatus(401);
    return;
  }
  res.send({ user });
});
