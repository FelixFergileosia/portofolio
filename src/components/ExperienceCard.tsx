import React from "react";

export type ExperienceCardProps = {
  role: string;
  company: string;
  period: string;
};

export default function ExperienceCard({
  role,
  company,
  period,
}: ExperienceCardProps) {
  return (
    <div
      className="relative rounded-xl p-8 hover:bg-black/60 transition-all duration-300"
      style={{
        /* leave room for the gradient ring */
        border: "1px solid transparent",

        /* 1️⃣ top layer = solid card fill, clipped to the padding-box
       2️⃣ bottom layer = yellow gradient, clipped to the border-box */
        backgroundClip: "padding-box, border-box",
        backgroundImage: `
      linear-gradient(#000 0 0),                               /* solid black card */
      linear-gradient(90deg, #FACC15 0%, transparent 100%)     /* yellow ring   */
    `,
      }}
    >
      <h3 className="text-lg font-bold text-white transition-colors group-hover:text-white">
        {role}
      </h3>
      <p className="text-sm text-yellow-400 mb-2 transition-colors group-hover:text-yellow-300">
        {company}
      </p>
      <p className="text-sm text-gray-300 transition-colors group-hover:text-gray-100">
        {period}
      </p>
    </div>
  );
}
