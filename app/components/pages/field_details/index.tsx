"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/layout/navbar";
import { getFieldById } from "@/app/utils/api";
import { FiMapPin, FiClock, FiDollarSign, FiChevronLeft } from "react-icons/fi";

interface TimeSlot {
  id: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  price: string;
  isOpen: boolean;
}

interface Field {
  id: string;
  name: string;
  address: string;
  city: string;
  sportType: string;
  description: string;
  images: string[];
  schedule: TimeSlot[];
}

const daysOfWeek: Record<string, string> = {
  monday: "Segunda-feira",
  tuesday: "Terça-feira",
  wednesday: "Quarta-feira",
  thursday: "Quinta-feira",
  friday: "Sexta-feira",
  saturday: "Sábado",
  sunday: "Domingo",
};

interface FieldDetailsProps {
  fieldId: string;
}

export default function FieldDetailsSection({ fieldId }: FieldDetailsProps) {
  const router = useRouter();
  const [field, setField] = useState<Field | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchFieldDetails();
  }, [fieldId]);

  const fetchFieldDetails = async () => {
    try {
      setLoading(true);

      // Tentar buscar do backend
      try {
        const data = await getFieldById(fieldId);
        setField(data);
      } catch (apiError) {
        console.warn("Backend não disponível, buscando do localStorage");

        // Buscar do localStorage
        const localFields = JSON.parse(
          localStorage.getItem("localFields") || "[]"
        );
        const foundField = localFields.find((f: any) => f.id === fieldId);

        if (foundField) {
          setField(foundField);
        } else {
          console.error("Campo não encontrado");
        }
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes do campo:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600 text-lg">Carregando...</p>
      </div>
    );
  }

  if (!field) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">Campo não encontrado</p>
          <button
            onClick={() => router.push("/rotas/campos")}
            className="bg-[#EFA23B] hover:bg-[#d78c2f] text-white px-6 py-2 rounded-lg transition-colors"
          >
            Voltar para Campos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-8 py-12 mt-24">
        {/* Botão Voltar */}
        <Link
          href="/rotas/campos"
          className="inline-flex items-center justify-center w-10 h-10 mb-6 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all z-50 relative"
        >
          <FiChevronLeft size={24} strokeWidth={2.5} />
        </Link>

        {/* Galeria de Imagens */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative w-full h-96 bg-gray-200">
            {field.images && field.images.length > 0 ? (
              <>
                <img
                  src={field.images[currentImageIndex]}
                  alt={field.name}
                  className="w-full h-full object-cover"
                />
                {field.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {field.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentImageIndex
                            ? "bg-[#EFA23B] w-6"
                            : "bg-white/60 hover:bg-white/80"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Sem imagens
              </div>
            )}
          </div>
        </div>

        {/* Informações do Campo */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {field.name}
          </h1>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-gray-700">
              <FiMapPin className="text-[#EFA23B]" size={20} />
              <span>
                {field.address}, {field.city}
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <span className="px-3 py-1 bg-[#EFA23B] text-white rounded-full text-sm font-medium">
                {field.sportType}
              </span>
            </div>
          </div>

          {field.description && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Descrição
              </h2>
              <p className="text-gray-600 leading-relaxed">{field.description}</p>
            </div>
          )}
        </div>

        {/* Tabela de Disponibilidade */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Disponibilidade e Valores
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Dia da Semana
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Horário
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Valor por Hora
                  </th>
                </tr>
              </thead>
              <tbody>
                {field.schedule && field.schedule.length > 0 ? (
                  field.schedule.map((slot) => (
                    <tr
                      key={slot.id}
                      className={`border-b border-gray-200 ${
                        slot.isOpen ? "" : "bg-gray-50"
                      }`}
                    >
                      <td className="py-4 px-4 text-gray-800 font-medium">
                        {daysOfWeek[slot.dayOfWeek] || slot.dayOfWeek}
                      </td>
                      <td className="py-4 px-4">
                        {slot.isOpen ? (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                            Aberto
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                            Fechado
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-gray-700">
                        {slot.isOpen && slot.startTime && slot.endTime
                          ? `${slot.startTime} - ${slot.endTime}`
                          : "-"}
                      </td>
                      <td className="py-4 px-4 text-[#EFA23B] font-semibold">
                        {slot.isOpen && slot.price
                          ? `R$ ${parseFloat(slot.price).toFixed(2)}`
                          : "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500">
                      Nenhuma informação de horário disponível
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Botão de Contato ou Reserva (futuro) */}
        <div className="mt-8 text-center">
          <button className="bg-[#EFA23B] hover:bg-[#d78c2f] text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200">
            Reservar um horário
          </button>
        </div>
      </main>
    </div>
  );
}
