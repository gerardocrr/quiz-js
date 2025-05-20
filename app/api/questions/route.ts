import { NextResponse } from "next/server";
import { turso } from "@/lib/db";

export async function GET() {
  const { rows } = await turso.execute(
    "SELECT * FROM questions WHERE level = 'junior' ORDER BY RANDOM() LIMIT 10;"
  );

  return NextResponse.json(rows);
}
