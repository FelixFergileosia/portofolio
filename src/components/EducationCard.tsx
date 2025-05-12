import React from "react";
import { BookOpen, MapPin, Calendar, Award } from "lucide-react";

export type EducationCardProps = {
  degree?: string;
  major?: string;
  stream?: string;
  university: string;
  location: string;
  period: string;
  gpa?: number | string;
};

export default function EducationCard({
  degree,
  major,
  stream,
  university,
  location,
  period,
  gpa,
}: EducationCardProps) {
  return (
    <div className="p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl max-w-lg w-full hover:scale-105 transform transition-transform duration-500">
      {/* degree header */}
      {degree && (
        <h3 className="flex items-center space-x-2 text-yellow-300 text-2xl font-bold mb-4">
          <span>{degree}</span>
        </h3>
      )}

      <ul className="space-y-3 text-white/90">
        {/* major / stream line */}
        {(major || stream) && (
          <li className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-yellow-300" />
            <span className="font-medium">
              {major}
              {major && stream ? " in " : ""}
              {stream}
            </span>
          </li>
        )}

        {/* university + location (always present) */}
        <li className="flex items-center space-x-2">
          <MapPin className="w-5 h-5" />
          <span>
            {university}, {location}
          </span>
        </li>

        {/* period (always present) */}
        <li className="flex items-center space-x-2">
          <Calendar className="w-5 h-5" />
          <span>{period}</span>
        </li>
      </ul>

      {/* GPA line */}
      {gpa != null && (
        <div className="mt-6 flex items-center space-x-2 text-white/90">
          <Award className="w-5 h-5 text-yellow-300" />
          <span className="font-medium">GPA:</span>
          <span className="text-yellow-300 font-semibold">{gpa}</span>
        </div>
      )}
    </div>
  );
}
