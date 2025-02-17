"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex justify-center items-center h-screen gap-5">
      <button
        className="bg-blue-500 p-2 rounded-xl font-semibold"
        onClick={() => router.push("/room")}
      >
        Ingresar a sala
      </button>
    </main>
  );
}
