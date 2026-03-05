"use client";

import { useState, type FormEvent } from "react";
import { H3, Body } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface FormData { name: string; email: string; interest: string; message: string; }
type Status = "idle" | "submitting" | "success" | "error";

const inputClasses = cn(
  "w-full px-4 py-3 bg-platinum border border-royal-navy/15",
  "font-body text-sm text-royal-navy placeholder:text-royal-navy/40",
  "focus:outline-none focus:border-coral/50 transition-colors duration-300",
  "disabled:opacity-50 disabled:cursor-not-allowed"
);

export function ContactForm() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", interest: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json() as { error?: string; success?: boolean };

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", interest: "", message: "" });
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <Container className="max-w-2xl">
        <div className="text-center py-16 space-y-4">
          <H3>Thank You</H3>
          <Body className="text-royal-navy/70">Your inquiry has been received. We will respond within 48 hours.</Body>
          <button
            onClick={() => setStatus("idle")}
            className="mt-6 font-body text-sm uppercase tracking-widest text-coral hover:text-coral/80 transition-colors duration-300"
          >
            Send Another Inquiry
          </button>
        </div>
      </Container>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <Container className="max-w-2xl">
      <div className="text-center mb-16 space-y-4">
        <H3>Begin a Conversation</H3>
        <Body className="text-royal-navy/70">Whether you seek a specific treasure or wish to explore the possibilities of Material Consciousness, we welcome your inquiry.</Body>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="contact-name" className="sr-only">Your name</label>
            <input id="contact-name" type="text" placeholder="Your name" autoComplete="name" required minLength={2} maxLength={100} disabled={isSubmitting} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClasses} />
          </div>
          <div>
            <label htmlFor="contact-email" className="sr-only">Email address</label>
            <input id="contact-email" type="email" placeholder="Email address" autoComplete="email" required disabled={isSubmitting} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClasses} />
          </div>
        </div>
        <div>
          <label htmlFor="contact-interest" className="sr-only">Area of interest</label>
          <select id="contact-interest" disabled={isSubmitting} value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })} className={cn(inputClasses, !form.interest && "text-royal-navy/40")}>
            <option value="">Area of interest</option>
            <option value="geological-rarities">Geological Rarities</option>
            <option value="precious-metals">Precious Metals</option>
            <option value="historical-artifacts">Historical Artifacts</option>
            <option value="contemporary-innovations">Contemporary Innovations</option>
            <option value="general">General Inquiry</option>
          </select>
        </div>
        <div>
          <label htmlFor="contact-message" className="sr-only">Your message</label>
          <textarea id="contact-message" placeholder="Tell us about your curiosity..." rows={6} required minLength={10} maxLength={2000} disabled={isSubmitting} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={cn(inputClasses, "resize-none")} />
        </div>
        {status === "error" && (
          <p role="alert" className="font-body text-sm text-coral text-center">{errorMsg}</p>
        )}
        <div className="text-center pt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Inquiry"}
          </Button>
        </div>
      </form>
    </Container>
  );
}

export default ContactForm;
