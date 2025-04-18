import nodemailer from "nodemailer";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://sofiaalvarezrodero.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Faltan campos requeridos" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASS
      }
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.MY_EMAIL,
      subject: `📩 Nuevo mensaje de contacto`,
      text: message,
      html: `
        <h2>Mensaje de ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `
    });

    return res.status(200).json({ message: "Mensaje enviado exitosamente" });
  } catch (error) {
    console.error("❌ Error al enviar email:", error);
    return res.status(500).json({ message: "Error al enviar el mensaje" });
  }
}
