import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  Code,
  Search,
  Zap,
  Palette,
  Shield,
  Settings,
  Smartphone,
  Database,
  CheckCircle,
  Star,
  Clock,
  DollarSign,
  Users,
  TrendingUp,
} from "lucide-react";

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [expandedService, setExpandedService] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  const services = [
    {
      icon: Code,
      title: "Custom WordPress Website",
      price: "From $1,500",
      duration: "2-4 weeks",
      description:
        "Hand-coded WordPress themes built from scratch for optimal performance and unique design.",
      features: [
        "Custom theme development",
        "Responsive design",
        "Cross-browser compatibility",
        "Clean, semantic code",
        "Performance optimization",
        "SEO-ready structure",
      ],
      technologies: ["WordPress", "PHP", "JavaScript", "CSS3", "HTML5"],
      color: "from-blue-500 to-purple-600",
      popular: false,
    },
    {
      icon: Search,
      title: "Local SEO Optimization",
      price: "From $800",
      duration: "1-2 weeks",
      description:
        "Boost your local search rankings and attract more customers from your area.",
      features: [
        "Google Business Profile optimization",
        "Local keyword research",
        "Citation building",
        "Review management setup",
        "Local schema markup",
        "Monthly performance reports",
      ],
      technologies: ["SEO", "Google Analytics", "Search Console", "Schema"],
      color: "from-green-500 to-blue-600",
      popular: true,
    },
    {
      icon: Zap,
      title: "Website Speed Optimization",
      price: "From $600",
      duration: "3-5 days",
      description:
        "Lightning-fast loading times that improve user experience and search rankings.",
      features: [
        "Image optimization",
        "Caching implementation",
        "Code minification",
        "Database optimization",
        "CDN setup",
        "Core Web Vitals improvement",
      ],
      technologies: ["CDN", "Caching", "Image Optimization", "Core Web Vitals"],
      color: "from-yellow-500 to-orange-600",
      popular: false,
    },
    {
      icon: Palette,
      title: "Elementor Landing Pages",
      price: "From $400",
      duration: "1-2 weeks",
      description:
        "High-converting landing pages designed to turn visitors into customers.",
      features: [
        "Custom Elementor design",
        "Conversion optimization",
        "A/B testing setup",
        "Lead capture forms",
        "Mobile responsiveness",
        "Analytics integration",
      ],
      technologies: ["Elementor Pro", "WordPress", "Conversion Tracking"],
      color: "from-pink-500 to-purple-600",
      popular: false,
    },
    {
      icon: Shield,
      title: "WordPress Security",
      price: "From $300",
      duration: "2-3 days",
      description:
        "Comprehensive security hardening to protect your website from threats.",
      features: [
        "Security plugin setup",
        "Malware scanning",
        "Firewall configuration",
        "Login security",
        "Regular backups",
        "Security monitoring",
      ],
      technologies: ["Security Plugins", "Firewall", "Malware Protection"],
      color: "from-red-500 to-pink-600",
      popular: false,
    },
    {
      icon: Settings,
      title: "Website Maintenance",
      price: "From $200/month",
      duration: "Ongoing",
      description:
        "Keep your website updated, secure, and running smoothly with monthly maintenance.",
      features: [
        "WordPress core updates",
        "Plugin updates",
        "Security monitoring",
        "Performance optimization",
        "Content updates",
        "Monthly reports",
      ],
      technologies: ["WordPress", "Security", "Performance", "Updates"],
      color: "from-indigo-500 to-blue-600",
      popular: true,
    },
  ];

  const processSteps = [
    {
      step: "1",
      title: "Discovery Call",
      description: "We discuss your project requirements, goals, and timeline.",
      icon: Users,
    },
    {
      step: "2",
      title: "Proposal & Planning",
      description:
        "I create a detailed proposal with project scope and timeline.",
      icon: Settings,
    },
    {
      step: "3",
      title: "Development",
      description:
        "I build your website with regular updates and feedback sessions.",
      icon: Code,
    },
    {
      step: "4",
      title: "Launch & Support",
      description:
        "Website goes live with ongoing support and maintenance options.",
      icon: TrendingUp,
    },
  ];

  const stats = [
    {
      icon: Clock,
      label: "Average Project Time",
      value: "2-4 weeks",
      color: "text-blue-400",
    },
    {
      icon: DollarSign,
      label: "Starting Price",
      value: "$400",
      color: "text-green-400",
    },
    {
      icon: Star,
      label: "Client Satisfaction",
      value: "100%",
      color: "text-yellow-400",
    },
    {
      icon: Users,
      label: "Happy Clients",
      value: "50+",
      color: "text-purple-400",
    },
  ];

  return (
    <div className="min-h-screen pt-16 custom-cursor">
      {/* Custom Cursor */}
      <div
        className="cursor-dot"
        style={{
          transform: `translate(${mousePosition.x - 4}px, ${mousePosition.y - 4}px)`,
        }}
      />
      <div
        className="cursor-outline"
        style={{
          transform: `translate(${mousePosition.x - 20}px, ${mousePosition.y - 20}px)`,
        }}
      />

      {/* Hero Section */}
      <section className="py-20 bg-hero-bg animated-bg overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div
            className={`text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6">
              My <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Professional WordPress development services designed to help your
              business succeed online with fast, secure, and SEO-optimized
              websites.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="glass rounded-2xl p-6 card-hover"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Icon className={`h-8 w-8 ${stat.color} mx-auto mb-2`} />
                    <div className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-section-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              WordPress <span className="gradient-text">Solutions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive services to build, optimize, and maintain your
              WordPress website
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isExpanded = expandedService === index;

              return (
                <Card
                  key={service.title}
                  className={`glass border-border/50 overflow-hidden transition-all duration-500 ${
                    isExpanded
                      ? "scale-105 shadow-2xl"
                      : "card-hover hover:scale-105"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      {service.popular && (
                        <Badge className="bg-primary/90 text-primary-foreground">
                          <Star className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {service.title}
                    </h3>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold gradient-text">
                        {service.price}
                      </span>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {service.duration}
                      </span>
                    </div>

                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div
                      className={`transition-all duration-500 overflow-hidden ${
                        isExpanded
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-3">
                          What's Included:
                        </h4>
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-center text-sm text-muted-foreground"
                            >
                              <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-3">
                          Technologies:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {service.technologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setExpandedService(isExpanded ? null : index)
                        }
                        className="flex-1"
                      >
                        {isExpanded ? "Show Less" : "Learn More"}
                      </Button>
                      <Button size="sm" className="flex-1 btn-glow" asChild>
                        <Link to="/contact">
                          Get Started
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 animated-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              How I <span className="gradient-text">Work</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A streamlined process to deliver your project on time and within
              budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="text-center slide-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-background border-2 border-primary rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">
                        {step.step}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-section-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss your requirements and create a WordPress website that
            drives real results for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-glow pulse-glow" asChild>
              <Link to="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="btn-glow glass"
              asChild
            >
              <Link to="/portfolio">
                View My Work
                <Star className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
