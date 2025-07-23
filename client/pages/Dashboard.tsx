import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/AuthContext";
import { sampleOrders, sampleProducts } from "@/data/sampleProducts";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  Heart,
  Star,
  MapPin,
  CreditCard,
  User,
  Bell,
  Gift,
  Shield,
  LogOut,
} from "lucide-react";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("orders");

  const mockOrders = sampleOrders;

  const mockWishlist = sampleProducts.slice(0, 2).map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.images[0],
    inStock: product.stock > 0,
  }));

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500";
      case "shipped":
        return "bg-blue-500";
      case "processing":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTrackingProgress = (tracking: any) => {
    const steps = ["ordered", "confirmed", "shipped", "delivered"];
    const completedSteps = steps.filter(step => tracking[step]).length;
    return (completedSteps / steps.length) * 100;
  };

  const OrderCard = ({ order }: any) => (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg">{order.id}</h3>
            <p className="text-sm text-muted-foreground">
              Ordered on {new Date(order.date).toLocaleDateString()}
            </p>
          </div>
          <Badge className={getStatusColor(order.status)}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
        </div>

        <div className="space-y-3 mb-4">
          {order.items.map((item: any, index: number) => (
            <div key={index} className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-muted-foreground">
                  Qty: {item.quantity} × {formatPrice(item.price)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Order Progress</span>
            <span className="text-sm text-muted-foreground">
              Est. delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
            </span>
          </div>
          <Progress value={getTrackingProgress(order.tracking)} className="mb-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span className={order.tracking.ordered ? "text-primary" : ""}>Ordered</span>
            <span className={order.tracking.confirmed ? "text-primary" : ""}>Confirmed</span>
            <span className={order.tracking.shipped ? "text-primary" : ""}>Shipped</span>
            <span className={order.tracking.delivered ? "text-primary" : ""}>Delivered</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-primary">
            Total: {formatPrice(order.total)}
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Track Order
            </Button>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="text-lg font-semibold">
                {user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={logout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Package className="w-8 h-8 mx-auto text-primary mb-2" />
              <h3 className="font-semibold">Total Orders</h3>
              <p className="text-2xl font-bold text-primary">{mockOrders.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Truck className="w-8 h-8 mx-auto text-blue-500 mb-2" />
              <h3 className="font-semibold">Shipped</h3>
              <p className="text-2xl font-bold text-blue-500">
                {mockOrders.filter(o => o.status === "shipped").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 mx-auto text-green-500 mb-2" />
              <h3 className="font-semibold">Delivered</h3>
              <p className="text-2xl font-bold text-green-500">
                {mockOrders.filter(o => o.status === "delivered").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="w-8 h-8 mx-auto text-red-500 mb-2" />
              <h3 className="font-semibold">Wishlist</h3>
              <p className="text-2xl font-bold text-red-500">{mockWishlist.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders">My Orders</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="mt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Order History</h2>
                <Button asChild>
                  <Link to="/products">Continue Shopping</Link>
                </Button>
              </div>
              {mockOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="wishlist" className="mt-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">My Wishlist</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockWishlist.map((item) => (
                  <Card key={item.id} className="card-product">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-2">{item.name}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-primary">
                          {formatPrice(item.price)}
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(item.originalPrice)}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1" disabled={!item.inStock}>
                          {item.inStock ? "Add to Cart" : "Out of Stock"}
                        </Button>
                        <Button variant="outline" size="icon">
                          <Heart className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Manage your account details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input value={user?.name} readOnly />
                  </div>
                  <div>
                    <Label>Email Address</Label>
                    <Input value={user?.email} readOnly />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input placeholder="Add phone number" />
                  </div>
                  <div>
                    <Label>Date of Birth</Label>
                    <Input type="date" />
                  </div>
                </div>
                <div>
                  <Label>Address</Label>
                  <Input placeholder="Add your address" />
                </div>
                <Button>Update Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Manage your notification preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5" />
                      <span>Order Updates</span>
                    </div>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Gift className="w-5 h-5" />
                      <span>Promotions</span>
                    </div>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>
                    Manage your account security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Payment Methods
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
