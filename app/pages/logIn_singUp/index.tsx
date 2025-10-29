"use client";

import PrimaryButton from "@/app/components/button/primaryButton";
import InputField from "@/app/components/fields_inputs/inputField";
import Title from "@/app/components/text/title";
import Image from "next/image";
import Link from "next/link";

export default function LoginSignUp() {
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
  return (
    <section className="relative flex flex-col justify-center items-center min-h-screen text-white">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover blur-[8px]"
      >
        <source src={videoSelected} type="video/mp4" />
        Seu navegador não suporta vídeos em HTML5.
      </video>

      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Fundo com o campo proporcional (altura reduzida) */}
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-center bg-no-repeat bg-contain h-[80vh]"
        style={{
          backgroundImage: "url('/images/campo_fundo.jpeg')",
        }}
      ></div>

      {/* Leve overlay pra contraste */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Conteúdo central */}
      <div className="relative z-10 flex items-center justify-center w-[1600px] max-w-[95vw] h-[900px] max-h-[85vh]">
        {/* Círculo central com logo */}
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
            <InputField label="Nome" />
            <InputField label="E-mail" type="email" />
            <InputField label="Senha" type="password" />
            <InputField label="CPF" />
            <PrimaryButton label="CRIAR CONTA" />
          </div>
        </div>

        {/* Entrar */}
        <div className="flex flex-col w-1/2 items-center justify-center px-12">
          <Title
            firstLine="Entrar"
            align="left"
            size="86px"
            lineHeight="60px"
          />

          <div className="flex flex-col w-[65%] space-y-4 backdrop-blur-md bg-white/10 p-6 rounded-lg shadow-lg">
            <InputField label="E-mail" type="email" />
            <InputField label="Senha" type="password" />
            <PrimaryButton label="ENTRAR" />
          </div>
        </div>
      </div>
    </section>
  );
}
