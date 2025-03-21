import React from "react";

interface SectionProps {
  children: React.ReactNode;
}

export default function Section({children}: SectionProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {children}
    </section>
  );
}
