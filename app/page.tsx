"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Wrench,
  Printer,
  Package,
  Clock,
  TrendingUp,
  Shield,
  ArrowRight,
  Phone,
  Mail,
  Building2,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ====== Personaliza aquí tu marca ======
const BRAND = {
  name: "Tera",
  phone: "+57 310 323 7367",
  email: "ventas@tera.com.co",
  primaryCTA: "Cotiza ahora",
  whatsapp: "573103237367", // solo dígitos con código de país
  slogan: "PrinTera — imprime sin límites",
};

const features = [
  { icon: Printer,    title: "Cero inversión en equipos", desc: "Evita inmovilizar capital en activos que se deprecian." },
  { icon: Wrench,     title: "Soporte técnico incluido",  desc: "Mantenimiento preventivo y correctivo sin costos sorpresa." },
  { icon: Package,    title: "Suministros siempre",       desc: "Tóner y repuestos incluidos según contrato, sin quiebres de stock." },
  { icon: Clock,      title: "Continuidad operativa",     desc: "Respuesta rápida y equipos de respaldo para minimizar downtime." },
  { icon: TrendingUp, title: "Pagas por uso",             desc: "Planes escalables: paga lo que imprimes, ajusta cuando creces." },
  { icon: Shield,     title: "SLA y garantías",           desc: "Acuerdos de servicio claros y garantías para tu tranquilidad." },
];

const faqs = [
  { q: "¿Instalan y configuran los equipos?", a: "Sí. Incluimos visita técnica, instalación en red, drivers y puesta en marcha sin costo adicional." },
  { q: "¿Qué incluye el plan de suministros?", a: "Incluye tóner/cartuchos y repuestos estándar. El papel puede incluirse como adicional." },
  { q: "¿Hay permanencia mínima?", a: "Ofrecemos contratos flexibles desde 12 meses, con descuentos por mayor plazo o volumen." },
  { q: "¿Cómo se factura el consumo?", a: "Usamos conteo de páginas (monocromo y color). Compartimos reportes mensuales transparentes." },
];

const testimonials = [
  {
    name: "Laura G.",
    role: "Gerente Administrativa — Empresa XYZ",
    quote:
      "Desde que tercerizamos con Tera, nunca más nos faltó tóner. Ahorramos y el soporte responde al instante.",
  },
  {
    name: "Carlos P.",
    role: "Director de Operaciones — Grupo Andes",
    quote:
      "El modelo por uso nos permitió escalar sin comprar equipos. Cero depreciación, cero dolores de cabeza.",
  },
];

export default function LandingImpresoras() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [msg, setMsg] = useState<string | null>(null);


  const scrollToContact = () => {
    const el = document.getElementById("contacto");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
        <div className="container mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Logo PrinTera (Prin en rojo, Tera en azul) */}
            <img src="/printera_logo_compact.svg" alt="PrinTera" className="h-8 w-auto" />
            <span className="font-semibold">{BRAND.name}</span>
            {BRAND.slogan && (
              <span className="ml-2 text-xs opacity-70 hidden sm:inline">{BRAND.slogan}</span>
            )}
            <Badge className="ml-2 bg-rose-100 text-rose-800 border-rose-200">Alquiler de impresión</Badge>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#beneficios" className="hover:underline">Beneficios</a>
            <a href="#como-funciona" className="hover:underline">Cómo funciona</a>
            <a href="#comparativo" className="hover:underline">Comparativo</a>
            <a href="#faq" className="hover:underline">FAQ</a>
          </div>
          <Button
            onClick={scrollToContact}
            className="rounded-2xl bg-[#e11d48] text-white hover:bg-[#be123c]"
          >
            {BRAND.primaryCTA}
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <Badge className="text-xs w-fit" variant="outline">Servicio técnico y suministros incluidos</Badge>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            PrinTera: imprime sin límites
          </h1>
          <p className="text-lg text-slate-600">
            Alquila impresoras y fotocopiadoras con <strong>servicio técnico y suministros incluidos</strong>.
            Sin inversión inicial ni depreciación. Solo imprime y crece.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              className="rounded-2xl bg-[#e11d48] text-white hover:bg-[#be123c]"
              onClick={scrollToContact}
            >
              {BRAND.primaryCTA}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <a href="#comparativo" className="text-sm underline self-center sm:self-auto">
              Ver comparativo compra vs. tercerización
            </a>
          </div>
          <div className="flex flex-wrap gap-6 pt-4 text-sm text-slate-600">
            <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4"/> SLA garantizado</div>
            <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4"/> Equipos modernos</div>
            <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4"/> Reportes de consumo</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="rounded-3xl shadow-lg">
            <CardHeader>
              <CardTitle>Plan recomendado</CardTitle>
              <CardDescription>Ejemplo para 1–5 equipos, 10k páginas/mes</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <div className="flex items-center justify-between border rounded-2xl p-4">
                <div>
                  <p className="font-medium">Monocromo</p>
                  <p className="text-sm text-slate-600">Impresora láser A4</p>
                </div>
                <Badge className="bg-rose-100 text-rose-800 border-rose-200">desde $X/mes</Badge>
              </div>
              <div className="flex items-center justify-between border rounded-2xl p-4">
                <div>
                  <p className="font-medium">Color</p>
                  <p className="text-sm text-slate-600">Multifuncional A3</p>
                </div>
                <Badge className="bg-rose-100 text-rose-800 border-rose-200">desde $Y/mes</Badge>
              </div>
              <ul className="text-sm text-slate-600 list-disc pl-5 space-y-1">
                <li>Incluye mantenimiento preventivo y correctivo</li>
                <li>Suministros: tóner y repuestos estándar</li>
                <li>Monitoreo y mesa de ayuda</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full rounded-2xl bg-[#e11d48] text-white hover:bg-[#be123c]"
                onClick={scrollToContact}
              >
                {BRAND.primaryCTA}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </section>

      {/* Beneficios */}
      <section id="beneficios" className="container mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">¿Por qué tercerizar tu servicio de impresión?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Card className="h-full rounded-3xl">
                <CardContent className="p-6 flex items-start gap-4">
                  <f.icon className="h-6 w-6 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-lg">{f.title}</h3>
                    <p className="text-slate-600 text-sm mt-1">{f.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="container mx-auto max-w-6xl px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">Así de simple</h2>
            <ol className="space-y-4">
              {[
                "Solicita tu cotización — te ayudamos a elegir el equipo ideal.",
                "Instalamos y configuramos — sin costo adicional.",
                "Imprime sin preocuparte — nosotros nos encargamos del resto.",
              ].map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full border flex items-center justify-center font-semibold">{idx + 1}</div>
                  <p className="text-slate-700">{step}</p>
                </li>
              ))}
            </ol>
          </div>
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle>Incluye</CardTitle>
              <CardDescription>Todo lo que necesitas para olvidarte del tema</CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4 text-sm">
              {["Mesa de ayuda y SLA","Reposición de equipos","Reportes de consumo","Visitas preventivas","Capacitación básica","Opciones de papel"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4"/>
                  <span>{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
{/* Instalaciones */}
<section id="instalaciones" className="container mx-auto max-w-6xl px-4 py-16">
  <div className="flex items-end justify-between mb-6">
    <h2 className="text-3xl md:text-4xl font-semibold">Instalaciones recientes</h2>
    <span className="text-sm text-slate-500">Técnicos certificados • Equipos Ricoh</span>
  </div>

  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {[
      { src: "/images/instalaciones/ricoh-tecnico-1.jpg", alt: "Técnico instalando multifuncional Ricoh A3", caption: "Puesta en marcha — sede centro" },
      { src: "/images/instalaciones/ricoh-tecnico-3.jpg", alt: "Técnico configurando la impresora Ricoh en red", caption: "Configuración en red" },
      { src: "/images/instalaciones/ricoh-tecnico-4.jpg", alt: "Cambio de tóner en fotocopiadora Ricoh", caption: "Suministros incluidos" },
    ].map((img) => (
      <figure key={img.src} className="group overflow-hidden rounded-2xl border bg-white transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg">
        <div className="relative aspect-[4/3]">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
            className="object-cover"
            priority={false}
          />
        </div>
        <figcaption className="p-3 text-sm text-slate-700 flex items-center justify-between">
          <span>{img.caption}</span>
          <span className="inline-flex items-center rounded-full bg-rose-100 px-2 py-0.5 text-[11px] text-rose-800 border border-rose-200">
            Servicio técnico
          </span>
        </figcaption>
      </figure>
    ))}
  </div>
</section>
      {/* Comparativo */}
      <section id="comparativo" className="container mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">Compra de equipos vs. Servicio tercerizado</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0 text-sm">
            <thead>
              <tr>
                <th className="text-left p-4 bg-slate-100 sticky left-0">Concepto</th>
                <th className="text-left p-4 bg-slate-100">Compra de equipos</th>
                <th className="text-left p-4 bg-slate-100">Servicio tercerizado</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Inversión inicial", "Alta", "Ninguna"],
                ["Mantenimiento", "A tu cargo", "Incluido"],
                ["Suministros", "Debes comprarlos", "Incluidos"],
                ["Depreciación", "Sí", "No aplica"],
                ["Flexibilidad", "Baja", "Alta"],
                ["Continuidad", "Depende de ti", "Garantizada"],
              ].map((row, i) => (
                <tr key={i} className="odd:bg-white even:bg-slate-50">
                  <td className="p-4 font-medium sticky left-0 bg-inherit">{row[0]}</td>
                  <td className="p-4">{row[1]}</td>
                  <td className="p-4">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Testimonios */}
      <section className="container mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">Lo que dicen nuestros clientes</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <Card key={t.name} className="rounded-3xl">
              <CardContent className="p-6">
                <p className="italic text-slate-700">“{t.quote}”</p>
                <div className="mt-4 text-sm text-slate-600">{t.name} • {t.role}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">Preguntas frecuentes</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-slate-700">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Contacto / Lead form */}
      <section id="contacto" className="container mx-auto max-w-6xl px-4 py-16">
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle>Solicita tu cotización</CardTitle>
            <CardDescription>Cuéntanos tu necesidad y te contactamos hoy mismo.</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="grid md:grid-cols-2 gap-4"
              onSubmit={async (e) => {
                e.preventDefault();
                setOk(null);
                setMsg(null);
              
                const form = e.currentTarget as HTMLFormElement;
                const fd = new FormData(form);
              
                // honeypot
                const website = (fd.get("website") || "").toString();
              
                const payload: Record<string, any> = {
                  nombre: (fd.get("nombre") || "").toString(),
                  empresa: (fd.get("empresa") || "").toString(),
                  email: (fd.get("email") || "").toString(),
                  telefono: (fd.get("telefono") || "").toString(),
                  detalle: (fd.get("detalle") || "").toString(),
                  website,
                };
              
                try {
                  setLoading(true);
              
                  // (Opcional) reCAPTCHA v3 si lo tienes habilitado en el layout
                  if (
                    typeof window !== "undefined" &&
                    (window as any).grecaptcha &&
                    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
                  ) {
                    const token = await (window as any).grecaptcha.execute(
                      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
                      { action: "submit" }
                    );
                    payload.recaptchaToken = token;
                  }
              
                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                  });
              
                  // intenta leer JSON siempre (cuando hay 400/500 viene el detalle)
                  let data: any = null;
                  try {
                    data = await res.json();
                  } catch {
                    /* ignore parse errors */
                  }
              
                  if (!res.ok) {
                    // Prioriza message del backend; si hay issues (Zod), compáctalas
                    const issues =
                      data?.issues?.map((i: any) => i?.message || JSON.stringify(i)).join(" · ");
                    setMsg(data?.message || issues || "Error enviando el formulario.");
                    setOk(false);
                    return;
                  }
              
                  setOk(true);
                  setMsg(data?.message || "¡Gracias! Hemos recibido tu solicitud.");
                  form.reset();
                } catch (err: any) {
                  setOk(false);
                  setMsg(err?.message || "Error de red: no se pudo contactar el servidor.");
                } finally {
                  setLoading(false);
                }
              }}
            >
              {/* Honeypot oculto */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="space-y-2">
                <label className="text-sm">Nombre y apellido</label>
                <Input name="nombre" placeholder="Tu nombre" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm">Empresa</label>
                <Input name="empresa" placeholder="Nombre de tu empresa" />
              </div>
              <div className="space-y-2">
                <label className="text-sm">Correo</label>
                <Input type="email" name="email" placeholder="tu@correo.com" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm">Teléfono</label>
                <Input name="telefono" placeholder="(+57)" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm">¿Cuántos equipos necesitas? ¿Volumen mensual aproximado?</label>
                <Textarea
                  name="detalle"
                  placeholder="Ej: 3 multifuncionales, 12.000 páginas/mes; sedes en Bogotá y Medellín"
                  rows={4}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="md:col-span-2 rounded-2xl bg-[#e11d48] text-white hover:bg-[#be123c]"
              >
                {loading ? "Enviando…" : "Enviar solicitud"}
              </Button>

              {/* Estado */}
              {ok === true && (
              <p className="md:col-span-2 text-green-700 bg-green-50 border border-green-200 rounded-xl p-3">
              {msg ?? "¡Gracias! Hemos recibido tu solicitud. Te contactaremos pronto."}
               </p>
              )}
              {ok === false && (
                <p className="md:col-span-2 text-red-700 bg-red-50 border border-red-200 rounded-xl p-3">
                {msg ?? "Hubo un problema al enviar el formulario. Intenta de nuevo o escríbenos por WhatsApp."}
              </p>
              )}

            </form>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-4 text-sm text-slate-600">
            <button
              type="button"
              onClick={() => {
                const form = document.querySelector('#contacto form') as HTMLFormElement | null;
                const fd = form ? new FormData(form) : null;
                const nombre = (fd?.get('nombre') || '').toString().trim();
                const empresa = (fd?.get('empresa') || '').toString().trim();
                const detalle = (fd?.get('detalle') || '').toString().trim();
                const telefono = (fd?.get('telefono') || '').toString().trim();
                const email = (fd?.get('email') || '').toString().trim();
                const parts = [
                  nombre ? `Hola, soy ${nombre}` : `Hola`,
                  empresa ? ` de ${empresa}` : '',
                  '. Estoy interesado en alquiler de impresoras/fotocopiadoras.',
                  detalle ? ` Detalle: ${detalle}.` : '',
                  telefono ? ` Tel: ${telefono}.` : '',
                  email ? ` Email: ${email}.` : '',
                ];
                const msg = parts.join('');
                window.open(
                  `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(msg)}`,
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
              className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 border-green-600 text-green-700 hover:bg-green-50"
            >
              <MessageCircle className="h-4 w-4"/> WhatsApp
            </button>
            <span className="flex items-center gap-2"><Phone className="h-4 w-4"/>{BRAND.phone}</span>
            <span className="flex items-center gap-2"><Mail className="h-4 w-4"/>{BRAND.email}</span>
            <span className="flex items-center gap-2"><Building2 className="h-4 w-4"/>Atención a empresas</span>
          </CardFooter>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto max-w-6xl px-4 py-10 text-sm text-slate-600 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            <span>{BRAND.name} © {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#beneficios" className="hover:underline">Beneficios</a>
            <a href="#comparativo" className="hover:underline">Comparativo</a>
            <a href="#contacto" className="hover:underline">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
