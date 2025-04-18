import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASS
      }
    });

    await transporter.sendMail({
      from: email,
      to: process.env.MY_EMAIL,
      subject: `Nuevo mensaje de ${name}`,
      text: message
    });

    res.status(200).send("Mensaje enviado");
  } catch (error) {
    console.error("❌ Error al enviar email:", error);
    res.status(500).send("Error");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
