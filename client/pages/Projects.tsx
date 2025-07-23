import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Github,
  ExternalLink,
  Search,
  Filter,
  Star,
  Calendar,
  User,
} from "lucide-react";

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Web Apps", "Mobile", "UI/UX", "Open Source"];

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A comprehensive e-commerce solution built with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, inventory management, and admin dashboard.",
      longDescription:
        "This full-stack e-commerce platform was built to handle high-traffic retail operations. It includes advanced features like real-time inventory tracking, automated email notifications, analytics dashboard, and multi-vendor support.",
      image: "/placeholder.svg",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Redis"],
      category: "Web Apps",
      github: "https://github.com",
      live: "https://example.com",
      featured: true,
      date: "2024",
      status: "Live",
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "A collaborative task management tool with real-time updates, team collaboration features, and advanced project tracking capabilities.",
      longDescription:
        "Built for modern teams, this app features real-time collaboration, drag-and-drop kanban boards, time tracking, file attachments, and detailed analytics. Supports multiple project views and integrates with popular tools.",
      image: "/placeholder.svg",
      technologies: ["React", "Socket.io", "MongoDB", "Express", "JWT"],
      category: "Web Apps",
      github: "https://github.com",
      live: "https://example.com",
      featured: true,
      date: "2024",
      status: "Live",
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description:
        "A beautiful, responsive weather application with location-based forecasts, interactive maps, and detailed weather analytics.",
      longDescription:
        "This weather dashboard provides comprehensive weather information with beautiful visualizations. Features include 7-day forecasts, weather maps, severe weather alerts, and historical weather data.",
      image: "/placeholder.svg",
      technologies: ["React", "TypeScript", "Weather API", "Tailwind CSS"],
      category: "Web Apps",
      github: "https://github.com",
      live: "https://example.com",
      featured: false,
      date: "2023",
      status: "Live",
    },
    {
      id: 4,
      title: "React Native Fitness App",
      description:
        "A cross-platform mobile fitness application with workout tracking, progress monitoring, and social features.",
      longDescription:
        "This fitness app helps users track workouts, monitor progress, and stay motivated with social features. Includes custom workout plans, progress photos, achievement system, and community challenges.",
      image: "/placeholder.svg",
      technologies: ["React Native", "Firebase", "Redux", "Expo"],
      category: "Mobile",
      github: "https://github.com",
      live: "https://apps.apple.com",
      featured: true,
      date: "2023",
      status: "Live",
    },
    {
      id: 5,
      title: "Design System Library",
      description:
        "A comprehensive design system and component library for consistent UI development across multiple projects.",
      longDescription:
        "This design system provides a complete set of reusable components, design tokens, and guidelines for building consistent user interfaces. Includes documentation, examples, and development tools.",
      image: "/placeholder.svg",
      technologies: ["React", "Storybook", "TypeScript", "Figma"],
      category: "UI/UX",
      github: "https://github.com",
      live: "https://storybook.com",
      featured: false,
      date: "2023",
      status: "Ongoing",
    },
    {
      id: 6,
      title: "Open Source CLI Tool",
      description:
        "A command-line tool for developers to automate common development tasks and improve workflow efficiency.",
      longDescription:
        "This CLI tool helps developers automate repetitive tasks, generate boilerplate code, and manage project configurations. Built with extensibility in mind and actively maintained by the community.",
      image: "/placeholder.svg",
      technologies: ["Node.js", "TypeScript", "Commander.js", "Inquirer"],
      category: "Open Source",
      github: "https://github.com",
      live: "https://npmjs.com",
      featured: false,
      date: "2023",
      status: "Active",
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

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-16 bg-hero-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              My Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A collection of web applications, mobile apps, and open source
              projects I've built
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-section-bg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 bg-section-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No projects found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className="group hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col"
                >
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {project.featured && (
                        <Badge className="bg-primary/90 text-primary-foreground">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      <Badge variant="secondary" className="bg-background/90">
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4" />
                      {project.date}
                      <span>•</span>
                      <span>{project.category}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">
                      {project.longDescription}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 4}
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-3 mt-auto">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                      <Button size="sm" className="flex-1">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Interested in Working Together?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities and interesting
            projects. Let's create something amazing together.
          </p>
          <Button size="lg">
            <User className="mr-2 h-4 w-4" />
            Get In Touch
          </Button>
        </div>
      </section>
    </div>
  );
}
