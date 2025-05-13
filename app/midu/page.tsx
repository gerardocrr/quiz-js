import { turso } from "@/lib/db";
import { UserButton } from "@clerk/nextjs";

export default async function Midu() {
  const { rows } = await turso.execute("SELECT * FROM answers");

  return (
    <div>
      <header className="flex justify-end items-center p-4 gap-4 h-16">
        <UserButton
          showName
          appearance={{
            elements: {
              userButtonBox: "text-white",
            },
          }}
        />
      </header>
      <h1>Midudev</h1>
      <ul>
        {rows.map((row) => (
          <li key={String(row.id)}>{String(row.answer)}</li>
        ))}
      </ul>
    </div>
  );
}
