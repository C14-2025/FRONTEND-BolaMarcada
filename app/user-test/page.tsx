"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "../utils/api";

interface User {
  name?: string;
  email?: string;
  cpf?: string;
}

export default function UserTest() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/pages/home/login_singUp");
          return;
        }

        const data = await getCurrentUser(token);
        setUser(data);
      } catch (err: any) {
        setError("Erro ao carregar dados do usuário");
      }
    };

    fetchUser();
  }, [router]);

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-500 text-xl">
        {error}
      </div>
    );

  if (!user)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-black text-xl bg-white">
        Carregando informações do usuário...
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <h1 className="text-3xl font-bold mb-8">Informações do Usuário</h1>

      <div className="space-y-4 text-xl">
        <p>
          <strong>Nome:</strong> {user.name || "—"}
        </p>
        <p>
          <strong>Email:</strong> {user.email || "—"}
        </p>
        <p>
          <strong>CPF:</strong> {user.cpf || "—"}
        </p>
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => router.push("/")}
          className="border border-[#7E9DCA] px-4 py-2 rounded hover:bg-[#7E9DCA] hover:text-black transition"
        >
          Voltar pra Home
        </button>

        <button
          onClick={() => {
            localStorage.clear();
            router.push("/pages/home/login_singUp");
          }}
          className="border border-red-400 px-4 py-2 rounded hover:bg-red-400 hover:text-black transition"
        >
          Sair
        </button>
      </div>
    </div>
  );
}
