const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const { OAuth2 } = google.auth;
const oauth_link = "https://developers.google.com/oauthplayground";

const { EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET } = process.env;

const auth = new OAuth2(
  MAILING_ID,
  MAILING_SECRET,
  MAILING_REFRESH,
  oauth_link,
);

const sendVerificationEmail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken: accessToken,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Wingless Angels email verification",
    html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto,Arial;font-weight:600;color:#1a237e"><img src="https://res.cloudinary.com/webdevbro/image/upload/v1656822274/Assets/wa_logo_x1oqo6.png" alt="Wingless Angels Logo" style="width:100px"><span>Action required: Activate your Wingless Angels account</span></div><div style="font-family:Roboto,Arial;padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823"><span>Hello ${name},</span><div style="padding:20px 0 10px"><span style="padding:1.5rem 0">You recently created an account on Wingless Angels. To complete your registration please confirm your account.</span></div><a href="${url}" style="display:inline-block;width:200px;padding:10px 15px;background-color:#1a237e;border-radius:4px;color:#f7f7f7;text-align:center;margin-top:1rem;text-decoration:none;font-weight:600">Confirm your account</a><br><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#7986cb">Wingless Angels allows many strayed dogs find a better life, return home, and receive the care they deserve.</span></div></div>`,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) {
      return err;
    }
    return res;
  });
};

module.exports = { sendVerificationEmail };
