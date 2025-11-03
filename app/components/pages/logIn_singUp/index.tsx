"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Title from "../../text/title";
import InputField from "../../fields_inputs/inputField";
import PrimaryButton from "../../button/primaryButton";
import { registerUser, loginUser } from "../../../utils/api";

export default function LoginSignUp() {
  const router = useRouter();

  const videos = [
    "/videos/bask1.mp4",
    "/videos/bask2.mp4",
    "/videos/fut1.mp4",
    "/videos/fut2.mp4",
    "/videos/tenis1.mp4",
    "/videos/tenis2.mp4",
    "/videos/volei1.mp4",
    "/videos/volei2.mp4",
  ];
  const videoSelected = videos[Math.floor(Math.random() * videos.length)];

  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    cpf: "",
  });

  const [signin, setSignin] = useState({
    email: "",
    password: "",
  });

  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  // Atualiza campos
  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSignup({ ...signup, [e.target.name]: e.target.value });

  const handleSigninChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSignin({ ...signin, [e.target.name]: e.target.value });

  // Criar conta
  const handleSignup = async () => {
    try {
      setLoading(true);
      setMensagem("");
      await registerUser(signup);

      // Login automático após o signup
      const loginResponse = await loginUser({
        email: signup.email,
        password: signup.password,
      });

      localStorage.setItem("token", loginResponse.access_token);
      setMensagem("Conta criada com sucesso!");
      router.push("/user-test");
    } catch (err: any) {
      setMensagem("Erro ao criar conta: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Login
  const handleSignin = async () => {
    try {
      setLoading(true);
      setMensagem("");
      const response = await loginUser(signin);
      localStorage.setItem("token", response.access_token);
      setMensagem("Login realizado com sucesso!");
      router.push("/user-test");
    } catch (err: any) {
      setMensagem("Erro ao entrar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex flex-col justify-center items-center min-h-screen text-white">
      {/* Vídeo de fundo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover blur-[8px]"
      >
        <source src={videoSelected} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/60"></div>
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-center bg-no-repeat bg-contain h-[80vh]"
        style={{ backgroundImage: "url('/images/campo_fundo.jpeg')" }}
      ></div>
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Conteúdo principal */}
      <div className="relative z-10 flex items-center justify-center w-[1600px] max-w-[95vw] h-[900px] max-h-[85vh]">
        {/* Logo central */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
          <Link
            href="/"
            className="hover:scale-105 transition-transform duration-300"
          >
            <div className="w-[230px] h-[230px] flex items-center justify-center mt-10">
              <Image
                src="/images/Logo.png"
                alt="Logo Bola Marcada"
                width={210}
                height={294}
                priority
              />
            </div>
          </Link>
        </div>

        {/* Criar conta */}
        <div className="flex flex-col w-1/2 items-center justify-center px-12">
          <Title
            firstLine="CRIAR CONTA"
            align="left"
            size="86px"
            lineHeight="60px"
          />

          <div className="flex flex-col w-[65%] space-y-4 backdrop-blur-md bg-white/10 p-6 rounded-lg shadow-lg">
            <InputField
              label="Nome"
              name="name"
              value={signup.name}
              onChange={handleSignupChange}
            />
            <InputField
              label="E-mail"
              name="email"
              type="email"
              value={signup.email}
              onChange={handleSignupChange}
            />
            <InputField
              label="Senha"
              name="password"
              type="password"
              value={signup.password}
              onChange={handleSignupChange}
            />
            <InputField
              label="CPF"
              name="cpf"
              value={signup.cpf}
              onChange={handleSignupChange}
            />
            <PrimaryButton
              label={loading ? "Criando..." : "CRIAR CONTA"}
              onClick={handleSignup}
            />
          </div>
        </div>

        {/* Entrar */}
        <div className="flex flex-col w-1/2 items-center justify-center px-12">
          <Title
            firstLine="ENTRAR"
            align="left"
            size="86px"
            lineHeight="60px"
          />

          <div className="flex flex-col w-[65%] space-y-4 backdrop-blur-md bg-white/10 p-6 rounded-lg shadow-lg">
            <InputField
              label="E-mail"
              name="email"
              type="email"
              value={signin.email}
              onChange={handleSigninChange}
            />
            <InputField
              label="Senha"
              name="password"
              type="password"
              value={signin.password}
              onChange={handleSigninChange}
            />
            <PrimaryButton
              label={loading ? "Entrando..." : "ENTRAR"}
              onClick={handleSignin}
            />
          </div>
        </div>
      </div>

      {mensagem && (
        <p
          className={`absolute bottom-10 text-center font-semibold ${
            mensagem.includes("sucesso") ? "text-green-400" : "text-red-400"
          }`}
        >
          {mensagem}
        </p>
      )}
    </section>
  );
}
