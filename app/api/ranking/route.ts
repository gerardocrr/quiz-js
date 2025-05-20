import { NextResponse } from "next/server";
import { turso } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user_id, questions, time, image_url, name } = body;

    if (!user_id || !questions || !time || !image_url || !name) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await turso.execute({
      sql: `INSERT OR REPLACE INTO ranking (user_id, questions, time, image_url, name) VALUES (?, ?, ?, ?, ?)`,
      args: [user_id, questions, time, image_url, name],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error saving data" }, { status: 500 });
  }
}
