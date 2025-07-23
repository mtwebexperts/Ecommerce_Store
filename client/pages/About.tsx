import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Code,
  Palette,
  Search,
  Zap,
  Award,
  Users,
  Clock,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSkillsVisible(true);
        }
      },
      { threshold: 0.5 },
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      observer.disconnect();
    };
  }, []);

  const skills = [
    {
      name: "WordPress Development",
      level: 95,
      icon: Code,
      color: "from-blue-500 to-purple-600",
    },
    {
      name: "Elementor Pro",
      level: 90,
      icon: Palette,
      color: "from-purple-500 to-pink-600",
    },
    {
      name: "SEO Optimization",
      level: 85,
      icon: Search,
      color: "from-green-500 to-blue-600",
    },
    {
      name: "JavaScript",
      level: 80,
      icon: Code,
      color: "from-yellow-500 to-orange-600",
    },
    {
      name: "Speed Optimization",
      level: 88,
      icon: Zap,
      color: "from-red-500 to-yellow-600",
    },
    {
      name: "UI/UX Design",
      level: 75,
      icon: Palette,
      color: "from-indigo-500 to-purple-600",
    },
  ];

  const stats = [
    {
      icon: Award,
      label: "Years Experience",
      value: "3+",
      color: "text-blue-400",
    },
    {
      icon: Users,
      label: "Happy Clients",
      value: "50+",
      color: "text-green-400",
    },
    {
      icon: Code,
      label: "Projects Completed",
      value: "100+",
      color: "text-purple-400",
    },
    {
      icon: Clock,
      label: "Hours Worked",
      value: "2000+",
      color: "text-orange-400",
    },
  ];

  const quotes = [
    {
      text: "Tanzeel delivered an exceptional WordPress site that exceeded our expectations. Fast, professional, and highly recommended!",
      author: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechStart Inc.",
    },
    {
      text: "Outstanding work on our e-commerce platform. The site loads incredibly fast and our sales have increased by 40%.",
      author: "Michael Chen",
      role: "CEO",
      company: "Fashion Hub",
    },
    {
      text: "Best WordPress developer we've worked with. Attention to detail and SEO optimization is top-notch.",
      author: "Emily Rodriguez",
      role: "Digital Marketing Manager",
      company: "Growth Agency",
    },
  ];

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div
              className={`relative transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
                <div className="relative aspect-square max-w-md mx-auto">
                  <div className="w-full h-full bg-gradient-to-br from-primary to-accent p-1 rounded-3xl float">
                    <div className="w-full h-full bg-background rounded-3xl flex items-center justify-center text-8xl">
                      👨‍💻
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6">
                About <span className="gradient-text">Me</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                I'm a passionate WordPress developer and web designer with over
                3 years of experience creating high-performance, SEO-friendly
                websites that drive real business results.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                My journey started with a love for clean code and beautiful
                design. Today, I specialize in crafting custom WordPress
                solutions that not only look amazing but also load fast and rank
                well in search engines.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="glass rounded-2xl p-4 card-hover"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`h-6 w-6 ${stat.color}`} />
                        <div>
                          <div className="text-2xl font-bold text-foreground">
                            {stat.value}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {stat.label}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button size="lg" className="btn-glow">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="py-20 bg-section-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Skills & <span className="gradient-text">Expertise</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Technologies and tools I use to bring your vision to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <Card
                  key={skill.name}
                  className="glass border-border/50 card-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {skill.name}
                        </h3>
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="progress-bar h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="progress-fill h-full transition-all duration-2000 ease-out"
                        style={{
                          width: skillsVisible ? `${skill.level}%` : "0%",
                          transitionDelay: `${index * 0.2}s`,
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 animated-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              My <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              The path that led me to becoming a WordPress expert
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                year: "2024",
                title: "Senior WordPress Developer",
                description:
                  "Specialized in high-performance WordPress solutions and enterprise-level projects",
                highlight: true,
              },
              {
                year: "2023",
                title: "Freelance Web Developer",
                description:
                  "Expanded into full-stack development and advanced SEO optimization",
                highlight: false,
              },
              {
                year: "2022",
                title: "WordPress Developer",
                description:
                  "Started professional WordPress development with focus on custom themes",
                highlight: false,
              },
              {
                year: "2021",
                title: "Web Design Student",
                description:
                  "Learned the fundamentals of web design and development",
                highlight: false,
              },
            ].map((item, index) => (
              <div
                key={item.year}
                className={`flex items-center space-x-6 slide-in-left`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div
                  className={`flex-shrink-0 w-20 h-20 rounded-full flex items-center justify-center ${
                    item.highlight
                      ? "bg-gradient-to-r from-primary to-accent"
                      : "bg-muted"
                  }`}
                >
                  <span
                    className={`text-lg font-bold ${item.highlight ? "text-white" : "text-foreground"}`}
                  >
                    {item.year}
                  </span>
                </div>
                <Card className="flex-1 glass border-border/50">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-section-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Client <span className="gradient-text">Testimonials</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              What my clients say about working with me
            </p>
          </div>

          <div className="relative">
            <Card className="glass border-border/50 overflow-hidden">
              <CardContent className="p-8 text-center">
                <Quote className="h-12 w-12 text-primary mx-auto mb-6" />
                <blockquote className="text-xl text-foreground mb-6 leading-relaxed italic">
                  "{quotes[currentQuote].text}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold">
                    {quotes[currentQuote].author.charAt(0)}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-foreground">
                      {quotes[currentQuote].author}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {quotes[currentQuote].role} at{" "}
                      {quotes[currentQuote].company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-center items-center space-x-4 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={prevQuote}
                className="glass"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex space-x-2">
                {quotes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuote(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentQuote ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={nextQuote}
                className="glass"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 animated-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create something amazing that drives
            real results for your business.
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
