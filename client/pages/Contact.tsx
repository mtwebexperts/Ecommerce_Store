import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ExternalLink,
  Github,
  Linkedin,
  Instagram,
  MessageCircle,
  CheckCircle,
} from "lucide-react";

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        budget: "",
        message: "",
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "tanzeeldev@gmail.com",
      href: "mailto:tanzeeldev@gmail.com",
      color: "text-blue-400",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
      color: "text-green-400",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "New York, USA",
      href: "#",
      color: "text-red-400",
    },
    {
      icon: Clock,
      label: "Response Time",
      value: "Within 24 hours",
      href: "#",
      color: "text-purple-400",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com",
      color: "hover:text-gray-400",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com",
      color: "hover:text-blue-400",
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://instagram.com",
      color: "hover:text-pink-400",
    },
    {
      icon: MessageCircle,
      label: "Upwork",
      href: "https://upwork.com",
      color: "hover:text-green-400",
    },
  ];

  const services = [
    "Custom WordPress Website",
    "E-commerce Development",
    "SEO Optimization",
    "Speed Optimization",
    "Elementor Landing Pages",
    "Website Maintenance",
    "WordPress Security",
    "Content Migration",
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
              Let's <span className="gradient-text">Connect</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to bring your WordPress project to life? Get in touch and
              let's discuss how I can help grow your business online.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-section-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div
              className={`transition-all duration-1000 delay-200 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <Card className="glass border-border/50">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-foreground mb-6">
                    Start Your Project
                  </h2>

                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-semibold text-foreground mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-muted-foreground">
                        Thank you for reaching out. I'll get back to you within
                        24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-foreground">
                            Your Name *
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="glass border-border/50 focus:border-primary"
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-foreground">
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="glass border-border/50 focus:border-primary"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="subject" className="text-foreground">
                            Subject *
                          </Label>
                          <Input
                            id="subject"
                            name="subject"
                            type="text"
                            required
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="glass border-border/50 focus:border-primary"
                            placeholder="WordPress Website Project"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="budget" className="text-foreground">
                            Project Budget
                          </Label>
                          <Input
                            id="budget"
                            name="budget"
                            type="text"
                            value={formData.budget}
                            onChange={handleInputChange}
                            className="glass border-border/50 focus:border-primary"
                            placeholder="$1000 - $5000"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-foreground">
                          Project Details *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          rows={6}
                          value={formData.message}
                          onChange={handleInputChange}
                          className="glass border-border/50 focus:border-primary resize-none"
                          placeholder="Tell me about your project requirements, timeline, and any specific features you need..."
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full btn-glow pulse-glow"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div
              className={`transition-all duration-1000 delay-400 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              {/* Contact Info Cards */}
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <Card
                      key={info.label}
                      className="glass border-border/50 card-hover"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <Icon className={`h-6 w-6 ${info.color}`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {info.label}
                            </h3>
                            {info.href !== "#" ? (
                              <a
                                href={info.href}
                                className="text-muted-foreground hover:text-primary transition-colors"
                              >
                                {info.value}
                              </a>
                            ) : (
                              <p className="text-muted-foreground">
                                {info.value}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Services List */}
              <Card className="glass border-border/50 mb-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Services I Offer
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {services.map((service, index) => (
                      <div
                        key={service}
                        className="flex items-center space-x-2 text-sm text-muted-foreground"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="glass border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Connect With Me
                  </h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <Button
                          key={social.label}
                          variant="outline"
                          size="lg"
                          className={`glass group ${social.color}`}
                          asChild
                        >
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                          >
                            <Icon className="h-5 w-5" />
                          </a>
                        </Button>
                      );
                    })}
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Follow me for web development tips, project updates, and
                    industry insights.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 animated-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Quick answers to common questions about my services
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How long does a typical WordPress project take?",
                answer:
                  "Most projects take 2-4 weeks depending on complexity. Simple websites can be completed in 1-2 weeks, while complex e-commerce or custom functionality projects may take 4-6 weeks.",
              },
              {
                question: "Do you provide ongoing maintenance and support?",
                answer:
                  "Yes! I offer monthly maintenance packages that include security updates, backups, performance optimization, and content updates to keep your website running smoothly.",
              },
              {
                question: "What's included in your SEO optimization service?",
                answer:
                  "My SEO service includes on-page optimization, technical SEO, speed optimization, mobile responsiveness, schema markup, and local SEO setup for better search rankings.",
              },
              {
                question: "Can you work with my existing design or branding?",
                answer:
                  "Absolutely! I can work with your existing brand guidelines, logos, and design preferences to create a website that perfectly matches your brand identity.",
              },
            ].map((faq, index) => (
              <Card
                key={index}
                className="glass border-border/50 card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-section-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Don't wait! Let's discuss your project today and start building your
            dream WordPress website.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-glow pulse-glow" asChild>
              <a href="mailto:tanzeeldev@gmail.com">
                <Mail className="mr-2 h-4 w-4" />
                Email Me Now
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="btn-glow glass"
              asChild
            >
              <Link to="/portfolio">
                <ExternalLink className="mr-2 h-4 w-4" />
                View My Work
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
