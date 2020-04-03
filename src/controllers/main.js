const sgMail = require("@sendgrid/mail");

const sendMail = (req, res, next) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const message = req.body;
  
  if (!message.to) {
    return res.status(400).json({ error: "Provide to property!" });
  }
  if (!message.from) {
    return res.status(400).json({ error: "Provide from property!" });
  }
  if (!message.subject) {
    return res.status(400).json({ error: "Provide subject property!" });
  }
  if (!message.text && !message.html) {
    return res.status(400).json({ error: "Provide text or html property!" });
  }

  sgMail
    .send(message)
    .then((success) => {
      res.status(200).json({ message: "Mail send" });
    })
    .catch((error) => {
      res.status(error.status || 500).json({
        code: error.status || 500,
        error: error.message || "Internal Server Error",
      });
    });
};

module.exports = {
  sendMail,
};
