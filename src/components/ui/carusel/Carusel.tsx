"use client";
import Image from "next/image";
import React from "react";
import { Carousel,Card } from "./appCardCarousel";


export function Carusel() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2  id="titulo-seccion-mostra-productos" className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-black font-sans">
       Algunos de nustro Productoos
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <Image
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};
const data = [
  {
    category: "Producto",
    title: "",
    src:"https://i.pinimg.com/564x/7d/c1/f2/7dc1f2a84d02c8938e6c9399f43e8aaf.jpg",
    content: <DummyContent />,
  },
  {
    category: "Producto",
    title: "",
    src: "https://i.pinimg.com/564x/7d/c1/f2/7dc1f2a84d02c8938e6c9399f43e8aaf.jpg",
    content: <DummyContent />,
  },
  {
    category: "Producto",
    title: "",
    src: "https://i.pinimg.com/564x/7d/c1/f2/7dc1f2a84d02c8938e6c9399f43e8aaf.jpg",
    content: <DummyContent />,
  },

  {
    category: "Producto",
    title: "",
    src:"",
    content: <DummyContent />,
  },
  {
    category: "",
    title: "",
    src:"ttps://i.pinimg.com/564x/7d/c1/f2/7dc1f2a84d02c8938e6c9399f43e8aaf.jpg",
    content: <DummyContent />,
  },
  {
    category: "",
    title: "",
    src:"",
    content: <DummyContent />,
  },
];
