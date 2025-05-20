import { NextResponse } from "next/server";
import { turso } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing question_id" }, { status: 400 });
  }

  const { rows } = await turso.execute({
    sql: "SELECT * FROM answers WHERE question_id = ?",
    args: [id],
  });

  return NextResponse.json(rows);
}
