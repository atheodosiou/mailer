//====================================================================================================================
//                                              Mailer API - SendGrid
//====================================================================================================================
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const routes = require("./src/routes/routes");
const sgMail = require('@sendgrid/mail');

const app = express();
dotenv.config();

app.use(express.json());

//Configure cors
const options = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
    "X-Total-Count",
  ],
  exposedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
    "X-Total-Count",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

app.use(cors(options));

//Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//Use routes
app.use("/api", cors(),routes);

//Error handling 404
app.use('/', (req, res, next) => {
    res.status(404).json({code:404,'error':'Not Found'});
})

//General error handlign
app.use((error,req, res, next) => {
  res.status(error.status || 500).json({code:error.status || 500,'error':error.message || 'Internal Server Error'});
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}...`);
});