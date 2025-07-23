import { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { sampleProducts } from "@/data/sampleProducts";
import {
  Search,
  Filter,
  Star,
  Heart,
  ShoppingCart,
  SlidersHorizontal,
  X,
  TrendingUp,
  Clock,
  DollarSign,
} from "lucide-react";

export default function Products() {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState(sampleProducts);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState([0, 300000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  const searchQuery = searchParams.get("q") || "";

  const brands = ["Apple", "Samsung", "Sony", "Dell", "Nintendo", "Google", "HP", "Bose", "JBL", "Marshall", "Tanzeel's Brand", "Tanzeel's Furniture", "Tanzeel's Gaming"];
  const sortOptions = [
    { value: "relevance", label: "Best Match" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Customer Rating" },
    { value: "newest", label: "Newest First" },
    { value: "bestselling", label: "Best Selling" },
  ];

  useEffect(() => {
    // Filter products based on category and search
    setLoading(true);
    setTimeout(() => {
      let filteredProducts = sampleProducts;

      // Filter by category
      if (category && category !== "all") {
        filteredProducts = filteredProducts.filter(product =>
          product.category.toLowerCase() === category.toLowerCase()
        );
      }

      // Filter by search query
      if (searchQuery) {
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }

      // Filter by brand
      if (selectedBrands.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
          selectedBrands.includes(product.brand)
        );
      }

      // Filter by price range
      filteredProducts = filteredProducts.filter(product =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
      );

      // Filter by rating
      if (selectedRatings.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
          selectedRatings.some(rating => product.rating >= rating)
        );
      }

      // Sort products
      switch (sortBy) {
        case "price-low":
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        case "bestselling":
          filteredProducts.sort((a, b) => b.sold - a.sold);
          break;
        default:
          // Keep original order for relevance
          break;
      }

      setProducts(filteredProducts);
      setLoading(false);
    }, 500);
  }, [category, searchQuery, selectedBrands, priceRange, selectedRatings, sortBy]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleBrandFilter = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    }
  };

  const handleRatingFilter = (rating: number, checked: boolean) => {
    if (checked) {
      setSelectedRatings([...selectedRatings, rating]);
    } else {
      setSelectedRatings(selectedRatings.filter((r) => r !== rating));
    }
  };

  const ProductCard = ({ product }: any) => (
    <Card className="card-product group h-full flex flex-col overflow-hidden">
      <div className="relative flex-shrink-0">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.originalPrice > product.price && (
          <Badge className="absolute top-2 left-2 sale-badge transition-all duration-300 group-hover:scale-110">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </Badge>
        )}
        {product.featured && (
          <Badge className="absolute top-2 right-2 bg-yellow-500 transition-all duration-300 group-hover:scale-110">Featured</Badge>
        )}
        <Button
          size="sm"
          variant="outline"
          className="absolute top-2 right-2 btn-wishlist opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-red-50 hover:text-red-500 hover:border-red-200"
          style={{ right: product.featured ? "90px" : "8px" }}
        >
          <Heart className="w-4 h-4 transition-all duration-300" />
        </Button>
        {product.freeShipping && (
          <Badge className="absolute bottom-2 left-2 badge-free-shipping transition-all duration-300 group-hover:scale-105">
            Free Shipping
          </Badge>
        )}
      </div>

      <CardContent className="p-4 flex flex-col flex-1 min-h-0">
        {/* Fixed height title section */}
        <div className="mb-2 h-10 flex items-start">
          <h3 className="font-medium text-sm line-clamp-2 hover:text-primary cursor-pointer transition-colors duration-300">
            {product.name}
          </h3>
        </div>

        {/* Rating section */}
        <div className="flex items-center gap-1 mb-2 h-4">
          <div className="rating-stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 transition-colors duration-300 ${
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

        {/* Price section */}
        <div className="mb-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="price-discount text-lg font-bold">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="price-original text-sm">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          {product.originalPrice > product.price && (
            <span className="savings text-green-600 text-sm font-medium">
              Save {formatPrice(product.originalPrice - product.price)}
            </span>
          )}
        </div>

        {/* Seller and sold info */}
        <div className="mb-3">
          <p className="text-xs text-muted-foreground mb-1 truncate">{product.seller}</p>
          <p className="text-xs text-green-600 font-medium">
            {product.sold}+ sold
          </p>
        </div>

        {/* Spacer that grows to push buttons to bottom */}
        <div className="flex-1 min-h-0"></div>

        {/* Buttons fixed at bottom */}
        <div className="flex gap-2 mt-auto pt-2">
          <Button
            size="sm"
            className="btn-cart flex-1 h-9 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Cart</span>
          </Button>
          <Button
            size="sm"
            className="btn-buy-now flex-1 h-9 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <span className="text-xs sm:text-sm">Buy Now</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const FilterSection = () => (
    <div className="w-64 space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="px-3">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={300000}
            step={1000}
            className="mb-3"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Brand</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) =>
                  handleBrandFilter(brand, checked as boolean)
                }
              />
              <label htmlFor={brand} className="text-sm">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Customer Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={selectedRatings.includes(rating)}
                onCheckedChange={(checked) =>
                  handleRatingFilter(rating, checked as boolean)
                }
              />
              <label htmlFor={`rating-${rating}`} className="text-sm flex items-center">
                <div className="rating-stars mr-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                & up
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Features</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="free-shipping" />
            <label htmlFor="free-shipping" className="text-sm">
              Free Shipping
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="featured" />
            <label htmlFor="featured" className="text-sm">
              Featured Products
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="on-sale" />
            <label htmlFor="on-sale" className="text-sm">
              On Sale
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const categoryName = category ? category.charAt(0).toUpperCase() + category.slice(1) : "All Products";

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="text-sm text-muted-foreground">
          <span>Home</span> / <span>{categoryName}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className="hidden lg:block">
            <FilterSection />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Sort Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold">{categoryName}</h1>
                <span className="text-muted-foreground">
                  ({products.length} items)
                </span>
              </div>

              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <Button
                  variant="outline"
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-select"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden mb-6 p-4 bg-card border border-border rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <FilterSection />
              </div>
            )}

            {/* Loading State */}
            {loading ? (
              <div className="product-grid">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="card-product">
                    <div className="skeleton h-48 mb-4" />
                    <div className="p-4 space-y-2">
                      <div className="skeleton h-4" />
                      <div className="skeleton h-4 w-3/4" />
                      <div className="skeleton h-6 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* Products Grid */}
                {products.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 auto-rows-fr">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-semibold mb-2">No products found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or search terms
                    </p>
                    <Button variant="outline" onClick={() => {
                      setSelectedBrands([]);
                      setSelectedRatings([]);
                      setPriceRange([0, 300000]);
                    }}>
                      Clear Filters
                    </Button>
                  </div>
                )}

                {/* Load More */}
                {products.length > 0 && (
                  <div className="text-center mt-8">
                    <Button variant="outline" size="lg">
                      Load More Products
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
