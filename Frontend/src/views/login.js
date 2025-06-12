// Suponiendo Express ya está configurado
import express from 'express';
import connect from '../middlewares/db.mjs';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { usuario, contraseña } = req.body;
  const db = await connect();

  try {
    const [rows] = await db.execute("SELECT * FROM usuarios WHERE usuario = ? AND contraseña = ?", [usuario, contraseña]);

    if (rows.length > 0) {
      res.json({ success: true, usuario: rows[0] });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  } finally {
    db.end();
  }
});

export default router;
