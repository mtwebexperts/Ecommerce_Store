import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "./AuthContext";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  MapPin,
  Phone,
  Gift,
  LogOut,
  Settings,
  Package,
} from "lucide-react";

export function EcommerceNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useAuth();

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Living",
    "Sports",
    "Beauty",
    "Books",
    "Toys",
    "Automotive",
  ];

  return (
    <header className="bg-background/95 backdrop-blur-md border-b sticky top-0 z-40 transition-all duration-300 shadow-sm">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-sm py-1">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              +92 123 456 7890
            </span>
            <span>Free shipping on orders over Rs. 2000</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/sell" className="hover:underline">
              Become a Seller
            </Link>
            <Link to="/download" className="hover:underline">
              Download App
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg glow-effect">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-2xl font-bold text-primary transition-all duration-300 group-hover:scale-105">Tanzeel's Store</span>
          </Link>

          {/* Search */}
          <div className="search-bar hidden md:block">
            <div className="relative group">
              <Input
                placeholder="Search for products, brands and categories"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-12 transition-all duration-300 focus:shadow-lg focus:scale-[1.02] group-hover:shadow-md"
              />
              <Button size="sm" className="absolute right-1 top-1 bottom-1 px-3 transition-all duration-300 hover:scale-110 hover:glow-effect">
                <Search className="w-4 h-4 transition-all duration-300 hover:scale-110" />
              </Button>
            </div>
          </div>

          {/* User actions */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Mobile search */}
            <Button variant="ghost" className="md:hidden">
              <Search className="w-5 h-5" />
            </Button>

            <Button variant="ghost" className="relative group transition-all duration-300 hover:scale-110">
              <Heart className="w-5 h-5 transition-all duration-300 group-hover:text-red-500 group-hover:scale-110" />
              <span className="cart-badge transition-all duration-300 group-hover:scale-125 group-hover:glow-effect">2</span>
            </Button>
            <Button variant="ghost" className="relative group transition-all duration-300 hover:scale-110" asChild>
              <Link to="/cart">
                <ShoppingCart className="w-5 h-5 transition-all duration-300 group-hover:text-primary group-hover:scale-110" />
                <span className="cart-badge transition-all duration-300 group-hover:scale-125 group-hover:glow-effect">3</span>
              </Link>
            </Button>

            {/* Desktop auth */}
            <div className="hidden md:flex gap-2">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    {user.role === 'admin' && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="flex items-center">
                          <Settings className="mr-2 h-4 w-4" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center">
                        <Package className="mr-2 h-4 w-4" />
                        My Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="flex items-center">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link to="/register">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden mt-3">
          <div className="relative">
            <Input
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-12"
            />
            <Button size="sm" className="absolute right-1 top-1 bottom-1 px-3">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Categories bar */}
      <div className="bg-muted border-t hidden md:block">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center gap-6 overflow-x-auto">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase()}`}
                className="whitespace-nowrap nav-link"
              >
                <span className="text-sm">{category}</span>
              </Link>
            ))}
            <Link to="/live" className="flex items-center gap-1 text-red-500 font-medium">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              Tanzeel's Live
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="px-4 py-4 space-y-4">
            {/* Auth section */}
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      Dashboard
                    </Link>
                  </Button>
                  {user.role === 'admin' && (
                    <Button variant="outline" className="flex-1" asChild>
                      <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                        Admin
                      </Link>
                    </Button>
                  )}
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" asChild>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                </Button>
                <Button className="flex-1" asChild>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Categories */}
            <div className="space-y-2">
              <h3 className="font-medium text-muted-foreground">Categories</h3>
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/category/${category.toLowerCase()}`}
                  className="block py-2 nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category}
                </Link>
              ))}
            </div>

            {/* Additional links */}
            <div className="space-y-2 border-t pt-4">
              <Link
                to="/sell"
                className="block py-2 nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Become a Seller
              </Link>
              <Link
                to="/live"
                className="block py-2 text-red-500 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Tanzeel's Live
              </Link>
              <Link
                to="/download"
                className="block py-2 nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Download App
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
