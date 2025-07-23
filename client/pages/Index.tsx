import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { sampleProducts, categories as categoryData } from "@/data/sampleProducts";
import {
  Search,
  ShoppingCart,
  Heart,
  Star,
  Clock,
  Truck,
  Shield,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  Eye,
  Zap,
  Gift,
  Crown,
  TrendingUp,
  Users,
  Play,
} from "lucide-react";

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 34,
    seconds: 56,
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Banner slider auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Flash sale countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const bannerSlides = [
    {
      id: 1,
      title: "Electronics Mega Sale 70% OFF",
      subtitle: "Latest Gadgets & Tech",
      image: "https://images.pexels.com/photos/6858618/pexels-photo-6858618.jpeg",
      cta: "Shop Electronics",
      bgColor: "from-blue-600 to-purple-600",
    },
    {
      id: 2,
      title: "Fashion Week Sale",
      subtitle: "Up to 50% OFF on Premium Brands",
      image: "https://images.pexels.com/photos/13726717/pexels-photo-13726717.jpeg",
      cta: "Explore Fashion",
      bgColor: "from-pink-500 to-red-500",
    },
    {
      id: 3,
      title: "Home & Living Collection",
      subtitle: "Transform Your Space",
      image: "https://images.pexels.com/photos/11112743/pexels-photo-11112743.jpeg",
      cta: "Shop Home Decor",
      bgColor: "from-green-500 to-teal-500",
    },
    {
      id: 4,
      title: "Audio Equipment Sale",
      subtitle: "Premium Sound Experience",
      image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
      cta: "Shop Audio",
      bgColor: "from-orange-500 to-yellow-500",
    },
  ];

  const categories = [
    {
      name: "Electronics",
      image: "https://images.pexels.com/photos/6858618/pexels-photo-6858618.jpeg",
      color: "bg-blue-100",
      productCount: "1,250+ items"
    },
    {
      name: "Fashion",
      image: "https://images.pexels.com/photos/13726717/pexels-photo-13726717.jpeg",
      color: "bg-pink-100",
      productCount: "2,340+ items"
    },
    {
      name: "Home & Living",
      image: "https://images.pexels.com/photos/11112743/pexels-photo-11112743.jpeg",
      color: "bg-green-100",
      productCount: "890+ items"
    },
    {
      name: "Sports",
      image: "https://images.pexels.com/photos/163497/pylon-flight-girl-model-163497.jpeg",
      color: "bg-orange-100",
      productCount: "567+ items"
    },
    {
      name: "Beauty",
      image: "https://images.pexels.com/photos/3750640/pexels-photo-3750640.jpeg",
      color: "bg-purple-100",
      productCount: "678+ items"
    },
    {
      name: "Books",
      image: "https://images.pexels.com/photos/207732/pexels-photo-207732.jpeg",
      color: "bg-yellow-100",
      productCount: "234+ items"
    },
    {
      name: "Audio",
      image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
      color: "bg-indigo-100",
      productCount: "345+ items"
    },
    {
      name: "Gaming",
      image: "/placeholder.svg",
      color: "bg-red-100",
      productCount: "456+ items"
    },
  ];

  // Get featured products for flash sale
  const flashSaleProducts = sampleProducts
    .filter(product => product.featured && product.originalPrice > product.price)
    .slice(0, 6)
    .map(product => ({
      id: product.id,
      name: product.name,
      originalPrice: product.originalPrice,
      salePrice: product.price,
      image: product.images[0],
      discount: Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100),
      sold: product.sold,
      stock: product.stock,
      rating: product.rating,
      seller: product.seller,
    }));

  // Get trending products
  const trendingProducts = sampleProducts
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 8);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner Carousel */}
      <section className="relative overflow-hidden">
        <div className="relative h-64 md:h-80 lg:h-96">
          {bannerSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                index === currentSlide ? "translate-x-0" :
                index < currentSlide ? "-translate-x-full" : "translate-x-full"
              }`}
            >
              <div className={`h-full bg-gradient-to-r ${slide.bgColor} flex items-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="text-white space-y-4 slide-in-left">
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight bounce-in">
                        {slide.title}
                      </h1>
                      <p className="text-lg md:text-xl opacity-90 slide-in-left" style={{ animationDelay: '0.2s' }}>
                        {slide.subtitle}
                      </p>
                      <Button size="lg" className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 hover:shadow-lg bounce-in" style={{ animationDelay: '0.4s' }}>
                        {slide.cta}
                      </Button>
                    </div>
                    <div className="hidden lg:block">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-64 object-cover rounded-lg shadow-2xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="outline"
          size="sm"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white z-20"
          onClick={prevSlide}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white z-20"
          onClick={nextSlide}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-section-bg">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/category/${category.name.toLowerCase()}`}
                className="category-card group"
              >
                <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-125 transition-all duration-500 group-hover:rotate-3"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                </div>
                <h3 className="font-medium text-sm text-center transition-all duration-300 group-hover:text-primary group-hover:scale-105">{category.name}</h3>
                <p className="text-xs text-muted-foreground text-center mt-1 transition-all duration-300 group-hover:text-primary/70">
                  {category.productCount}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sale Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-red-500" />
                <h2 className="text-2xl md:text-3xl font-bold">Flash Sale</h2>
              </div>
              <div className="flash-sale px-4 py-2 rounded-lg text-white">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Ends in:</span>
                  <div className="countdown-timer">
                    {String(timeLeft.hours).padStart(2, "0")}:
                    {String(timeLeft.minutes).padStart(2, "0")}:
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </div>
                </div>
              </div>
            </div>
            <Link to="/products">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {flashSaleProducts.map((product) => (
              <Card key={product.id} className="card-product group shimmer-effect">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Badge className="absolute top-2 left-2 sale-badge transition-all duration-300 group-hover:scale-110 glow-effect">
                    {product.discount}% OFF
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2 btn-wishlist opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                  >
                    <Heart className="w-4 h-4 transition-all duration-300 hover:text-red-500" />
                  </Button>
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs">{product.rating}</span>
                  </div>
                  <div className="mb-2">
                    <span className="price-discount text-sm">
                      {formatPrice(product.salePrice)}
                    </span>
                    <span className="price-original text-xs ml-1">
                      {formatPrice(product.originalPrice)}
                    </span>
                  </div>
                  <div className="text-xs text-green-600 mb-2">
                    {product.sold} sold
                  </div>
                  <Button size="sm" className="w-full btn-cart">
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-12 bg-section-bg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">Trending Now</h2>
            </div>
            <Link to="/products">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <Card key={product.id} className="card-product group">
                <div className="relative">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {product.featured && (
                    <Badge className="absolute top-2 left-2 bg-yellow-500">
                      Featured
                    </Badge>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2 btn-wishlist opacity-0 group-hover:opacity-100"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="rating-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="mb-2">
                    <div className="flex items-center gap-2">
                      <span className="price-discount">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="price-original text-sm">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {product.seller}
                  </p>
                  <p className="text-xs text-green-600 mb-3">
                    {product.sold}+ sold
                  </p>
                  <Button size="sm" className="w-full btn-cart">
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">
                Free shipping on orders over Rs. 2,000
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Secure Payments</h3>
              <p className="text-sm text-muted-foreground">
                100% secure payment processing
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Easy Returns</h3>
              <p className="text-sm text-muted-foreground">
                7-day hassle-free returns
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">
                Round-the-clock customer support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Store Info Section */}
      <section className="py-12 bg-section-bg">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Welcome to Tanzeel's Store</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
            Your one-stop destination for premium electronics, fashion, home decor, and more.
            We bring you quality products at unbeatable prices with exceptional customer service.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-yellow-500" />
              <span>Premium Quality Products</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Trusted by 10,000+ Customers</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-500" />
              <span>Fast & Reliable Delivery</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
