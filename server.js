// const http = require("http");


// const server = http.createServer();

// server.listen(8080, () => {
//     console.log("Server is listening", 8080)
// })


const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();


// import routes
const userRoute = require("./routes/user");




mongoose.connect(process.env.MONGOOSE_URI)
.then(() => console.log("DB connected successfully!"))
.catch((err) => console.log(`DB Error: ${err.message}`))


const port = process.env.PORT || 8080

const app = express();

// using middlewares 
app.use(express.json());
app.use(cors());


app.get("/", async (req, res) => {
    res.status(200).json({message: "Hello World!"});
})

// using routes 
app.use('/user', userRoute);



app.listen(port, () => {
    console.log("Server is listening", port)
})