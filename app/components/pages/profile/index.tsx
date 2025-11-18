"use client";

import { useEffect, useState } from "react";
import {
  deleteUser,
  getCurrentUser,
  updateCurrentUser,
} from "../../../utils/api";

import Sidebar from "../../layout/sidebar";
import Avatar from "./avatar";

import Title from "../../text/title";
import Subtitle from "../../text/subtitle";
import PrimaryButton from "../../button/primaryButton";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // campos
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    (async () => {
      try {
        const data = await getCurrentUser(token);
        setUser(data);
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone || "");
        setAvatarPreview(data.avatar || null);
      } catch (err) {
        console.error("Erro ao carregar usuário:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // máscara telefone
  function formatPhone(value: string) {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
  }

  // alterar avatar
  function handleAvatarFile(file: File) {
    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  // salvar perfil
  async function handleSave() {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const body: any = { name, email, phone };
      if (avatarPreview) body.avatar = avatarPreview;

      const updated = await updateCurrentUser(token, body);

      setUser(updated);
      setIsEditing(false);
    } catch (err) {
      console.error("Erro ao salvar:", err);
      alert("Erro ao atualizar perfil.");
    }
  }

  // deletar conta
  async function handleDeleteAccount() {
    const token = localStorage.getItem("token");
    if (!token) return;

    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir sua conta? Esta ação é irreversível."
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(token, false);
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (err) {
      console.error("Erro ao deletar conta:", err);
      alert("Erro ao excluir conta.");
    }
  }

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        Carregando...
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row bg-[#fffaf2] min-h-screen text-gray-800">
      {/* SIDEBAR */}
      <div className="md:block">
        <Sidebar />
      </div>

      {/* Conteúdo */}
      <main className="flex-1 w-full px-6 sm:px-10 md:px-20 py-10 flex justify-center">
        <div className="w-full max-w-[700px]">
          {/* título */}
          <div className="mb-10">
            <Title firstLine="Perfil" align="left" size={32} color="#1C1A0D" />
          </div>

          {/* avatar */}
          <div className="flex justify-center mb-12">
            <Avatar
              name={user?.name}
              email={user?.email}
              avatarUrl={avatarPreview}
              onImageChange={handleAvatarFile}
            />
          </div>

          {/* Minhas reservas */}
          <section className="mb-10">
            <Title
              firstLine="Minhas Reservas"
              align="left"
              size={28}
              color="#1C1A0D"
            />
            <Subtitle
              firstLine="Você ainda não possui reservas."
              align="left"
              size={16}
              color="#1C1A0D"
            />
          </section>

          {/* Configurações */}
          <section className="mb-10">
            <Title
              firstLine="Configurações da Conta"
              align="left"
              size={28}
              color="#1C1A0D"
            />

            <div className="space-y-5 mt-6">
              <input
                placeholder="Nome completo"
                value={name}
                readOnly={!isEditing}
                onChange={(e) => setName(e.target.value)}
                className={`block w-full p-3 border rounded-lg text-[16px] bg-white ${
                  isEditing ? "border-[#EFA23B] shadow-sm" : "border-gray-300"
                }`}
              />

              <input
                placeholder="Seu e-mail"
                value={email}
                readOnly={!isEditing}
                onChange={(e) => setEmail(e.target.value)}
                className={`block w-full p-3 border rounded-lg text-[16px] bg-white ${
                  isEditing ? "border-[#EFA23B] shadow-sm" : "border-gray-300"
                }`}
              />

              <input
                placeholder="Telefone"
                value={phone}
                readOnly={!isEditing}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                className={`block w-full p-3 border rounded-lg text-[16px] bg-white ${
                  isEditing ? "border-[#EFA23B] shadow-sm" : "border-gray-300"
                }`}
              />

              {/* botões */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                {!isEditing && (
                  <PrimaryButton
                    label="Editar"
                    onClick={() => setIsEditing(true)}
                    className="w-full sm:w-32"
                    color="#D9D9D9"
                    hoverColor="#C5C5C5"
                    textColor="#1C1A0D"
                  />
                )}

                {isEditing && (
                  <>
                    <PrimaryButton
                      label="Cancelar"
                      onClick={() => {
                        setIsEditing(false);
                        setName(user.name);
                        setEmail(user.email);
                        setPhone(user.phone || "");
                        setAvatarPreview(user.avatar || null);
                      }}
                      className="w-full sm:w-32"
                      color="#D9D9D9"
                      hoverColor="#C5C5C5"
                      textColor="#1C1A0D"
                    />

                    <PrimaryButton
                      label="Salvar"
                      onClick={handleSave}
                      className="w-full sm:w-32"
                      color="#EFA23B"
                      hoverColor="#d78c2f"
                      textColor="white"
                    />
                  </>
                )}
              </div>
            </div>
          </section>

          {/* Segurança */}
          <section className="mb-12">
            <Title
              firstLine="Segurança"
              align="left"
              size={28}
              color="#1C1A0D"
            />

            <div className="space-y-4 mt-4">
              <div>
                <Subtitle
                  firstLine="Alterar Senha"
                  size={16}
                  align="left"
                  color="#1C1A0D"
                />
                <PrimaryButton
                  label="Alterar Senha"
                  onClick={() => {}}
                  className="w-full sm:w-40 mt-2"
                  color="#EFA23B"
                  hoverColor="#d78c2f"
                  textColor="white"
                />
              </div>

              <div className="pt-4">
                <Title
                  firstLine="Excluir Conta"
                  size={28}
                  align="left"
                  color="#1C1A0D"
                />

                <PrimaryButton
                  label="Deletar Conta"
                  onClick={handleDeleteAccount}
                  className="w-full sm:w-40 mt-6"
                  color="#E53935"
                  hoverColor="#C62828"
                  textColor="white"
                />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
