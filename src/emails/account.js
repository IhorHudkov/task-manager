import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  const msg = {
    to: email,
    from: process.env.SENDER, // Change to your verified sender
    subject: "Welocme email from Ihor",
    text: `Hello, dear ${name}!`,
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  sgMail.send(msg);
};

const sendCancelationEmail = (email, name) => {
  const msg = {
    to: email,
    from: process.env.SENDER, // Change to your verified sender
    subject: "Goodbye email from Ihor",
    text: `Hello, dear ${name}!
      We are upset that you have deleted your account. Good luck to you.`,
  };
  sgMail.send(msg);
};

export { sendWelcomeEmail, sendCancelationEmail };
