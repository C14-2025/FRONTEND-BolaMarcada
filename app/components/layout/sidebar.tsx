"use client";

import Link from "next/link";
import { FiHome, FiSearch, FiHeart } from "react-icons/fi";
import { IoExitOutline } from "react-icons/io5";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-gray-200 bg-white p-8 min-h-screen">
      <h2 className="text-xl font-bold mb-10">Bola Marcada</h2>

      <ul className="space-y-6 text-gray-700 font-medium">
        <li>
          <Link
            href="/rotas/home"
            className="flex items-center gap-3 hover:text-[#EFA23B] hover:bg-[#f4efe8] hover:px-3 hover:py-2 hover:ounded hover:font-semibold"
          >
            <FiHome size={18} />
            Home
          </Link>
        </li>

        <li>
          <Link
            href="/rotas/explore"
            className="flex items-center gap-3 hover:text-[#EFA23B] hover:bg-[#f4efe8] hover:px-3 hover:py-2 hover:ounded hover:font-semibold"
          >
            <FiSearch size={18} />
            Explorar
          </Link>
        </li>

        <li>
          <Link
            href="/rotas/favorites"
            className="flex items-center gap-3 hover:text-[#EFA23B] hover:bg-[#f4efe8] hover:px-3 hover:py-2 hover:ounded hover:font-semibold"
          >
            <FiHeart size={18} />
            Favoritos
          </Link>
        </li>

        {/* Ativo */}
        <li>
          <Link
            href="/"
            className="flex items-center gap-3 hover:text-[#EFA23B] hover:bg-[#f4efe8] hover:px-3 hover:py-2 hover:ounded hover:font-semibold"
          >
            <IoExitOutline size={18} />
            Sair
          </Link>
        </li>
      </ul>
    </aside>
  );
}
