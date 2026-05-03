import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  Calendar, 
  MapPin, 
  Gift, 
  Heart, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  Camera,
  ExternalLink,
  Church,
  PartyPopper,
  Shirt,
  Check,
  Copy,
  CheckCheck
} from "lucide-react";

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="p-1.5 rounded-lg bg-wedding-cream/10 hover:bg-wedding-cream/20 transition-colors active:scale-90">
      {copied ? <CheckCheck className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-wedding-cream/60" />}
    </button>
  );
};

/**
 * Image collections for different sections
 */
const CEREMONY_IMAGES = [
  "/Book Mica y Fran (180).jpg",
  "/Book Mica y Fran (293).jpg",
  "/Book Mica y Fran (542).jpg",
];

const PARTY_IMAGES = [
  "/fotos/Book Mica y Fran (467).jpg",
  "/Book Mica y Fran (377).jpg",
  "/fotos/Book Mica y Fran (458).jpg",
];

const MOMENTOS_IMAGES = [
  "/fotos/Book Mica y Fran (494).jpg",
  "/fotos/Book Mica y Fran (249).jpg",
  "/Book Mica y Fran (321).jpg",
  "/fotos/Book Mica y Fran (27).jpg",
  "/fotos/Book Mica y Fran (526).jpg",
  "/fotos/Book Mica y Fran (94).jpg",
  "/fotos/Book Mica y Fran (567).jpg",
];

const GALLERY_IMAGES = MOMENTOS_IMAGES;

const MAP_URL = "https://www.google.com/maps/search/Sal%C3%B3n+Ori%C3%B3n+Eventos";

const CountdownItem = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center p-1.5 sm:p-3 md:p-4 min-w-[60px] sm:min-w-[70px] md:min-w-[80px]">
    <span className="text-2xl sm:text-3xl md:text-4xl font-display font-light">{value.toString().padStart(2, '0')}</span>
    <span className="text-[8px] sm:text-[10px] uppercase tracking-widest opacity-80 font-sans mt-0.5 md:mt-1 font-bold">{label}</span>
  </div>
);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-09-05T21:00:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen selection:bg-wedding-cream selection:text-wedding-blue font-serif bg-[#334062] text-wedding-cream overflow-x-hidden">
      
      {/* Background with 90% Color Overlay */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0">
          <img 
            src="/Book Mica y Fran (102).jpg" 
            className="w-full h-full object-cover object-center scale-105"
            alt="Fondo de Boda"
            referrerPolicy="no-referrer"
            fetchPriority="high"
          />
        </div>
        {/* The 90% opacity overlay requested */}
        <div className="absolute inset-0 bg-[#334062]/90 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 px-4 md:px-6">
        {/* Background Hero */}
        <section className="relative h-screen flex flex-col items-center justify-center -mt-12 overflow-hidden">
          <div className="text-center space-y-6 md:space-y-8 max-w-4xl px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-5xl sm:text-7xl md:text-9xl font-display leading-tight tracking-tight px-4 whitespace-nowrap"
            >
              Mica & Fran
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="space-y-4"
            >
              <div className="h-[1px] w-16 bg-wedding-cream/40 mx-auto" />
              <p className="text-3xl md:text-5xl font-light italic opacity-70 leading-relaxed">
                "Mejor son dos que uno"
              </p>
              <p className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-sans font-bold opacity-50">
                Eclesiastés 4:9
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1, delay: 2.5, repeat: Infinity, repeatType: "reverse" }}
            className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-widest font-sans font-bold">Deslizar</span>
            <div className="w-[1px] h-8 md:h-12 bg-wedding-cream" />
          </motion.div>
        </section>

        {/* Main Content Sections */}
        <main className="max-w-4xl mx-auto py-20 md:py-32 space-y-32 md:space-y-48">
          
          {/* Countdown Section */}
          <motion.section 
            initial={{ opacity: 0, scale: 0.98, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-12"
          >
            <div className="space-y-6">
              <Heart className="w-8 h-8 mx-auto opacity-30 fill-wedding-cream/10" />
              <h2 className="text-4xl md:text-5xl font-display italic">falta poco para nuestro gran día</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 border border-wedding-cream/10 bg-white/5 backdrop-blur-sm rounded-3xl p-6 md:p-8 w-fit mx-auto shadow-xl">
              <CountdownItem value={timeLeft.days} label="Días" />
              <CountdownItem value={timeLeft.hours} label="Horas" />
              <CountdownItem value={timeLeft.minutes} label="Minutos" />
              <CountdownItem value={timeLeft.seconds} label="Segundos" />
            </div>
          </motion.section>

        {/* Event Details: Ceremony & Party */}
        <div className="space-y-32 md:space-y-48">
          {/* Ceremony Section */}
          <motion.section 
            initial={{ opacity: 0, x: -60, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid md:grid-cols-2 gap-12 md:gap-24 items-center"
          >
            <div className="space-y-10 md:space-y-12">
              <div className="space-y-6 text-center md:text-left">
                <div className="flex justify-center md:justify-start">
                  <Church className="w-12 h-12 opacity-80" />
                </div>
                <div className="h-[1px] w-12 bg-wedding-cream/30 mx-auto md:mx-0" />
                <p className="opacity-90 leading-relaxed font-light text-xl">
                  Los esperamos para compartir el momento más importante de nuestras vidas, donde daremos el "sí" oficial.
                </p>
              </div>

              <div className="space-y-8 md:space-y-10">
                <div className="flex items-start gap-4 md:gap-6 group">
                  <div className="p-3 bg-wedding-cream/10 rounded-full border border-wedding-cream/10">
                    <Calendar className="w-5 h-5 opacity-90 transition-opacity" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-[11px] uppercase tracking-widest font-sans font-bold text-wedding-cream/80">Fecha</h3>
                    <p className="text-xl md:text-2xl font-light">Sábado, 5 de Septiembre de 2026</p>
                  </div>
                </div>

                <a 
                  href="https://www.google.com/maps/search/Roca+73"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 md:gap-6 group hover:translate-x-1 transition-transform"
                >
                  <div className="p-3 bg-wedding-cream/10 rounded-full border border-wedding-cream/10">
                    <MapPin className="w-5 h-5 opacity-90 transition-opacity" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-[11px] uppercase tracking-widest font-sans font-bold text-wedding-cream/80">Lugar</h3>
                    <p className="text-xl md:text-2xl font-light">Iglesia — Roca 73</p>
                    <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-sans font-bold text-wedding-cream/90 mt-2 border-b border-wedding-cream/40 pb-0.5 w-fit uppercase tracking-widest">
                      Ver en Google Maps <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-4 md:gap-6 group">
                  <div className="p-3 bg-wedding-cream/10 rounded-full border border-wedding-cream/10">
                    <Clock className="w-5 h-5 opacity-90 transition-opacity" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-[11px] uppercase tracking-widest font-sans font-bold text-wedding-cream/80">Hora</h3>
                    <p className="text-xl md:text-2xl font-light">19:30 hs — Ceremonia Religiosa</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 order-first md:order-last">
              <motion.div 
                initial={{ opacity: 0, scale: 0.85, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl"
              >
                <img src={CEREMONY_IMAGES[0]} alt="Ceremonia 1" className="w-full h-full object-cover object-right" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
              </motion.div>
              <div className="space-y-2">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.85, x: 30 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="aspect-square rounded-2xl overflow-hidden shadow-xl"
                >
                  <img src={CEREMONY_IMAGES[1]} alt="Ceremonia 2" className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.85, x: 30 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="aspect-square rounded-2xl overflow-hidden shadow-xl"
                >
                  <img src={CEREMONY_IMAGES[2]} alt="Ceremonia 3" className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Party Section */}
          <motion.section 
            initial={{ opacity: 0, x: 60, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid md:grid-cols-2 gap-12 md:gap-24 items-center"
          >
            <div className="grid grid-cols-2 gap-2 order-first md:order-none">
              <div className="space-y-2">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.85, x: -30 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="aspect-square rounded-2xl overflow-hidden shadow-xl"
                >
                  <img src={PARTY_IMAGES[0]} alt="Fiesta 1" className="w-full h-full object-cover object-right" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.85, x: -30 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="aspect-square rounded-2xl overflow-hidden shadow-xl"
                >
                  <img src={PARTY_IMAGES[1]} alt="Fiesta 2" className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
                </motion.div>
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.85, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl"
              >
                <img src={PARTY_IMAGES[2]} alt="Fiesta 3" className="w-full h-full object-cover object-left" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
              </motion.div>
            </div>

            <div className="space-y-10 md:space-y-12 text-center md:text-left">
              <div className="space-y-6">
                <div className="flex justify-center md:justify-start">
                  <PartyPopper className="w-12 h-12 opacity-80" />
                </div>
                <div className="h-[1px] w-12 bg-wedding-cream/30 mx-auto md:mx-0" />
                <p className="opacity-90 leading-relaxed font-light text-xl">
                  Después del sí, ¡celebramos a lo grande!<br />
                  Los esperamos para brindar, bailar y disfrutar de una noche inolvidable.
                </p>
              </div>

              <div className="space-y-8 md:space-y-10">
                <div className="flex items-start gap-4 md:gap-6 group">
                  <div className="p-3 bg-wedding-cream/10 rounded-full border border-wedding-cream/10">
                    <Calendar className="w-5 h-5 opacity-90 transition-opacity" />
                  </div>
                  <div className="space-y-1 text-left">
                    <h3 className="text-[11px] uppercase tracking-widest font-sans font-bold text-wedding-cream/80">Fecha</h3>
                    <p className="text-xl md:text-2xl font-light">Sábado, 5 de Septiembre de 2026</p>
                  </div>
                </div>

                <a 
                  href={MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 md:gap-6 group hover:translate-x-1 transition-transform"
                >
                  <div className="p-3 bg-wedding-cream/10 rounded-full border border-wedding-cream/10">
                    <MapPin className="w-5 h-5 opacity-90 transition-opacity" />
                  </div>
                  <div className="space-y-1 text-left">
                    <h3 className="text-[11px] uppercase tracking-widest font-sans font-bold text-wedding-cream/80">Lugar</h3>
                    <p className="text-xl md:text-2xl font-light">Salón Orión Eventos</p>
                    <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-sans font-bold text-wedding-cream/90 mt-2 border-b border-wedding-cream/40 pb-0.5 w-fit uppercase tracking-widest">
                      Ver en Google Maps <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-4 md:gap-6 group">
                  <div className="p-3 bg-wedding-cream/10 rounded-full border border-wedding-cream/10">
                    <Clock className="w-5 h-5 opacity-90 transition-opacity" />
                  </div>
                  <div className="space-y-1 text-left">
                    <h3 className="text-[11px] uppercase tracking-widest font-sans font-bold text-wedding-cream/80">Hora</h3>
                    <p className="text-xl md:text-2xl font-light">21:00 hs</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 md:gap-6 group">
                  <div className="p-3 bg-wedding-cream/10 rounded-full border border-wedding-cream/10">
                    <Shirt className="w-5 h-5 opacity-90 transition-opacity" />
                  </div>
                  <div className="space-y-1 text-left">
                    <h3 className="text-[11px] uppercase tracking-widest font-sans font-bold text-wedding-cream/80">Vestimenta</h3>
                    <p className="text-xl md:text-2xl font-light">Elegante</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>

          {/* Momentos - Collage Section */}
          <motion.section 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10 md:space-y-12 text-center"
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-display italic">Momentos</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[150px] md:auto-rows-[200px]">
              {MOMENTOS_IMAGES.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    opacity: 0, 
                    y: 40, 
                    scale: 0.9,
                    rotate: i % 2 === 0 ? -2 : 2,
                  }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                  whileHover={{ scale: 1.03, rotate: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative overflow-hidden rounded-2xl shadow-lg border border-white/10 ${
                    i === 2 ? "col-span-2 row-span-2" : 
                    i === 4 ? "hidden md:block row-span-2" : 
                    i === 5 ? "md:row-span-1" :
                    i === 6 ? "col-span-2" : ""
                  }`}
                >
                  <img 
                    src={src} 
                    alt={`Momento ${i + 1}`} 
                    className={`w-full h-full object-cover transition-transform duration-700 hover:scale-110 ${
                      i === 2 || i === 3 ? "object-right" : 
                      i === 4 ? "object-left" : 
                      "object-center"
                    }`}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* RSVP & Gift Reordered */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* RSVP first as requested */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 md:p-16 bg-wedding-cream text-wedding-blue rounded-[2.5rem] md:rounded-[3rem] space-y-10 flex flex-col justify-between shadow-2xl text-center"
            >
              <div className="space-y-6">
                <div className="bg-wedding-blue/10 p-3 rounded-full w-fit mx-auto">
                  <Check className="w-7 h-7 opacity-90" />
                </div>
                <h2 className="text-4xl font-display italic">Confirmación</h2>
                <p className="opacity-95 leading-relaxed font-semibold text-xl">
                  Por favor, confírmanos tu asistencia antes del 1 de Agosto de 2026 para una mejor organización.
                </p>
              </div>
              <a 
                href="https://wa.me/542915054942?text=%C2%A1Hola%20Mica%20y%20Fran!%20Queremos%20confirmarles%20que%20vamos%20a%20estar%20acompa%C3%B1%C3%A1ndolos%20en%20su%20gran%20d%C3%ADa.%20%C2%A1Estamos%20muy%20felices%20por%20ustedes!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block py-6 bg-wedding-blue text-wedding-cream text-center rounded-full font-sans uppercase tracking-[0.3em] text-[12px] hover:scale-105 active:scale-95 transition-all font-bold shadow-xl"
              >
                Confirmar Asistencia
              </a>
            </motion.div>

            {/* Gift second (Below RSVP on mobile, Right on desktop) */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="p-8 md:p-16 border border-wedding-cream/20 bg-[#334062]/50 backdrop-blur-sm rounded-[2.5rem] md:rounded-[3rem] space-y-10 shadow-lg text-center"
            >
              <div className="space-y-6">
                <div className="bg-wedding-cream/10 p-3 rounded-full w-fit mx-auto">
                  <Gift className="w-7 h-7 opacity-80" />
                </div>
                <h2 className="text-4xl font-display italic">Regalos</h2>
                <p className="opacity-90 leading-relaxed font-light text-xl">
                  ¡Gracias a Dios ya tenemos todo para nuestro nuevo hogar!<br /><br />
                  Si querés regalarnos algo, podés sumar tu aporte para nuestros próximos proyectos.
                </p>
              </div>
              <div className="pt-8 border-t border-wedding-cream/20 space-y-6">
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-widest font-sans font-bold text-wedding-cream/80">CBU</span>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-base md:text-lg font-mono tracking-wide text-wedding-cream py-1">2850564040095483607798</p>
                    <CopyButton text="2850564040095483607798" />
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-widest font-sans font-bold text-wedding-cream/80">Alias</span>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-lg md:text-xl font-display text-wedding-cream">micayfran.boda</p>
                    <CopyButton text="micayfran.boda" />
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-widest font-sans font-bold text-wedding-cream/80">Titular</span>
                  <p className="text-lg md:text-xl font-display text-wedding-cream">Francisco Vaccani</p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Final Large Image Section */}
          <motion.section
            initial={{ opacity: 0, scale: 0.92, y: 60 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[40vh] md:h-[60vh] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-white/10"
          >
            <div className="absolute inset-0 bg-wedding-blue/20 z-10" />
            <motion.img 
              src="/fotos/Book Mica y Fran (601).jpg" 
              alt="Mica y Fran" 
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.section>
        </main>

        {/* Footer */}
        <footer className="py-24 px-6 text-center space-y-12 border-t border-wedding-cream/10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <Heart className="w-8 h-8 text-wedding-cream/40 animate-pulse fill-wedding-cream/20" />
          </motion.div>
          <div className="space-y-6">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-5xl italic opacity-95"
            >
              Mica & Fran
            </motion.p>
            <div className="h-[1px] w-16 bg-wedding-cream/30 mx-auto" />
            <p className="text-[12px] tracking-[0.5em] font-bold opacity-80 uppercase font-sans">Septiembre 05, 2026</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
