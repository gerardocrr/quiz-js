import { NextResponse } from "next/server";
import { turso } from "@/lib/db";

export async function GET() {
  const { rows } = await turso.execute(
    "SELECT * FROM ranking ORDER BY points DESC"
  );

  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user_id, questions, time, image_url, name, points } = body;

    if (!user_id || !questions || !time || !image_url || !name || !points) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Verificar si el usuario ya existe
    const existing = await turso.execute({
      sql: `SELECT points FROM ranking WHERE user_id = ?`,
      args: [user_id],
    });

    const existingPoints = existing.rows[0]?.points;

    if (existing.rows.length === 0) {
      // No existe: insertar nueva entrada
      await turso.execute({
        sql: `INSERT INTO ranking (user_id, questions, time, image_url, name, points) VALUES (?, ?, ?, ?, ?, ?)`,
        args: [user_id, questions, time, image_url, name, points],
      });
      return NextResponse.json({ success: true, message: "New user added" });
    } else if (Number(points) > Number(existingPoints)) {
      // Sí existe y los nuevos puntos son mayores: actualizar
      await turso.execute({
        sql: `UPDATE ranking SET questions = ?, time = ?, image_url = ?, name = ?, points = ? WHERE user_id = ?`,
        args: [questions, time, image_url, name, points, user_id],
      });
      return NextResponse.json({ success: true, message: "Score updated" });
    } else {
      // Existe y los puntos nuevos no son mejores: no hacer nada
      return NextResponse.json({
        success: false,
        message: "Lower score. Not updated",
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error saving data" }, { status: 500 });
  }
}
