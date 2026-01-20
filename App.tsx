
import React, { useState, useEffect, useRef } from 'react';
import { 
  ChefHat, Utensils, Award, Clock, Star, 
  MapPin, Phone, Mail, Instagram, Facebook, Twitter,
  ShieldCheck, Download, Gift,
  CalendarCheck, Building, Leaf, Flame, ShoppingBag, Send, Menu, X, Users, CheckCircle,
  Coffee, ChevronRight, ChevronDown, Percent, GlassWater, Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const btnHover = {
  hover: { 
    scale: 1.05, 
    backgroundColor: "#B87C4C", 
    color: "#ffffff",
    boxShadow: "0 10px 20px rgba(184, 124, 76, 0.3)"
  },
  tap: { scale: 0.95 }
};

// --- Reusable Components ---
const Section = ({ id = "", children, className = "" }: React.PropsWithChildren<{ id?: string, className?: string }>) => (
  <motion.section 
    id={id} 
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    variants={fadeInUp}
    className={`py-16 md:py-24 px-6 md:px-12 lg:px-24 w-full relative box-border overflow-hidden ${className}`}
  >
    <div className="max-w-7xl mx-auto">{children}</div>
  </motion.section>
);

const MenuCard = ({ name, price, description, img, tag }: { name: string, price: string, description: string, img: string, tag?: string }) => (
  <motion.div 
    whileHover={{ y: -12, scale: 1.02 }}
    className="bg-white rounded-[2.5rem] overflow-hidden shadow-md hover:shadow-2xl border-2 border-transparent hover:border-terracotta transition-all duration-500 group"
  >
    <div className="h-56 md:h-64 overflow-hidden relative">
      <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition duration-1000" alt={name} />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-all" />
      {tag && <span className="absolute top-4 left-4 bg-terracotta text-white text-[10px] font-bold px-3 py-1 rounded-full">{tag}</span>}
    </div>
    <div className="p-8">
      <h4 className="text-xl md:text-2xl font-serif mb-2">{name}</h4>
      <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-2">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold font-serif text-charcoal">{price}</span>
        <motion.button 
          whileHover={{ x: 5, color: "#B87C4C" }}
          whileTap={{ scale: 0.9 }} 
          className="text-terracotta font-bold text-xs uppercase tracking-widest border-b border-terracotta/20 pb-1 flex items-center gap-1"
        >
          Order Now <ChevronRight size={14} />
        </motion.button>
      </div>
    </div>
  </motion.div>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ease-in-out ${
      scrolled 
      ? 'py-3 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]' 
      : 'py-6 bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className={`text-2xl font-serif font-bold tracking-tighter transition-all duration-500 ${scrolled ? 'text-charcoal' : 'text-cream'}`}>SUFI</div>
        
        <div className={`hidden lg:flex gap-10 text-[10px] font-bold uppercase tracking-[0.2em] ${scrolled ? 'text-charcoal' : 'text-cream/90'}`}>
          {['Home', 'Specialities', 'Karahi', 'BBQ', 'Events', 'Visit'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="relative group transition-colors hover:text-terracotta">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-terracotta transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <motion.button 
            variants={btnHover}
            whileHover="hover"
            whileTap="tap"
            className={`px-7 py-2.5 rounded-full font-bold text-[10px] uppercase tracking-widest transition-all border ${
              scrolled 
              ? 'border-terracotta text-terracotta bg-white/50 hover:bg-terracotta hover:text-white' 
              : 'border-cream text-cream hover:bg-cream hover:text-sage'
            }`}
          >
            Order Now
          </motion.button>
          <button 
            className={`lg:hidden transition-colors ${scrolled ? 'text-charcoal' : 'text-cream'}`} 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }} 
            className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-2xl lg:hidden overflow-hidden shadow-2xl border-b border-sage/10"
          >
            <div className="flex flex-col p-10 gap-8 text-[11px] font-bold uppercase text-charcoal tracking-[0.3em] items-center">
              {['Home', 'Specialities', 'Karahi', 'BBQ', 'Events', 'Visit'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="hover:text-terracotta transition-colors">{item}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default function App() {
  return (
    <div className="bg-cream font-sans text-charcoal w-full selection:bg-terracotta selection:text-white">
      <Navbar />

      {/* S1: IMMERSIVE HERO */}
      <section id="home" className="relative h-screen flex items-center justify-center bg-sage overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-60">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-chicken-skewers-on-a-hot-grill-23214-large.mp4" type="video/mp4" />
        </video>
        <div className="relative z-20 text-center px-4 max-w-4xl">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-cream text-xs md:text-sm font-bold uppercase tracking-[0.6em] mb-4 block">The Hearth of Islamabad</motion.span>
          <motion.h1 initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.8, duration: 1 }} className="text-7xl md:text-[10rem] font-serif font-bold text-cream mb-8 leading-none">SUFI</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="text-xl md:text-3xl text-cream/80 font-serif italic mb-10">Legendary Taste, Timeless Heritage.</motion.p>
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.5 }} className="flex gap-4 justify-center">
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "#333333" }}
              whileTap={{ scale: 0.95 }}
              className="bg-terracotta text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-terracotta/20"
            >
              Order Delivery
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="glass text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all"
            >
              Book A Table
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* S2: THE SUFI PHILOSOPHY */}
      <Section id="philosophy" className="bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">A Legacy of Flame</h2>
          <p className="text-gray-500 leading-relaxed italic">At Sufi, we believe food is more than sustenance; it's a bridge to our roots. Using apricot wood coal and stone-ground spices, we've kept the same flame burning since 1984.</p>
        </div>
      </Section>

      {/* S3: QUICK ACTION BAR */}
      <div className="bg-sage/10 py-8 border-y border-sage/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-12 text-xs font-bold uppercase tracking-widest text-terracotta">
          <motion.div whileHover={{ y: -2 }} className="flex items-center gap-2 cursor-default"><Flame size={16} /> Live BBQ</motion.div>
          <motion.div whileHover={{ y: -2 }} className="flex items-center gap-2 cursor-default"><Clock size={16} /> Open til 2 AM</motion.div>
          <motion.div whileHover={{ y: -2 }} className="flex items-center gap-2 cursor-default"><MapPin size={16} /> G-7 Markaz</motion.div>
        </div>
      </div>

      {/* S4: SOCIAL ICONS & S5: AWARDS */}
      <Section id="recognition" className="bg-white mx-auto py-8"> 
  {/* justify-center add kiya hai taake sab kuch center ho jaye */}
  <div className="flex flex-col justify-center items-center gap-6">
    <div className="flex gap-8">
      <motion.div whileHover={{ scale: 1.2, color: "#B87C4C" }}>
        <Instagram className="text-sage cursor-pointer transition-colors" />
      </motion.div>
      <motion.div whileHover={{ scale: 1.2, color: "#B87C4C" }}>
        <Facebook className="text-sage cursor-pointer transition-colors" />
      </motion.div>
      <motion.div whileHover={{ scale: 1.2, color: "#B87C4C" }}>
        <Twitter className="text-sage cursor-pointer transition-colors" />
      </motion.div>
    </div>
  </div>
</Section>

      {/* S6: CHAPPAL KABAB SPOTLIGHT */}
      <Section id="specialities" className="bg-cream">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div whileHover={{ scale: 1.02 }} className="relative rounded-[3rem] overflow-hidden shadow-2xl transition-transform duration-700">
            <img src="./img/kab.jpg" alt="Chappal Kabab" className="w-full" />
            <div className="absolute inset-0 bg-terracotta/20 mix-blend-multiply" />
          </motion.div>
          <div>
            <span className="text-terracotta font-bold uppercase tracking-widest text-xs">The Legend</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-6">Special Chappal Kabab</h2>
            <p className="text-gray-600 mb-8 italic">Our signature Peshawari style kababs, hand-pressed and shallow-fried in organic marrow fat for that melt-in-the-mouth texture.</p>
            <div className="flex gap-12 font-serif mb-8">
              <div><p className="text-2xl font-bold">Rs. 250</p><p className="text-[10px] uppercase text-gray-500">Single Portion</p></div>
              <div><p className="text-2xl font-bold text-terracotta">Rs. 450</p><p className="text-[10px] uppercase text-gray-500">Double Special</p></div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "#333333" }}
              whileTap={{ scale: 0.95 }}
              className="bg-terracotta text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all"
            >
              View Specialities
            </motion.button>
          </div>
        </div>
      </Section>

      {/* S7: KARAHI KINGDOM & S8: WHITE KARAHI */}
      <Section id="karahi" className="bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif">Karahi Kingdom</h2>
          <div className="w-24 h-1 bg-terracotta mx-auto mt-4" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <MenuCard name="Chicken White Karahi" price="Rs. 1550" description="The cream of Islamabad. Yogurt based velvety gravy with freshly cracked white pepper." img="./img/wtk.jpg" tag="Best Seller" />
          <MenuCard name="Mutton Karahi" price="Rs. 2600" description="Fresh lean mutton cooked in its own juices with hand-picked organic tomatoes." img="https://t4.ftcdn.net/jpg/13/94/41/11/240_F_1394411172_nIAE3I5Mjb6LgDwEwSJhK7D6crSho3S0.jpg" />
          <MenuCard name="Sufi Desi Ghee Karahi" price="Rs. 1850" description="Prepared in pure Desi Ghee for the ultimate traditional feast experience." img="https://media.gettyimages.com/id/1434775113/photo/chicken-tikka-masala.jpg?s=612x612&w=0&k=20&c=O5Y6wwZM0Jo_42WXzOp6XRZVJdf7NkXGpsPcbHGPy9I=" />
        </div>
      </Section>

      {/* S9: CHEF'S SECRET SPICES & S10: RICE SELECTION */}
      <Section className="bg-cream">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-serif mb-4">Rice Varieties</h3>
            <p className="text-gray-500 mb-8">Long grain basmati, aged to perfection.</p>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between border-b border-sage/20 pb-2"><span>Chicken Biryani (Single)</span><span className="font-bold">Rs. 350</span></div>
              <div className="flex justify-between border-b border-sage/20 pb-2"><span>Sufi Special Biryani</span><span className="font-bold text-terracotta">Rs. 550</span></div>
              <div className="flex justify-between border-b border-sage/20 pb-2"><span>Egg Fried Rice</span><span className="font-bold">Rs. 450</span></div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05, x: 5 }}
              className="text-terracotta font-bold text-xs uppercase tracking-widest border-b border-terracotta pb-1"
            >
              Full Rice Menu
            </motion.button>
          </div>
          <motion.div whileHover={{ y: -5 }} className="bg-terracotta/5 p-12 rounded-[4rem] text-center border-2 border-terracotta/10 transition-all">
            <Leaf className="mx-auto text-sage mb-6" size={48} />
            <h4 className="text-2xl font-serif mb-4">Secret Spices</h4>
            <p className="text-sm italic text-gray-500">We grind our own cumin, coriander, and garam masala daily. No commercial packets, just nature's best.</p>
          </motion.div>
        </div>
      </Section>

      {/* S11-S12: BBQ HIGHLIGHTS & PRICE TOGGLE */}
      <Section id="bbq" className="bg-white">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-serif">Bar-B-Q Pit</h2>
            <p className="text-sage italic">Grilled to smokey perfection</p>
          </div>
          <div className="flex bg-cream p-1 rounded-full border border-sage/20">
            <motion.button whileTap={{ scale: 0.95 }} className="px-6 py-2 rounded-full text-[10px] font-bold uppercase bg-white shadow-sm transition-all">Standard</motion.button>
            <motion.button whileTap={{ scale: 0.95 }} className="px-6 py-2 rounded-full text-[10px] font-bold uppercase text-gray-400 hover:text-charcoal transition-all">Special</motion.button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <MenuCard name="Chicken Tikka" price="Rs. 320" description="Classic leg/breast piece marinated in traditional Sufi masalas." img="./img/tik.jpg" />
          <MenuCard name="Maloie Tikka" price="Rs. 650" description="Ultra creamy, mild spice boti that literally melts." img="./img/mt.jpg" tag="Family Fav" />
          <MenuCard name="Mix Bar-B-Q (Special)" price="Rs. 2450" description="The ultimate platter: Seekh Kabab, Maloie Boti, Tikka & Chappal Kabab." img="./img/bbq.jpg" tag="Best Value" />
        </div>
      </Section>

      {/* S13-S15: LIVE GRILL, HYGIENE, FAVORITES */}
      <Section className="bg-charcoal text-white rounded-[5rem] mx-4 my-20">
        <div className="grid lg:grid-cols-3 gap-12 text-center">
          <motion.div whileHover={{ scale: 1.05 }} className="p-8 transition-transform">
            <Flame className="mx-auto text-terracotta mb-6" size={40} />
            <h4 className="text-xl font-serif mb-4">Live Grill</h4>
            <p className="text-gray-400 text-sm italic">Watch your kababs sizzle right from your table.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="p-8 border-y lg:border-y-0 lg:border-x border-white/10 transition-transform">
            <ShieldCheck className="mx-auto text-sage mb-6" size={40} />
            <h4 className="text-xl font-serif mb-4">Hygiene First</h4>
            <p className="text-gray-400 text-sm italic">Surgical grade cleaning after every shift.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="p-8 transition-transform">
            <Heart className="mx-auto text-terracotta mb-6" size={40} />
            <h4 className="text-xl font-serif mb-4">Most Ordered</h4>
            <p className="text-gray-400 text-sm italic">Join 5000+ weekly patrons for our signature cuts.</p>
          </motion.div>
        </div>
      </Section>

      {/* S16-S18: AMBIENCE, FAMILY, BEVERAGES */}
      <Section id="vibe" className="bg-white">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-2 gap-4">
            <motion.img whileHover={{ scale: 1.05 }} src="https://plus.unsplash.com/premium_photo-1661954531673-440d23a6eb79?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D" className="rounded-3xl h-64 w-full object-cover shadow-lg transition-transform" />
            <motion.img whileHover={{ scale: 1.05 }} src="https://images.unsplash.com/photo-1504718855392-c0f33b372e72?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D" className="rounded-3xl h-64 w-full object-cover mt-8 shadow-lg transition-transform" />
          </div>
          <div>
            <h2 className="text-4xl font-serif mb-6">Family Friendly Vibe</h2>
            <p className="text-gray-500 mb-8 italic">A dedicated floor for families with traditional G-7 Markaz aesthetics and modern comfort.</p>
            <div className="bg-cream/50 p-8 rounded-3xl">
              <div className="flex items-center gap-4 mb-4"><GlassWater className="text-sage" /> <span className="text-sm font-bold uppercase tracking-widest">Beverage Corner</span></div>
              <p className="text-xs text-gray-400 italic mb-4">Fresh juices, Mint Margaritas, and Traditional Lassi prepared fresh on order.</p>
              <motion.button whileHover={{ scale: 1.05 }} className="text-xs font-bold text-terracotta uppercase tracking-widest border-b border-terracotta pb-1 transition-all">Explore Drinks</motion.button>
            </div>
          </div>
        </div>
      </Section>

      {/* S19-S21: WEB DEAL, CATERING, TESTIMONIALS */}
      <Section id="events" className="bg-cream">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white p-12 rounded-[4rem] shadow-xl text-center border-2 border-transparent hover:border-terracotta/20 transition-all duration-500"
          >
            <Percent className="mx-auto text-terracotta mb-6" size={48} />
            <h3 className="text-2xl font-serif mb-4">Exclusive Web Deal</h3>
            <p className="text-gray-500 mb-8">Use code <span className="font-bold text-charcoal">SUFIWEB10</span> for 10% off your first online order.</p>
            <motion.button 
              whileHover={{ scale: 1.1, backgroundColor: "#333333" }}
              whileTap={{ scale: 0.9 }}
              className="bg-terracotta text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-terracotta/20 transition-all"
            >
              Claim Discount
            </motion.button>
          </motion.div>
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-sage text-white p-12 rounded-[4rem] shadow-xl text-center border-2 border-transparent hover:border-white/20 transition-all duration-500"
          >
            <Building className="mx-auto mb-6" size={48} />
            <h3 className="text-2xl font-serif mb-4">Sufi Corporate</h3>
            <p className="text-cream/80 mb-8">Elevate your office events with our live BBQ setup and premium catering services.</p>
            <motion.button 
              whileHover={{ scale: 1.1, backgroundColor: "#ffffff", color: "#A8BBA3" }}
              whileTap={{ scale: 0.9 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all"
            >
              Book Event
            </motion.button>
          </motion.div>
        </div>
      </Section>

      {/* S22-S24: MAP, CONTACT, INSTAGRAM */}
      <Section id="visit" className="bg-white">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl font-serif mb-8">Find Us</h2>
            <motion.div whileHover={{ scale: 1.01 }} className="h-[400px] bg-gray-100 rounded-[3rem] overflow-hidden grayscale relative border border-sage/10 group cursor-pointer transition-all">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="p-4 bg-terracotta rounded-full text-white shadow-2xl"><MapPin size={32} /></motion.div>
              </div>
            </motion.div>
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-serif mb-6">Drop us a Message</h3>
            <div className="space-y-4">
              <input placeholder="Your Name" className="w-full p-4 rounded-2xl bg-cream/50 outline-none border border-transparent focus:border-terracotta transition-all text-sm" />
              <input placeholder="Email Address" className="w-full p-4 rounded-2xl bg-cream/50 outline-none border border-transparent focus:border-terracotta transition-all text-sm" />
              <textarea placeholder="How can we help?" rows={4} className="w-full p-4 rounded-2xl bg-cream/50 outline-none border border-transparent focus:border-terracotta transition-all text-sm" />
              <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: "#B87C4C" }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-charcoal text-white rounded-2xl font-bold uppercase tracking-widest text-xs transition-all shadow-xl"
              >
                Send Message
              </motion.button>
            </div>
          </div>
        </div>
      </Section>

      {/* S25: NEWSLETTER */}
      <Section className="bg-cream">
        <div className="max-w-4xl mx-auto bg-white p-16 rounded-[4rem] shadow-lg text-center border border-sage/10 overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-700"><Send size={150} /></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-serif mb-4">Sufi Foodie Club</h2>
            <p className="text-gray-500 mb-10 italic">Join for monthly secrets, VIP deals, and heritage updates.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input placeholder="Email address" className="flex-1 p-4 rounded-2xl bg-cream/50 text-sm outline-none border border-transparent focus:border-terracotta transition-all" />
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "#333333" }}
                whileTap={{ scale: 0.95 }}
                className="bg-terracotta text-white px-10 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-terracotta/20"
              >
                Join Now
              </motion.button>
            </div>
          </div>
        </div>
      </Section>

      {/* S26-S27: FOOTER & BRANDING */}
      <footer id="contact" className="bg-charcoal text-white pt-24 pb-12 px-6 md:px-12 lg:px-24 rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto grid md:col-span-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-3xl font-serif font-bold mb-8">SUFI</h2>
            <p className="text-gray-500 text-sm italic mb-10 leading-relaxed">"Islamabad's oldest hearth, still burning bright with the same passion since 1984."</p>
            <div className="flex gap-6">
              <motion.div whileHover={{ scale: 1.2, color: "#B87C4C" }}><Instagram size={20} className="cursor-pointer transition" /></motion.div>
              <motion.div whileHover={{ scale: 1.2, color: "#B87C4C" }}><Facebook size={20} className="cursor-pointer transition" /></motion.div>
              <motion.div whileHover={{ scale: 1.2, color: "#B87C4C" }}><Twitter size={20} className="cursor-pointer transition" /></motion.div>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-8 text-xs uppercase tracking-widest text-terracotta">Navigation</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><motion.a whileHover={{ x: 5, color: "#ffffff" }} href="#home" className="inline-block transition-colors">Home</motion.a></li>
              <li><motion.a whileHover={{ x: 5, color: "#ffffff" }} href="#specialities" className="inline-block transition-colors">Full Menu</motion.a></li>
              <li><motion.a whileHover={{ x: 5, color: "#ffffff" }} href="#events" className="inline-block transition-colors">Catering</motion.a></li>
              <li><motion.a whileHover={{ x: 5, color: "#ffffff" }} href="#home" className="inline-block transition-colors">Reservations</motion.a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-8 text-xs uppercase tracking-widest text-terracotta">Contact</h4>
            <div className="space-y-4 text-sm text-gray-500">
              <motion.div whileHover={{ x: 5 }} className="flex gap-4 cursor-default"><MapPin size={20} className="text-white" /> Plot 42, G-7 Markaz, Islamabad</motion.div>
              <motion.div whileHover={{ x: 5 }} className="flex gap-4 cursor-default"><Phone size={20} className="text-white" /> +92 51 234 5678</motion.div>
              <motion.div whileHover={{ x: 5 }} className="flex gap-4 cursor-default"><Mail size={20} className="text-white" /> salam@sufi.pk</motion.div>
            </div>
          </div>
          <div className="bg-white/5 p-8 rounded-[3rem] border border-white/5 group">
            <h4 className="font-bold mb-4 text-xs uppercase tracking-widest text-white">Daily Hours</h4>
            <p className="text-gray-500 text-sm italic mb-6">12:00 PM — 02:00 AM</p>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "#B87C4C" }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-white/10 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-xl border border-white/10 transition-all flex items-center justify-center gap-2"
            >
              <Flame size={14} className="text-terracotta group-hover:text-white transition-colors" /> Call To Order
            </motion.button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-[10px] uppercase tracking-widest text-gray-500">© 2024 SUFI RESTAURANT. TRADITION PRESERVED.</p>
           <p className="text-[10px] uppercase tracking-[0.4em] text-gray-500">
             Designed with passion by <span className="text-white font-bold">AM Stack</span>
           </p>
        </div>
      </footer>
    </div>
  );
}
