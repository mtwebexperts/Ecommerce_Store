import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Search,
  ExternalLink,
  Github,
  Star,
  Calendar,
  Tag,
  Eye,
  Filter,
  X,
} from "lucide-react";

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  const categories = [
    "All",
    "WordPress",
    "E-Commerce",
    "Landing Pages",
    "SEO Projects",
    "Speed Optimization",
  ];

  const projects = [
    {
      id: 1,
      title: "TechStart E-Commerce Store",
      description:
        "Complete WooCommerce solution with custom payment integration, inventory management, and mobile-first design.",
      longDescription:
        "Built a comprehensive e-commerce platform for TechStart using WooCommerce with custom PHP development. Features include advanced filtering, multiple payment gateways, automated inventory management, and a responsive design optimized for mobile conversions. Achieved 40% increase in sales within 3 months of launch.",
      image: "/placeholder.svg",
      category: "E-Commerce",
      technologies: [
        "WordPress",
        "WooCommerce",
        "Custom PHP",
        "Stripe API",
        "PayPal",
      ],
      features: [
        "Custom Product Filters",
        "Mobile-First Design",
        "Payment Gateway Integration",
        "Inventory Management",
        "SEO Optimization",
        "Performance Optimization",
      ],
      metrics: {
        loadTime: "1.2s",
        mobileScore: "98/100",
        conversionRate: "+40%",
        seoScore: "95/100",
      },
      year: "2024",
      client: "TechStart Inc.",
      duration: "6 weeks",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true,
    },
    {
      id: 2,
      title: "RestaurantHub Online Ordering",
      description:
        "WordPress website with online ordering system, table reservations, and integrated payment processing.",
      longDescription:
        "Developed a comprehensive restaurant website with custom online ordering functionality, table reservation system, and integrated payment processing. Built with WordPress and custom plugins to handle complex restaurant operations including menu management, order tracking, and customer notifications.",
      image: "/placeholder.svg",
      category: "WordPress",
      technologies: [
        "WordPress",
        "Custom Plugins",
        "JavaScript",
        "MySQL",
        "Stripe",
      ],
      features: [
        "Online Ordering System",
        "Table Reservations",
        "Menu Management",
        "Order Tracking",
        "Customer Notifications",
        "Payment Integration",
      ],
      metrics: {
        loadTime: "0.9s",
        mobileScore: "96/100",
        conversionRate: "+35%",
        seoScore: "92/100",
      },
      year: "2024",
      client: "RestaurantHub",
      duration: "4 weeks",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true,
    },
    {
      id: 3,
      title: "Local Law Firm SEO Overhaul",
      description:
        "Complete SEO optimization project that increased local search visibility by 250% for a law firm.",
      longDescription:
        "Comprehensive SEO optimization for a local law firm including technical SEO, local SEO, content optimization, and Google Business Profile optimization. Implemented schema markup, improved site speed, and created a content strategy that resulted in 250% increase in local search visibility.",
      image: "/placeholder.svg",
      category: "SEO Projects",
      technologies: ["SEO", "Google Analytics", "Schema Markup", "WordPress"],
      features: [
        "Technical SEO Audit",
        "Local SEO Optimization",
        "Content Strategy",
        "Schema Markup",
        "Google Business Profile",
        "Performance Tracking",
      ],
      metrics: {
        loadTime: "1.1s",
        mobileScore: "97/100",
        organicTraffic: "+250%",
        seoScore: "98/100",
      },
      year: "2023",
      client: "Johnson & Associates",
      duration: "8 weeks",
      liveUrl: "https://example.com",
      githubUrl: "",
      featured: false,
    },
    {
      id: 4,
      title: "SaaS Product Landing Page",
      description:
        "High-converting Elementor landing page with A/B testing and conversion optimization.",
      longDescription:
        "Designed and developed a high-converting landing page for a SaaS product using Elementor Pro. Implemented A/B testing, conversion tracking, and lead capture optimization. The page achieved a 15% conversion rate and generated over $100k in revenue within the first quarter.",
      image: "/placeholder.svg",
      category: "Landing Pages",
      technologies: [
        "Elementor Pro",
        "WordPress",
        "Google Analytics",
        "Hotjar",
      ],
      features: [
        "Conversion Optimization",
        "A/B Testing Setup",
        "Lead Capture Forms",
        "Analytics Integration",
        "Mobile Optimization",
        "Performance Tracking",
      ],
      metrics: {
        loadTime: "0.8s",
        mobileScore: "99/100",
        conversionRate: "15%",
        seoScore: "94/100",
      },
      year: "2023",
      client: "CloudFlow SaaS",
      duration: "2 weeks",
      liveUrl: "https://example.com",
      githubUrl: "",
      featured: true,
    },
    {
      id: 5,
      title: "E-Learning Platform Speed Boost",
      description:
        "Performance optimization project that reduced loading time by 70% for an online learning platform.",
      longDescription:
        "Comprehensive speed optimization for an e-learning platform serving thousands of students. Implemented advanced caching, image optimization, database optimization, and CDN setup. Reduced loading time from 4.2s to 1.2s, resulting in improved user experience and higher completion rates.",
      image: "/placeholder.svg",
      category: "Speed Optimization",
      technologies: ["WordPress", "CDN", "Caching", "Image Optimization"],
      features: [
        "Advanced Caching",
        "Image Optimization",
        "Database Cleanup",
        "CDN Implementation",
        "Code Minification",
        "Performance Monitoring",
      ],
      metrics: {
        loadTime: "1.2s",
        speedImprovement: "70%",
        mobileScore: "95/100",
        seoScore: "96/100",
      },
      year: "2023",
      client: "EduLearn Online",
      duration: "1 week",
      liveUrl: "https://example.com",
      githubUrl: "",
      featured: false,
    },
    {
      id: 6,
      title: "Fashion Brand E-Commerce",
      description:
        "Luxury fashion e-commerce store with custom design and advanced product filtering.",
      longDescription:
        "Created a luxury fashion e-commerce store with custom WooCommerce design, advanced product filtering, wishlist functionality, and size guide integration. Features a sophisticated design that reflects the brand's premium positioning and includes custom checkout flow optimization.",
      image: "/placeholder.svg",
      category: "E-Commerce",
      technologies: [
        "WordPress",
        "WooCommerce",
        "Custom CSS",
        "JavaScript",
        "Stripe",
      ],
      features: [
        "Custom Design",
        "Advanced Filtering",
        "Wishlist Functionality",
        "Size Guide Integration",
        "Checkout Optimization",
        "Inventory Management",
      ],
      metrics: {
        loadTime: "1.4s",
        mobileScore: "94/100",
        conversionRate: "+28%",
        seoScore: "93/100",
      },
      year: "2024",
      client: "LuxeFashion Co.",
      duration: "5 weeks",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: false,
    },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const ProjectModal = ({ project }: { project: any }) => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            {project.title}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedProject(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-6">
          <div className="aspect-video bg-muted rounded-lg mb-6 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {project.longDescription}
              </p>
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-3">
                  Key Features:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.features.map((feature: string) => (
                    <div key={feature} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-3">
                  Technologies Used:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <Card className="glass">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-3">
                    Project Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Client:</span>
                      <span className="text-foreground">{project.client}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Year:</span>
                      <span className="text-foreground">{project.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="text-foreground">
                        {project.duration}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="glass">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-3">
                    Performance Metrics
                  </h3>
                  <div className="space-y-2 text-sm">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}:
                        </span>
                        <span className="text-foreground font-medium">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <div className="flex gap-3">
                {project.liveUrl && (
                  <Button size="sm" className="flex-1" asChild>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Site
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    asChild
                  >
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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
              My <span className="gradient-text">Portfolio</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A showcase of WordPress websites, e-commerce stores, and digital
              solutions I've built for clients across various industries.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 bg-section-bg border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass border-border/50"
              />
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <Filter className="h-4 w-4 text-muted-foreground mr-2" />
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category ? "btn-glow" : "glass"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-section-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                No projects found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <Card
                  key={project.id}
                  className="glass border-border/50 overflow-hidden card-hover group cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedProject(project.id)}
                >
                  <div className="aspect-video bg-muted/20 relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {project.featured && (
                        <Badge className="bg-primary/90 text-primary-foreground">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      <Badge variant="secondary" className="bg-background/90">
                        {project.category}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button variant="outline" className="glass">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4" />
                      {project.year}
                      <span>•</span>
                      <Tag className="w-4 h-4" />
                      {project.client}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-3">
                      {project.liveUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.liveUrl, "_blank");
                          }}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.githubUrl, "_blank");
                          }}
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 animated-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's work together to create a WordPress website that stands out
            and drives results for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-glow pulse-glow" asChild>
              <Link to="/contact">
                Start Your Project
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="btn-glow glass"
              asChild
            >
              <Link to="/services">
                View Services
                <Star className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={projects.find((p) => p.id === selectedProject)}
        />
      )}
    </div>
  );
}
