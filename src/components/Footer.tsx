// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="flex items-center justify-center p-6 mt-12 border-t text-sm text-gray-500">
      © {new Date().getFullYear()} Felix Fergileosia. All rights reserved.
    </footer>
  );
}
