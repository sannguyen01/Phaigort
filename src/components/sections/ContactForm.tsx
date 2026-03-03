"use client";

import { useState, type FormEvent } from "react";
import { H3, Body } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface FormData { name: string; email: string; interest: string; message: string; }

const inputClasses = cn(
  "w-full px-4 py-3 bg-deep-navy border border-silver/20",
  "font-body text-sm text-platinum placeholder:text-silver/40",
  "focus:outline-none focus:border-coral/50 transition-colors duration-300"
);

export function ContactForm() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", interest: "", message: "" });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <Container className="max-w-2xl">
      <div className="text-center mb-16 space-y-4">
        <H3>Begin a Conversation</H3>
        <Body className="text-silver">Whether you seek a specific treasure or wish to explore the possibilities of Material Consciousness, we welcome your inquiry.</Body>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" placeholder="Your name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClasses} />
          <input type="email" placeholder="Email address" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClasses} />
        </div>
        <select value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })} className={cn(inputClasses, !form.interest && "text-silver/40")}>
          <option value="">Area of interest</option>
          <option value="geological-rarities">Geological Rarities</option>
          <option value="precious-metals">Precious Metals</option>
          <option value="historical-artifacts">Historical Artifacts</option>
          <option value="contemporary-innovations">Contemporary Innovations</option>
          <option value="general">General Inquiry</option>
        </select>
        <textarea placeholder="Tell us about your curiosity..." rows={6} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={cn(inputClasses, "resize-none")} />
        <div className="text-center pt-4"><Button type="submit">Send Inquiry</Button></div>
      </form>
    </Container>
  );
}

export default ContactForm;
