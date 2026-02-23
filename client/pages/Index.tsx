import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Building, MapPin, Users, ChevronRight, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";
import { useState, useEffect } from "react";

const properties = [
  {
    id: 1,
    name: "Modern Penthouse",
    location: "Downtown Manhattan",
    price: "$2.5M",
    image: "/p1.png",
    beds: 4,
    baths: 3,
    sqft: "3,500",
  },
  {
    id: 2,
    name: "Luxury Beachfront",
    location: "Miami Beach",
    price: "$3.2M",
    image: "/p2.jpg",
    beds: 5,
    baths: 4,
    sqft: "4,200",
  },
  {
    id: 3,
    name: "Contemporary Villa",
    location: "Los Angeles",
    price: "$4.8M",
    image: "/p3.jpeg",
    beds: 6,
    baths: 5,
    sqft: "5,800",
  },
  {
    id: 4,
    name: "Historic Brownstone",
    location: "Brooklyn Heights",
    price: "$1.9M",
    image: "/p4.jpg",
    beds: 3,
    baths: 2,
    sqft: "2,800",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}; 

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// Hero background images for carousel
const heroBackgrounds = [
  "/bp1.jpg",
  "/bp2.avif",
  "/bp3.webp",
  "/bp4.jpg",
  "/bp5.jpg",
];

// Hero Background Carousel Component
function HeroBackgroundCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroBackgrounds[currentIndex]})` }}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/70" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {heroBackgrounds.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => setCurrentIndex((prev) => (prev - 1 + heroBackgrounds.length) % heroBackgrounds.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all"
      >
        <ChevronLeft size={24} className="text-white" />
      </button>
      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % heroBackgrounds.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all"
      >
        <ChevronRightIcon size={24} className="text-white" />
      </button>
    </div>
  );
}

function PropertyCard({ property, index }: any) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Background gradient/image */}
      <div
        className="absolute inset-0 transition-transform duration-500 bg-cover bg-center"
        style={{
          backgroundImage: property.image.startsWith('linear-gradient')
            ? property.image
            : `url(${property.image})`,
          transform: isHovered ? "scale(1.1)" : "scale(1)",
        }}
      />
 
      {/* 3D Effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

      {/* Floating effect on hover */}
      <motion.div
        animate={{
          y: isHovered ? -10 : 0,
        }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 flex flex-col justify-between p-6"
      >
        <div>
          <motion.div
            animate={{
              y: isHovered ? -5 : 0,
            }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-white/80 text-sm"
          >
            <MapPin size={16} />
            <span>{property.location}</span>
          </motion.div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-white text-2xl font-bold mb-2">
              {property.name}
            </h3>
            <p className="text-accent text-lg font-semibold">{property.price}</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10,
            }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-3 gap-4 py-4 border-t border-white/20"
          >
            <div>
              <p className="text-white/60 text-xs uppercase">Beds</p>
              <p className="text-white font-semibold">{property.beds}</p>
            </div>
            <div>
              <p className="text-white/60 text-xs uppercase">Baths</p>
              <p className="text-white font-semibold">{property.baths}</p>
            </div>
            <div>
              <p className="text-white/60 text-xs uppercase">Sqft</p>
              <p className="text-white font-semibold">{property.sqft}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-accent font-semibold"
          >
            View Details <ChevronRight size={18} />
          </motion.div>
        </div>
      </motion.div>

      {/* 3D border effect */}
      <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-accent/30 transition-colors duration-300" />
    </motion.div>
  );
}

export default function Index() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3"
          >
            <img src="/logo.png" alt="Express Realty" className="h-10 w-auto" />
            <div className="flex flex-col">
            </div>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            <motion.a
              whileHover={{ y: -2 }}
              href="#properties"
              className="font-medium text-gray-600 hover:text-primary transition-colors"
            >
              Properties
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              href="#about"
              className="font-medium text-gray-600 hover:text-primary transition-colors"
            >
              About
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
            >
              Contact
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Sliding background carousel */}
        <HeroBackgroundCarousel />

        {/* Floating elements */}
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl z-10"
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl z-10"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary font-semibold text-sm">
              Welcome to Express Reality
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-gradient"
          >
            Discover Your
            <span className="text-gradient"> Dream Property</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Explore stunning 3D tours of luxury properties and experience real
            estate like never before. Immersive, interactive, and beautifully
            designed.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center justify-center gap-2 group"
            >
              Explore Properties
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRight size={20} />
              </motion.span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              Schedule Tour
            </motion.button>
          </motion.div>

          {/* Floating stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 md:gap-8"
          >
            {[
              { number: "500+", label: "Properties" },
              { number: "10k+", label: "Happy Clients" },
              { number: "3D", label: "Tours Available" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="glass-effect p-4 md:p-6 rounded-xl"
              >
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Properties Section */}
      <section
        id="properties"
        className="py-20 md:py-32 px-6 bg-gradient-to-b from-background to-primary/5"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured<span className="text-gradient"> Properties</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked luxury properties from around the world
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {properties.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="about" className="py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose<span className="text-gradient"> Express Realty</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Building,
                title: "3D Virtual Tours",
                description:
                  "Experience properties in stunning 360° 3D before visiting in person",
              },
              {
                icon: Users,
                title: "Expert Agents",
                description:
                  "Work with certified real estate professionals with 20+ years of experience",
              },
              {
                icon: MapPin,
                title: "Prime Locations",
                description:
                  "Properties in the most desirable neighborhoods across the globe",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="glass-effect p-8 rounded-2xl text-center group"
              >
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl mb-6 group-hover:bg-primary/20 transition-colors"
                >
                  <item.icon
                    size={32}
                    className="text-primary group-hover:text-primary/80"
                  />
                </motion.div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-6 relative overflow-hidden">
        {/* Background animation */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 opacity-50"
          style={{ backgroundSize: "200% 200%" }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Ready to Find Your Dream Home?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Subscribe to our newsletter and get exclusive access to new listings
            and premium 3D tours
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-3 bg-white dark:bg-secondary/30 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary whitespace-nowrap"
            >
              Subscribe
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background/50 backdrop-blur-sm py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8"
          >
            <div>
              <div className="flex items-center gap-2 font-bold text-primary mb-4">
                <img src="/logo.png" alt="Express Realty" className="h-6 w-auto" />
                <span>Express Realty</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Transforming the real estate experience with immersive 3D technology
              </p>
            </div>

            {[
              {
                title: "Company",
                links: ["About", "Careers", "Blog"],
              },
              {
                title: "Properties",
                links: ["For Sale", "For Rent", "Featured"],
              },
              {
                title: "Support",
                links: ["FAQ", "Contact", "Privacy"],
              },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-semibold mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm">
            <p>&copy; 2026 Express Realty. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Instagram
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
