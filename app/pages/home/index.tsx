"use client";

import SearchBar from "@/app/components/fields_inputs/searchBar";
import Navbar from "@/app/components/layout/navbar";
import Subtitle from "@/app/components/text/subtitle";
import Title from "@/app/components/text/title";

export const HomeSection = () => {
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
    <section className="relative flex flex-col justify-center items-center min-h-screen text-white overflow-hidden">
      {/* Vídeo de fundo com blur */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
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
      </div>

      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Navbar */}
      <div className="w-full">
        <Navbar />
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 flex flex-col items-end text-right px-10 max-w-[1100px] w-full mt-32">
        <Title
          firstLine="ENCONTRE SEU CAMPO"
          secondLine="PERFEITO"
          align="right"
        />
        <Subtitle
          firstLine="Reserve seu horário no campo mais próximo de"
          secondLine="você e jogue sem preocupações!"
          align="right"
        />

        {/* SearchBar com a mesma largura do texto */}
        <div className="mt-12 w-full flex justify-end">
          <div className="w-[1072px]">
            <SearchBar
              placeholder="DIGITE SUA CIDADE..."
              buttonLabel="BUSCAR"
              onSearch={(value) => console.log("Pesquisando:", value)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
