"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { H3 } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

interface FormData { name: string; email: string; interest: string; message: string }
type Status = "idle" | "submitting" | "success" | "error";

const baseInput = cn(
  "peer w-full px-4 py-3 bg-white border border-royal-navy/15",
  "font-body text-sm text-royal-navy placeholder:text-royal-navy/40",
  "focus:outline-none focus:border-coral/40 transition-all duration-300",
  "disabled:opacity-50 disabled:cursor-not-allowed"
);

const labelClass =
  "block font-brand text-xs uppercase tracking-widest text-royal-navy/60 mb-2";

/** Wraps any field; the peer coral underline reveals on input focus */
function Field({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-coral transition-all duration-300 ease-out peer-focus:w-full"
      />
    </div>
  );
}

export function ContactForm() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", interest: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const rm = useReducedMotion();

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

  const isSubmitting = status === "submitting";

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={rm ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="py-16 text-center space-y-4"
        >
          {/* Coral reveal line */}
          <motion.div
            initial={rm ? undefined : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
            style={{ originX: "50%" }}
            className="mx-auto h-px w-12 bg-coral"
            aria-hidden="true"
          />
          <H3>Thank You</H3>
          <p className="font-body text-[15px] text-royal-navy/70">
            Your inquiry has been received. We will respond within 48 hours.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-6 font-body text-sm uppercase tracking-widest text-coral hover:text-coral/80 transition-colors duration-300"
          >
            Send Another Inquiry
          </button>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={rm ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={rm ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
        >
          <H3 className="mb-8">Send an Inquiry</H3>
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field>
                <label htmlFor="contact-name" className={labelClass}>Name</label>
                <input
                  id="contact-name" type="text" placeholder="Your full name"
                  autoComplete="name" required minLength={2} maxLength={100}
                  disabled={isSubmitting} value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={baseInput}
                />
              </Field>
              <Field>
                <label htmlFor="contact-email" className={labelClass}>Email</label>
                <input
                  id="contact-email" type="email" placeholder="your@email.com"
                  autoComplete="email" required disabled={isSubmitting} value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={baseInput}
                />
              </Field>
            </div>

            <Field>
              <label htmlFor="contact-interest" className={labelClass}>Area of Interest</label>
              <select
                id="contact-interest" disabled={isSubmitting} value={form.interest}
                onChange={(e) => setForm({ ...form, interest: e.target.value })}
                className={cn(baseInput, !form.interest && "text-royal-navy/40")}
              >
                <option value="">Select an area</option>
                <option value="geological-rarities">Geological Rarities</option>
                <option value="precious-metals">Precious Metals</option>
                <option value="historical-artifacts">Historical Artifacts</option>
                <option value="contemporary-innovations">Contemporary Innovations</option>
                <option value="general">General Inquiry</option>
              </select>
            </Field>

            <Field>
              <label htmlFor="contact-message" className={labelClass}>Message</label>
              <textarea
                id="contact-message" placeholder="Tell us about your curiosity..."
                rows={6} required minLength={10} maxLength={2000}
                disabled={isSubmitting} value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={cn(baseInput, "resize-none")}
              />
            </Field>

            <AnimatePresence>
              {status === "error" && (
                <motion.p
                  initial={rm ? undefined : { opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  role="alert"
                  className="font-body text-sm text-coral"
                >
                  {errorMsg}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="pt-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Inquiry"}
              </Button>
            </div>

          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ContactForm;
