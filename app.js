//Backend Entry point
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();


//swagger documentation autogen 
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json")
const helmet = require("helmet")

//securit principal to hide some of headers.
app.use(helmet());

//To post method
app.use(express.json());

app.use(cors());

// Importing
const connectDatabase = require("./configDatabase");
const blogRoutes = require("./routes/blog");
const userRoutes = require("./routes/user");

//Connecting database
connectDatabase();

app.use(morgan());
// Middleware Route
app.use("/api", blogRoutes);
app.use("/api/user", userRoutes);


// documentation endpoint for autogen
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/api/status", (req,res)=>{
  return res.status(200).json({
    message:"API Server is running...",
    date:[]
  })
});

// Listen on this port
app.listen(8000, () => {
  console.log("Server started on port 8000");
});
