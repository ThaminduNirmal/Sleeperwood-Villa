import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Contact — Sleeperwood Villa" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>We’re here to help</h1>
      <div className="mt-6 grid gap-4">
        <Input placeholder="Name" />
        <Input placeholder="Email" type="email" />
        <Textarea placeholder="Message" rows={5} />
        <div className="flex gap-3">
          <Button>Send</Button>
          <a className="underline" href="https://wa.me/94771234567" target="_blank">WhatsApp</a>
          <a className="underline" href="tel:+94771234567">Call</a>
        </div>
      </div>
    </div>
  );
}

