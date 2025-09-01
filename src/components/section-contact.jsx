"use client";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Phone, MessageCircle, Send, User, Mail } from "lucide-react";

export default function SectionContact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const boxRef = useRef(null);

  function onMouseMove(e) {
    const el = boxRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", x + "px");
    el.style.setProperty("--my", y + "px");
  }

  function onMouseLeave() {
    const el = boxRef.current;
    if (!el) return;
    el.style.setProperty("--mx", "-999px");
    el.style.setProperty("--my", "-999px");
  }

  function onChange(e) {
    const { name, value } = e.target;
    setForm(function(prev){ return Object.assign({}, prev, { [name]: value }); });
  }

  function validate() {
    if (!form.name.trim()) return "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Please enter a valid email.";
    if (form.message.trim().length < 8) return "Please enter a longer message.";
    return null;
  }

  async function onSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json().catch(function(){ return {}; });
      if (!res.ok || data.error) throw new Error(data.message || "Failed to send message");
      toast.success("Message sent. We’ll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (e) {
      toast.error(e.message || "Something went wrong. Please try WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="text-2xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>We’re here to help</h2>
      <p className="text-sm text-muted-foreground mt-1">Ask about availability, rooms, or anything else. We usually reply within a few hours.</p>

      <div ref={boxRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className="mt-6 relative overflow-hidden group rounded-2xl border bg-white/60 dark:bg-white/[0.04] backdrop-blur p-6 md:p-8 shadow-sm ring-1 ring-white/10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-60" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-16 h-64 w-64 rounded-full bg-[color:var(--primary)]/10 blur-3xl" />
        </div>
        <span aria-hidden className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "radial-gradient(180px circle at var(--mx, -999px) var(--my, -999px), color-mix(in oklab, var(--primary) 22%, transparent), transparent 60%)" }} />
        <form onSubmit={onSubmit} className="grid gap-4 md:max-w-2xl">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input name="name" placeholder="Your name" value={form.name} onChange={onChange} aria-label="Your name" className="pl-9" />
            </div>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input name="email" placeholder="Email address" type="email" value={form.email} onChange={onChange} aria-label="Your email" className="pl-9" />
            </div>
          </div>
          <div>
            <Textarea name="message" placeholder="How can we help?" rows={6} value={form.message} onChange={onChange} aria-label="Your message" />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" disabled={loading} className="bg-[var(--primary)] text-[var(--primary-foreground)]">
              <Send className="mr-2 size-4" />{loading ? "Sending..." : "Send message"}
            </Button>
            <Button asChild variant="secondary" className="gap-2">
              <a href={buildWhatsAppHref(form)} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4" /> WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <a href="tel:+94713556970">
                <Phone className="size-4" /> Call
              </a>
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

function buildWhatsAppHref(form) {
  const base = "https://wa.me/94713556970";
  const prefill = `Hi, I'm ${form?.name || ""}. ${form?.message || ""}`.trim();
  const params = new URLSearchParams({ text: prefill });
  return base + "?" + params.toString();
}


