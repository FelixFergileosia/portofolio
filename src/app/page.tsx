// src/app/page.tsx
"use client";

import React, { useState } from "react";
import EducationCard from "@/components/EducationCard";
import ExperienceCard from "@/components/ExperienceCard";
import { ChevronDown } from "lucide-react";

export default function Home() {
  const [showHeader, setShowHeader] = useState<boolean>(true);
  return (
    <div className="flex flex-col flex-1">
      <header className="fixed top-0 left-0 w-full z-50 p-4 flex items-center justify-center gap-4">
        <h1
          className={`text-4xl md:text-6xl font-extrabold text-white text-center drop-shadow-lg transform transition-all duration-300 ${
            showHeader ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          FELIX FERGILEOSIA
        </h1>

        <button
          onClick={() => setShowHeader((prev) => !prev)}
          className="focus:outline-none"
        >
          <ChevronDown
            size={32}
            className={`text-white/80 transition-transform duration-300 ${
              showHeader ? "rotate-0" : "rotate-180"
            }`}
          />
        </button>
      </header>

      {/* 🚀 Sticky hero */}
      <div className="w-full h-screen overflow-hidden">
        <section
          className="relative w-full h-full bg-no-repeat bg-right bg-fixed"
          style={{
            backgroundImage: "url('/educational-background.jpg')",
            backgroundSize: "100% auto",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center gap-y-10">
            <h1 className="text-5xl font-extrabold text-white">EDUCATION</h1>

            <EducationCard
              degree="Bachelor of Computer Science"
              major="Computer Science"
              stream="Software Engineering"
              university="Bina Nusantara University"
              location="Jakarta, Indonesia"
              period="09/2020 – 06/2024"
              gpa={3.72}
            />

            <EducationCard
              major="Science"
              university="St Peter Highschool"
              location="Pontianak, Indonesia"
              period="2017 – 2020"
            />

            <button className="animate-bounce">
              <ChevronDown size={32} className="text-white/80" />
            </button>
          </div>
        </section>
      </div>

      {/* 📦 Main scrollable content */}
      <main className="flex-1 px-6 py-8">
        {/* Professional Experience */}
        <section
          id="experience"
          className="h-[1000px] bg-black/70 flex flex-col items-center justify-center gap-y-10"
        >
          <h2 className="text-5xl font-extrabold text-white">
            Professional Experience
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ExperienceCard
              role="Software Engineer (Full-time)"
              company="Polytron"
              period="08/2024 – Present"
            />
            <ExperienceCard
              role="Software Engineer (Contract)"
              company="Polytron"
              period="02/2024 – 08/2024"
            />
            <ExperienceCard
              role="Full Stack Developer (Intern)"
              company="Polytron"
              period="02/2023 – 02/2024"
            />
          </div>
        </section>

        {/* …any further sections here… */}
      </main>
    </div>
  );
}
