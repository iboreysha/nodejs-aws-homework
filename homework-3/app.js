const express = require('express');
const bodyParser = require("body-parser");
const usersRoutes = require("./routers/users.js");

const app = express();

app.use(bodyParser.json());


//
// Homepage route
//
app.get('/', (req, res) => {
    res.send('Homework: 3');
});


//
// User routes
//
app.use("/users", usersRoutes);


//
// Not existing route
//
app.all("*", (req, res) => res.send("You have tried reaching a route that doesn't exist"));


//
// Run local server
//
const PORT = 3000;
app.listen(PORT, () => console.log(`Server has started on localhost:${PORT}`));

