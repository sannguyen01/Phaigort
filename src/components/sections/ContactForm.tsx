"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { H3 } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  email: string;
  interest: string;
  message: string;
}
type Status = "idle" | "submitting" | "success" | "error";

const inputClasses = cn(
  "w-full px-4 py-3 bg-[#1C1C1C] border border-platinum/10 rounded-sm",
  "font-ui text-sm text-platinum placeholder:text-platinum/30",
  "focus:outline-none focus:border-platinum/30 focus:ring-1 focus:ring-platinum/10 transition-all duration-300",
  "disabled:opacity-50 disabled:cursor-not-allowed"
);

const labelClasses = "block font-ui text-[10px] uppercase tracking-[0.15em] text-platinum/50 mb-2";

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
      const data = (await res.json()) as { error?: string; success?: boolean };

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
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4 py-16 text-center"
        >
          <H3>Thank You</H3>
          <p className="font-ui text-[15px] text-platinum/70">
            Your inquiry has been received. We will respond within 48 hours.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-6 font-ui text-sm uppercase tracking-widest text-platinum/50 transition-colors duration-300 hover:text-platinum"
          >
            Send Another Inquiry
          </button>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <H3 className="mb-8">Send an Inquiry</H3>
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Name & Email — side by side */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className={labelClasses}>
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your full name"
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={100}
                  disabled={isSubmitting}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className={labelClasses}>
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  required
                  disabled={isSubmitting}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClasses}
                />
              </div>
            </div>

            {/* Area of Interest */}
            <div>
              <label htmlFor="contact-interest" className={labelClasses}>
                Area of Interest
              </label>
              <select
                id="contact-interest"
                disabled={isSubmitting}
                value={form.interest}
                onChange={(e) => setForm({ ...form, interest: e.target.value })}
                className={cn(inputClasses, !form.interest && "text-platinum/30")}
              >
                <option value="">Select an area</option>
                <option value="geological-rarities">Geological Rarities</option>
                <option value="precious-metals">Precious Metals</option>
                <option value="historical-artifacts">Historical Artifacts</option>
                <option value="contemporary-innovations">Contemporary Innovations</option>
                <option value="general">General Inquiry</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="contact-message" className={labelClasses}>
                Message
              </label>
              <textarea
                id="contact-message"
                placeholder="Describe what you are looking for, or simply say hello — either is a sufficient beginning."
                rows={6}
                required
                minLength={10}
                maxLength={2000}
                disabled={isSubmitting}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={cn(inputClasses, "resize-none")}
              />
            </div>

            {/* Error */}
            {status === "error" && (
              <p role="alert" className="font-ui text-sm italic text-platinum/60">
                {errorMsg}
              </p>
            )}

            {/* Submit — left-aligned */}
            <div className="pt-2">
              <motion.div
                animate={isSubmitting ? { opacity: [1, 0.5, 1] } : {}}
                transition={{ repeat: Infinity, duration: 1.2 }}
              >
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Inquiry"}
                </Button>
              </motion.div>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ContactForm;
