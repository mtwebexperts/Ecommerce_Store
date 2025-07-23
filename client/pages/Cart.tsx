import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Shield,
  Truck,
  Gift,
  Percent,
  Heart,
  Store,
} from "lucide-react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "iPhone 15 Pro Max 256GB",
      price: 189999,
      originalPrice: 209999,
      quantity: 1,
      image: "/placeholder.svg",
      seller: "TechStore Official",
      sellerId: 1,
      inStock: true,
      freeShipping: true,
      variant: "Space Black",
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      price: 159999,
      originalPrice: 179999,
      quantity: 2,
      image: "/placeholder.svg",
      seller: "Samsung Store",
      sellerId: 2,
      inStock: true,
      freeShipping: true,
      variant: "Titanium Gray",
    },
    {
      id: 3,
      name: "Sony WH-1000XM5 Headphones",
      price: 45999,
      originalPrice: 52999,
      quantity: 1,
      image: "/placeholder.svg",
      seller: "Sony Official",
      sellerId: 3,
      inStock: true,
      freeShipping: false,
      variant: "Black",
    },
  ]);

  const [selectedItems, setSelectedItems] = useState<number[]>([1, 2, 3]);
  const [promoCode, setPromoCode] = useState("");
  const [darazCoins, setDarazCoins] = useState(250);
  const [useDarazCoins, setUseDarazCoins] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter((item) => item.id !== id));
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item,
        ),
      );
    }
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
  };

  const toggleSelectItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const selectAllItems = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
  };

  const selectedCartItems = cartItems.filter((item) =>
    selectedItems.includes(item.id),
  );

  const subtotal = selectedCartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const originalTotal = selectedCartItems.reduce(
    (total, item) => total + item.originalPrice * item.quantity,
    0,
  );

  const savings = originalTotal - subtotal;
  const shippingFee = selectedCartItems.some((item) => !item.freeShipping)
    ? 200
    : 0;
  const coinsDiscount = useDarazCoins ? Math.min(darazCoins, subtotal * 0.1) : 0;
  const totalAmount = subtotal + shippingFee - coinsDiscount;

  // Group items by seller
  const itemsBySeller = cartItems.reduce((acc, item) => {
    if (!acc[item.sellerId]) {
      acc[item.sellerId] = {
        seller: item.seller,
        items: [],
      };
    }
    acc[item.sellerId].items.push(item);
    return acc;
  }, {} as any);

  const CartItemCard = ({ item }: any) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Checkbox
            checked={selectedItems.includes(item.id)}
            onCheckedChange={() => toggleSelectItem(item.id)}
          />
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="font-medium mb-1">{item.name}</h3>
            <p className="text-sm text-muted-foreground mb-1">
              Variant: {item.variant}
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Sold by: {item.seller}
            </p>
            <div className="flex items-center gap-2 mb-2">
              <span className="price-discount">{formatPrice(item.price)}</span>
              {item.originalPrice > item.price && (
                <span className="price-original">
                  {formatPrice(item.originalPrice)}
                </span>
              )}
              {item.freeShipping && (
                <Badge variant="secondary" className="text-xs">
                  Free Shipping
                </Badge>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="px-3 py-1 border rounded text-sm">
                  {item.quantity}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Start shopping to add items to your cart
          </p>
          <Button size="lg" asChild>
            <Link to="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {/* Select All */}
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedItems.length === cartItems.length}
                      onCheckedChange={selectAllItems}
                    />
                    <span className="font-medium">
                      Select All ({cartItems.length} items)
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setCartItems(
                        cartItems.filter(
                          (item) => !selectedItems.includes(item.id),
                        ),
                      )
                    }
                    disabled={selectedItems.length === 0}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Selected
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Items grouped by seller */}
            {Object.values(itemsBySeller).map((sellerGroup: any) => (
              <div key={sellerGroup.seller} className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Store className="w-4 h-4" />
                  <span className="font-medium">{sellerGroup.seller}</span>
                  <Badge variant="outline" className="text-xs">
                    Official Store
                  </Badge>
                </div>
                {sellerGroup.items.map((item: any) => (
                  <CartItemCard key={item.id} item={item} />
                ))}
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

                {/* Promo Code */}
                <div className="mb-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline">Apply</Button>
                  </div>
                </div>

                {/* Daraz Coins */}
                <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Gift className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium">Daraz Coins</span>
                    </div>
                    <span className="text-sm text-yellow-600">
                      {darazCoins} coins available
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={useDarazCoins}
                      onCheckedChange={setUseDarazCoins}
                    />
                    <span className="text-sm">
                      Use coins (Max {formatPrice(Math.min(darazCoins, subtotal * 0.1))})
                    </span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({selectedItems.length} items):</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Savings:</span>
                      <span>-{formatPrice(savings)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>Shipping Fee:</span>
                    <span>
                      {shippingFee === 0 ? "Free" : formatPrice(shippingFee)}
                    </span>
                  </div>
                  {useDarazCoins && coinsDiscount > 0 && (
                    <div className="flex justify-between text-sm text-yellow-600">
                      <span>Daraz Coins Discount:</span>
                      <span>-{formatPrice(coinsDiscount)}</span>
                    </div>
                  )}
                </div>

                <hr className="my-4" />

                <div className="flex justify-between text-lg font-semibold mb-4">
                  <span>Total:</span>
                  <span className="text-primary">{formatPrice(totalAmount)}</span>
                </div>

                <Button
                  size="lg"
                  className="w-full mb-3"
                  disabled={selectedItems.length === 0}
                  asChild
                >
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>

                <div className="text-center">
                  <Link
                    to="/"
                    className="text-sm text-primary hover:underline"
                  >
                    Continue Shopping
                  </Link>
                </div>

                {/* Security Badges */}
                <div className="mt-6 pt-4 border-t space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>Secure Checkout</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Truck className="w-4 h-4" />
                    <span>Free shipping on orders over Rs. 2000</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Percent className="w-4 h-4" />
                    <span>Easy returns within 7 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recently Viewed */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Recently Viewed</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="card-product">
                <img
                  src="/placeholder.svg"
                  alt="Product"
                  className="w-full h-32 object-cover"
                />
                <CardContent className="p-3">
                  <h4 className="text-sm font-medium mb-1">Product Name</h4>
                  <p className="text-primary font-semibold">Rs. 12,999</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
