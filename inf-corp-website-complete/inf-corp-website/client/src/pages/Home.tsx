import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Code2,
  Smartphone,
  Award,
  Shield,
  Users,
  Zap,
  Globe,
  Lock,
  Palette,
  Briefcase,
  Server,
  Gamepad2,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";

/**
 * INF Corp Website - Modern Minimalist Design
 * Design Philosophy: Swiss Design meets Contemporary Tech Minimalism
 * Color Scheme: Charcoal (#1a1a1a), Off-white (#f8f8f8), Teal (#00d9ff)
 * Typography: IBM Plex Sans for clean, geometric aesthetic
 * Animations: Smooth fade-ins, slide-ups, hover effects, and scroll-triggered reveals
 */

const CONTACT_EMAIL = "INFCORP21@gmail.com";
const CONTACT_PHONE = "0694041526";
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61587274086419";

const OPERATIONAL_HOURS = {
  weekdays: "8:00 AM - 5:00 PM",
  saturday: "8:00 AM - 1:00 PM",
  sunday: "Closed",
};

interface Service {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: "development" | "security" | "design" | "infrastructure";
}

const services: Service[] = [
  {
    id: "web-dev",
    name: "Website Development",
    description:
      "Custom, responsive websites built with modern technologies and best practices.",
    icon: <Code2 className="w-8 h-8" />,
    category: "development",
  },
  {
    id: "app-dev",
    name: "App Development",
    description:
      "Native and cross-platform mobile applications tailored to your business needs.",
    icon: <Smartphone className="w-8 h-8" />,
    category: "development",
  },
  {
    id: "bee-cert",
    name: "BEE Certification",
    description:
      "Black Economic Empowerment compliance and certification support.",
    icon: <Award className="w-8 h-8" />,
    category: "infrastructure",
  },
  {
    id: "cip",
    name: "CIP",
    description:
      "Comprehensive Information Protection and compliance solutions.",
    icon: <Shield className="w-8 h-8" />,
    category: "security",
  },
  {
    id: "business-reg",
    name: "Business Registration",
    description:
      "Complete business registration and legal entity setup services.",
    icon: <Briefcase className="w-8 h-8" />,
    category: "infrastructure",
  },
  {
    id: "tech-support",
    name: "Computer Technician",
    description:
      "Expert technical support and computer maintenance services.",
    icon: <Zap className="w-8 h-8" />,
    category: "infrastructure",
  },
  {
    id: "graphic-design",
    name: "Graphic Design",
    description:
      "Professional graphic design for branding, marketing, and digital media.",
    icon: <Palette className="w-8 h-8" />,
    category: "design",
  },
  {
    id: "logo-design",
    name: "Logo Design",
    description:
      "Unique, memorable logo designs that represent your brand identity.",
    icon: <Briefcase className="w-8 h-8" />,
    category: "design",
  },
  {
    id: "it-support",
    name: "IT Support",
    description:
      "Comprehensive IT infrastructure support and managed services.",
    icon: <Server className="w-8 h-8" />,
    category: "infrastructure",
  },
  {
    id: "web-hosting",
    name: "Website Hosting",
    description:
      "Reliable, secure web hosting with 24/7 monitoring and support.",
    icon: <Globe className="w-8 h-8" />,
    category: "infrastructure",
  },
  {
    id: "domain-hosting",
    name: "Domain Hosting",
    description:
      "Domain registration and management with full DNS control.",
    icon: <Globe className="w-8 h-8" />,
    category: "infrastructure",
  },
  {
    id: "game-dev",
    name: "Game Development",
    description:
      "Engaging game development for various platforms and audiences.",
    icon: <Gamepad2 className="w-8 h-8" />,
    category: "development",
  },
  {
    id: "pen-testing",
    name: "Penetration Testing",
    description:
      "Advanced security testing to identify and eliminate vulnerabilities.",
    icon: <Lock className="w-8 h-8" />,
    category: "security",
  },
  {
    id: "system-upgrades",
    name: "System Upgrades",
    description:
      "Hardware and software upgrades to enhance system performance and capabilities.",
    icon: <Zap className="w-8 h-8" />,
    category: "infrastructure",
  },
  {
    id: "software-install",
    name: "Software Installation",
    description:
      "Professional installation and configuration of business software solutions.",
    icon: <Code2 className="w-8 h-8" />,
    category: "infrastructure",
  },
  {
    id: "firewall-setup",
    name: "Firewall Setup",
    description:
      "Secure firewall configuration and management for network protection.",
    icon: <Shield className="w-8 h-8" />,
    category: "security",
  },
  {
    id: "virus-malware",
    name: "Virus & Malware Removal",
    description:
      "Comprehensive detection and removal of viruses, malware, and threats.",
    icon: <Lock className="w-8 h-8" />,
    category: "security",
  },
  {
    id: "system-troubleshooting",
    name: "System Troubleshooting",
    description:
      "Expert diagnosis and resolution of system issues and performance problems.",
    icon: <Zap className="w-8 h-8" />,
    category: "infrastructure",
  },
  {
    id: "website-maintenance",
    name: "Website Maintenance",
    description:
      "Ongoing updates, security patches, and performance optimization for websites.",
    icon: <Globe className="w-8 h-8" />,
    category: "development",
  },
  {
    id: "payment-gateway",
    name: "Payment Gateway Integration",
    description:
      "Seamless integration of payment processing systems for e-commerce solutions.",
    icon: <Code2 className="w-8 h-8" />,
    category: "development",
  },
  {
    id: "it-training",
    name: "Basic IT Training",
    description:
      "Comprehensive training programs for employees on IT systems and tools.",
    icon: <Users className="w-8 h-8" />,
    category: "infrastructure",
  },
  {
    id: "cyber-training",
    name: "Cyber Security Awareness Training",
    description:
      "Employee training on security best practices and threat awareness.",
    icon: <Shield className="w-8 h-8" />,
    category: "security",
  },
];

const categories = [
  { id: "development", label: "Development", color: "from-teal-500 to-teal-600" },
  { id: "security", label: "Security", color: "from-blue-500 to-blue-600" },
  { id: "design", label: "Design", color: "from-purple-500 to-purple-600" },
  { id: "infrastructure", label: "Infrastructure", color: "from-slate-500 to-slate-600" },
];

export default function Home() {
  const [, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredServices = selectedCategory
    ? services.filter((s) => s.category === selectedCategory)
    : services;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663334940341/AUrJamMyKIBbSHmQ.JPG"
              alt="INF Corp"
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium hover:text-accent transition-colors">
              Services
            </a>
            <a href="#hours" className="text-sm font-medium hover:text-accent transition-colors">
              Hours
            </a>
            <a href="#about" className="text-sm font-medium hover:text-accent transition-colors">
              About
            </a>
            <button
              onClick={() => setLocation("/shop")}
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Shop
            </button>
            <div className="flex items-center gap-4">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-sm font-medium hover:text-accent transition-colors"
                title="Email us"
              >
                ✉️
              </a>
              <a
                href={`tel:${CONTACT_PHONE}`}
                className="text-sm font-medium hover:text-accent transition-colors"
                title="Call us"
              >
                📞
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium hover:text-accent transition-colors"
                title="Follow us on Facebook"
              >
                f
              </a>
            </div>
            <button
              onClick={() => setLocation("/login")}
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Sign In
            </button>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-secondary rounded-md transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="container py-4 flex flex-col gap-4">
              <a href="#services" className="text-sm font-medium hover:text-accent">
                Services
              </a>
              <a href="#hours" className="text-sm font-medium hover:text-accent">
                Hours
              </a>
              <a href="#about" className="text-sm font-medium hover:text-accent">
                About
              </a>
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary">
        <div
          className="absolute inset-0 opacity-20 animate-pulse"
          style={{
            backgroundImage:
              "url('https://private-us-east-1.manuscdn.com/sessionFile/2YSpQXQXAHhvXHMoWidRSF/sandbox/fCrQoJTDKIaGuLXT7fZroG-img-1_1770232424000_na1fn_aGVyby1iZw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMllTcFFYUVhBSGh2WEhNb1dpZFJTRi9zYW5kYm94L2ZDclFvSlRES0lhR3VMWFQ3Zlpyb0ctaW1nLTFfMTc3MDIzMjQyNDAwMF9uYTFmbl9hR1Z5YnkxaVp3LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=KQf8bgRoQX3CKqR6Ayx3s4K1KmALXBFJhdaBoeOoMfGNbk4mVO8o4VRl3fyn1kycG23-X1ez5zMArMid8kr-4MQjhfbrBCgsCg~Nc3Az03SrsuGt1oxzc8oTIFz-BMGdNOgwShU88Q0vfq8HnosVl68O7NqiowU097vibCuji~b5gICaC9Yh4HVVlwQnco4NkqFD7hiZ74eiaOIXgnqyUQBz0X1ztXRRUrK2IgdCAh-RNmjSgNBneqkinnAFeik5AHatPlbQehE73WnwMIR-mrr219NIQYGlxMh~MW2izTGRXb-4nfcyfaV-x38-vhwfo6zGtxEm0ZD5uOie0yT4iA__'",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="container relative z-10 py-20 md:py-32">
          <div className={`max-w-3xl transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
              Professional Business Services
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 mb-8 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              From web and app development to IT support and security solutions, INF Corp delivers
              comprehensive services to transform your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Explore Services <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-foreground/20 hover:bg-secondary transition-all duration-300 hover:scale-105"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 bg-background">
        <div className="container">
          <div className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Services</h2>
            <p className="text-foreground/60 text-lg max-w-2xl">
              Comprehensive solutions tailored to your business needs, delivered with precision and
              expertise.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-md font-medium transition-all duration-300 hover:scale-105 ${
                selectedCategory === null
                  ? "bg-accent text-accent-foreground shadow-lg"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              All Services
            </button>
            {categories.map((cat, idx) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-300 hover:scale-105 ${
                  selectedCategory === cat.id
                    ? "bg-accent text-accent-foreground shadow-lg"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
                style={{
                  animation: `fadeInUp 0.3s ease-out ${idx * 0.05}s both`,
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, index) => (
              <Card
                key={service.id}
                className="group p-6 border border-border hover:border-accent/50 hover:shadow-lg transition-all duration-300 bg-card hover:bg-secondary/50 cursor-pointer hover:scale-105 hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`,
                }}
              >
                <div className="mb-4 p-3 w-fit bg-accent/10 rounded-md group-hover:bg-accent/20 transition-all duration-300 group-hover:scale-110">
                  <div className="text-accent group-hover:animate-float">{service.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                  {service.name}
                </h3>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-4 pt-4 border-t border-border/50 flex items-center text-accent font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          .animate-slide-in-left {
            animation: slideInLeft 0.6s ease-out;
          }
          
          .animate-slide-in-right {
            animation: slideInRight 0.6s ease-out;
          }
          
          .animate-scale-in {
            animation: scaleIn 0.5s ease-out;
          }
        `}</style>
      </section>

      {/* Why Choose Us Section */}
      <section id="about" className="py-20 md:py-32 bg-secondary/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Choose INF Corp?</h2>
              <div className="space-y-6">
                <div className="flex gap-4 transition-all duration-300 hover:translate-x-2">
                  <div className="w-1 bg-accent rounded-full flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Expert Team</h3>
                    <p className="text-foreground/60">
                      Highly skilled professionals with years of industry experience.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 transition-all duration-300 hover:translate-x-2">
                  <div className="w-1 bg-accent rounded-full flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Proven Track Record</h3>
                    <p className="text-foreground/60">
                      Successfully delivered solutions for businesses across multiple sectors.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 transition-all duration-300 hover:translate-x-2">
                  <div className="w-1 bg-accent rounded-full flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
                    <p className="text-foreground/60">
                      Dedicated support team available round the clock for your needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative animate-slide-in-right">
              <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg p-8 border border-accent/20 transition-all duration-500 hover:shadow-lg hover:border-accent/40">
                <div className="space-y-4">
                  <div className="h-3 bg-accent/30 rounded-full w-3/4 animate-pulse" />
                  <div className="h-3 bg-accent/20 rounded-full w-full animate-pulse" style={{animationDelay: '0.2s'}} />
                  <div className="h-3 bg-accent/30 rounded-full w-5/6 animate-pulse" style={{animationDelay: '0.4s'}} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operating Hours Section */}
      <section id="hours" className="py-20 md:py-32 bg-secondary/50 border-t border-border">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">Operating Hours</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card p-8 rounded-lg border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h3 className="font-bold text-lg mb-3">Monday - Friday</h3>
                <p className="text-foreground/70 text-lg">{OPERATIONAL_HOURS.weekdays}</p>
              </div>
              <div className="bg-card p-8 rounded-lg border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                <h3 className="font-bold text-lg mb-3">Saturday</h3>
                <p className="text-foreground/70 text-lg">{OPERATIONAL_HOURS.saturday}</p>
              </div>
              <div className="bg-card p-8 rounded-lg border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                <h3 className="font-bold text-lg mb-3">Sunday</h3>
                <p className="text-foreground/70 text-lg">{OPERATIONAL_HOURS.sunday}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-foreground/5 to-accent/5 border-t border-border">
        <div className="container text-center animate-scale-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">Ready to Transform Your Business?</h2>
          <p className="text-lg text-foreground/60 mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Let's discuss how INF Corp can help you achieve your goals with our comprehensive
            services.
          </p>
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-all duration-300 hover:scale-110 hover:shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200"
          >
            Get in Touch
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663334940341/AUrJamMyKIBbSHmQ.JPG"
                alt="INF Corp"
                className="h-10 w-auto"
              />
            </div>
              <p className="text-sm text-foreground/60">
                Professional business services for the modern enterprise.
              </p>
              <div className="flex gap-3 mt-4">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-lg hover:text-accent transition-all duration-300 hover:scale-125"
                  title="Email us"
                >
                  ✉️
                </a>
                <a
                  href={`tel:${CONTACT_PHONE}`}
                  className="text-lg hover:text-accent transition-all duration-300 hover:scale-125"
                  title="Call us"
                >
                  📞
                </a>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg hover:text-accent transition-all duration-300 hover:scale-125"
                  title="Follow us on Facebook"
                >
                  f
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Web Development
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    App Development
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    IT Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-accent transition-colors">
                    {CONTACT_EMAIL}
                  </a>
                </li>
                <li>
                  <a href={`tel:${CONTACT_PHONE}`} className="hover:text-accent transition-colors">
                    {CONTACT_PHONE}
                  </a>
                </li>
                <li>
                  <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-foreground/60">
            <p>&copy; 2026 INF Corp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
