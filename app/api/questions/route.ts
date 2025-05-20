import { NextResponse } from "next/server";
import { turso } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const level = searchParams.get("level");

  if (!level) {
    return NextResponse.json({ error: "Missing question_id" }, { status: 400 });
  }

  const { rows } = await turso.execute({
    sql: "SELECT * FROM questions WHERE level = ? ORDER BY RANDOM() LIMIT 10;",
    args: [level],
  });

  return NextResponse.json(rows);
}
