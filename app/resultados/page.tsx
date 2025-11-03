"use client";

import { useEffect, useState } from "react";

export default function Resultados() {
  const [centers, setCenters] = useState<any[]>([]);
  const [city, setCity] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("cityResults");
    const savedCity = localStorage.getItem("searchedCity");
    if (saved) setCenters(JSON.parse(saved));
    if (savedCity) setCity(savedCity);
  }, []);

  return (
    <section className="min-h-screen bg-[#121212] text-white p-10">
      <h1 className="text-4xl font-bold mb-8">
        Centros esportivos em {city || "sua cidade"}
      </h1>

      {centers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {centers.map((c, i) => (
            <div
              key={i}
              className="bg-white/10 p-6 rounded-lg shadow-lg border border-white/10"
            >
              <h2 className="text-2xl font-semibold mb-2">{c.name}</h2>
              <p>{c.address}</p>
              <p className="text-sm text-gray-300 mt-2">
                {c.city} - {c.state}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">Nenhum centro encontrado.</p>
      )}
    </section>
  );
}
