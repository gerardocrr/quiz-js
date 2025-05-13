import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center bg-red-400 h-dvh">
      <main className="flex w-full">
        <div className="w-full flex justify-center">
          <Link
            className="bg-white text-black p-2 rounded-md hover:bg-slate-200 flex justify-center w-1/2"
            href={"/junior"}
          >
            Junior
          </Link>
        </div>
        <div className="w-full flex justify-center">
          <Link
            className="bg-white text-black p-2 rounded-md hover:bg-slate-200 flex justify-center w-1/2"
            href={"/midu"}
          >
            Midu
          </Link>
        </div>
      </main>
    </div>
  );
}
