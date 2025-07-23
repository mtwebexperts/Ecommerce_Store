import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/components/AuthContext";
import { useAppContext } from "@/context/AppContext";
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Upload,
  Eye,
  Star,
  LogOut,
  Check,
  X,
  Clock,
  Truck,
  CheckCircle,
  User,
  Mail,
  Calendar,
  MapPin,
  Phone,
  AlertTriangle,
} from "lucide-react";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const appContext = useAppContext();
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    stock: "",
    brand: "",
    images: [] as string[],
    featured: false,
  });

  // Use global app context data
  const mockProducts = appContext.products;
  const mockOrders = appContext.orders;
  const mockUsers = appContext.users;

  const categories = ["Electronics", "Audio", "Fashion", "Home & Living", "Sports", "Beauty", "Books", "Gaming"];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.stock) {
      alert("Please fill in all required fields (Name, Price, Category, Stock)");
      return;
    }

    const productData = {
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      originalPrice: parseFloat(newProduct.originalPrice) || parseFloat(newProduct.price),
      category: newProduct.category,
      stock: parseInt(newProduct.stock),
      rating: 4.0,
      images: newProduct.images.length > 0 ? newProduct.images : ["/placeholder.svg"],
      status: parseInt(newProduct.stock) > 0 ? "active" : "out_of_stock",
      brand: newProduct.brand || "Tanzeel's Brand",
      freeShipping: parseFloat(newProduct.price) >= 2000,
      warranty: "1 Year Warranty",
      seller: "Tanzeel's Store",
      sellerId: 1,
      tags: [newProduct.category.toLowerCase(), "new"],
      featured: newProduct.featured,
    };

    // Add product using global context
    appContext.addProduct(productData);

    // Reset form
    setNewProduct({
      name: "",
      description: "",
      price: "",
      originalPrice: "",
      category: "",
      stock: "",
      brand: "",
      images: [],
      featured: false,
    });
    setShowAddProduct(false);

    // Show success message with category info
    alert(`Product "${productData.name}" added successfully! It's now available in the ${newProduct.category} category.`);
  };

  const handleDeleteProduct = (id: number) => {
    const product = mockProducts.find(p => p.id === id);
    if (window.confirm(`Are you sure you want to delete "${product?.name}"? This action cannot be undone.`)) {
      appContext.deleteProduct(id);
      alert(`Product "${product?.name}" deleted successfully!`);
    }
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      originalPrice: product.originalPrice.toString(),
      category: product.category,
      stock: product.stock.toString(),
      brand: product.brand,
      images: product.images,
      featured: product.featured,
    });
    setShowAddProduct(true);
  };

  const handleUpdateProduct = () => {
    if (!editingProduct) return;

    const updates = {
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      originalPrice: parseFloat(newProduct.originalPrice) || parseFloat(newProduct.price),
      category: newProduct.category,
      stock: parseInt(newProduct.stock),
      status: parseInt(newProduct.stock) > 0 ? "active" : "out_of_stock",
      brand: newProduct.brand || "Tanzeel's Brand",
      freeShipping: parseFloat(newProduct.price) >= 2000,
      images: newProduct.images,
      featured: newProduct.featured,
    };

    appContext.updateProduct(editingProduct.id, updates);

    // Reset form and editing state
    setNewProduct({
      name: "",
      description: "",
      price: "",
      originalPrice: "",
      category: "",
      stock: "",
      brand: "",
      images: [],
      featured: false,
    });
    setEditingProduct(null);
    setShowAddProduct(false);

    alert(`Product "${updates.name}" updated successfully!`);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    appContext.updateOrderStatus(orderId, newStatus);
    alert(`Order ${orderId} status updated to ${newStatus}`);
  };

  const handleCancelOrder = (orderId: string) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      appContext.updateOrderStatus(orderId, "cancelled");
      alert(`Order ${orderId} has been cancelled`);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(() => "/placeholder.svg");
      setNewProduct(prev => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }));
    }
  };

  // Dynamic statistics that update in real-time using global context
  const totalRevenue = appContext.getTotalRevenue();
  const totalProducts = mockProducts.length;
  const totalOrders = mockOrders.length;
  const totalCustomers = appContext.getTotalCustomers();
  const lowStockProducts = appContext.getLowStockProducts().length;
  const activeProducts = mockProducts.filter(p => p.status === "active").length;
  const outOfStockProducts = mockProducts.filter(p => p.status === "out_of_stock").length;
  const featuredProducts = mockProducts.filter(p => p.featured).length;

  // Use global context analytics functions
  const revenueByCategory = appContext.getRevenueByCategory();
  const topSellingProducts = appContext.getTopSellingProducts();
  const recentOrders = appContext.getRecentOrders();
  const lowStockProductsList = appContext.getLowStockProducts();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-green-500";
      case "shipped": return "bg-blue-500";
      case "confirmed": return "bg-purple-500";
      case "processing": return "bg-yellow-500";
      case "pending": return "bg-orange-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage Tanzeel's Store</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, {user?.name}</span>
            <Button variant="outline" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer shimmer-effect">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm transition-colors duration-300 group-hover:text-green-600">Total Revenue</p>
                  <p className="text-2xl font-bold transition-all duration-300 group-hover:scale-105">{formatPrice(totalRevenue)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 floating-animation" />
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm transition-colors duration-300 group-hover:text-blue-600">Total Products</p>
                  <p className="text-2xl font-bold transition-all duration-300 group-hover:scale-105">{totalProducts}</p>
                </div>
                <Package className="w-8 h-8 text-blue-500 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 pulse-animation" />
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm transition-colors duration-300 group-hover:text-purple-600">Total Orders</p>
                  <p className="text-2xl font-bold transition-all duration-300 group-hover:scale-105">{totalOrders}</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-purple-500 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm transition-colors duration-300 group-hover:text-indigo-600">Total Customers</p>
                  <p className="text-2xl font-bold transition-all duration-300 group-hover:scale-105">{totalCustomers}</p>
                </div>
                <Users className="w-8 h-8 text-indigo-500 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer glow-effect">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm transition-colors duration-300 group-hover:text-red-600">Low Stock Alert</p>
                  <p className="text-2xl font-bold text-red-500 transition-all duration-300 group-hover:scale-105">{lowStockProducts}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 pulse-animation" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.customerName}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(order.date).toLocaleDateString()} • {order.items.length} item(s)
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">{formatPrice(order.total)}</p>
                          <Badge className={`text-xs ${getStatusColor(order.status)} transition-all duration-300 hover:scale-105`}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Low Stock Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lowStockProductsList
                      .slice(0, 5)
                      .map((product) => (
                        <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-red-200">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-10 h-10 object-cover rounded transition-transform duration-300 hover:scale-110"
                            />
                            <div>
                              <p className="font-medium text-sm line-clamp-1">{product.name}</p>
                              <p className="text-xs text-muted-foreground">{product.category} • {formatPrice(product.price)}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`text-sm font-medium ${
                              product.stock === 0 ? 'text-red-600' :
                              product.stock < 5 ? 'text-red-500' : 'text-orange-500'
                            }`}>
                              {product.stock === 0 ? 'Out of Stock' : `Only ${product.stock} left`}
                            </p>
                            <Button
                              size="sm"
                              variant="outline"
                              className="mt-1 text-xs h-6 px-2 hover:bg-primary hover:text-white transition-colors duration-300"
                              onClick={() => handleEditProduct(product)}
                            >
                              Restock
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="mt-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Product Management</h2>
                <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        {editingProduct ? 'Edit Product' : 'Add New Product'}
                      </DialogTitle>
                      <DialogDescription>
                        {editingProduct
                          ? 'Update the product details below.'
                          : 'Fill in the details to add a new product to your store.'
                        }
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Product Name *</Label>
                          <Input
                            id="name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter product name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="category">Category *</Label>
                          <Select value={newProduct.category} onValueChange={(value) => setNewProduct(prev => ({ ...prev, category: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map(cat => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={newProduct.description}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Enter product description"
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <Label htmlFor="price">Sale Price (PKR) *</Label>
                          <Input
                            id="price"
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="originalPrice">Original Price (PKR)</Label>
                          <Input
                            id="originalPrice"
                            type="number"
                            value={newProduct.originalPrice}
                            onChange={(e) => setNewProduct(prev => ({ ...prev, originalPrice: e.target.value }))}
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="stock">Stock Quantity *</Label>
                          <Input
                            id="stock"
                            type="number"
                            value={newProduct.stock}
                            onChange={(e) => setNewProduct(prev => ({ ...prev, stock: e.target.value }))}
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="brand">Brand</Label>
                          <Input
                            id="brand"
                            value={newProduct.brand}
                            onChange={(e) => setNewProduct(prev => ({ ...prev, brand: e.target.value }))}
                            placeholder="Enter brand name"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="images">Product Images</Label>
                        <div className="mt-2">
                          <div className="flex items-center gap-4">
                            <input
                              id="images"
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => document.getElementById('images')?.click()}
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              Upload Images
                            </Button>
                            <span className="text-sm text-muted-foreground">
                              {newProduct.images.length} image(s) selected
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="featured"
                          checked={newProduct.featured}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, featured: e.target.checked }))}
                          className="w-4 h-4"
                        />
                        <Label htmlFor="featured">Mark as Featured Product</Label>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setShowAddProduct(false);
                            setEditingProduct(null);
                            setNewProduct({
                              name: "",
                              description: "",
                              price: "",
                              originalPrice: "",
                              category: "",
                              stock: "",
                              brand: "",
                              images: [],
                              featured: false,
                            });
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                          className="transition-all duration-300 hover:scale-105"
                        >
                          {editingProduct ? 'Update Product' : 'Add Product'}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
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
                      <Badge
                        className={`absolute top-2 right-2 ${
                          product.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      >
                        {product.status === 'active' ? 'Active' : 'Out of Stock'}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-2">
                        <Badge variant="outline" className="text-xs">
                          {product.category}
                        </Badge>
                      </div>
                      <h3 className="font-semibold mb-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-muted-foreground line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span>Stock: {product.stock}</span>
                          <span>Sold: {product.sold}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{product.rating}</span>
                          <span className="text-xs text-muted-foreground">({product.reviews})</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 transition-all duration-300 hover:scale-105 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 transition-all duration-300 hover:scale-105 hover:bg-green-50 hover:text-green-600 hover:border-green-200"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-700 transition-all duration-300 hover:scale-105 hover:bg-red-50 hover:border-red-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
                <CardDescription>
                  Manage customer orders and update their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <Card key={order.id} className="p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{order.id}</h3>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Customer: {order.customerName} ({order.customerEmail})
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Date: {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg">{formatPrice(order.total)}</p>
                          <p className="text-sm text-muted-foreground">{order.paymentMethod}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium mb-2">Items:</h4>
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-8 h-8 object-cover rounded"
                              />
                              <span>{item.name} (x{item.quantity})</span>
                            </div>
                          ))}
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Shipping Address:</h4>
                          <p className="text-sm text-muted-foreground">{order.shippingAddress}</p>
                        </div>
                      </div>

                      <div className="flex gap-2 flex-wrap">
                        {order.status !== "cancelled" && order.status !== "delivered" && (
                          <>
                            {order.status === "pending" && (
                              <Button
                                size="sm"
                                onClick={() => handleUpdateOrderStatus(order.id, "confirmed")}
                                className="bg-purple-500 hover:bg-purple-600"
                              >
                                <Check className="w-4 h-4 mr-1" />
                                Confirm Order
                              </Button>
                            )}
                            {order.status === "confirmed" && (
                              <Button
                                size="sm"
                                onClick={() => handleUpdateOrderStatus(order.id, "shipped")}
                                className="bg-blue-500 hover:bg-blue-600"
                              >
                                <Truck className="w-4 h-4 mr-1" />
                                Mark as Shipped
                              </Button>
                            )}
                            {order.status === "shipped" && (
                              <Button
                                size="sm"
                                onClick={() => handleUpdateOrderStatus(order.id, "delivered")}
                                className="bg-green-500 hover:bg-green-600"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Mark as Delivered
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleCancelOrder(order.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="w-4 h-4 mr-1" />
                              Cancel Order
                            </Button>
                          </>
                        )}
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Management</CardTitle>
                <CardDescription>
                  View and manage customer accounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{customer.name}</p>
                              <p className="text-sm text-muted-foreground">{customer.role}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Mail className="w-3 h-3" />
                              {customer.email}
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Phone className="w-3 h-3" />
                              {customer.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="w-3 h-3" />
                            {new Date(customer.joinDate).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>{customer.totalOrders}</TableCell>
                        <TableCell className="font-medium">
                          {formatPrice(customer.totalSpent)}
                        </TableCell>
                        <TableCell>{new Date(customer.lastLogin).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge className={customer.status === 'active' ? 'bg-green-500' : 'bg-red-500'}>
                            {customer.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categories.map((category) => {
                      const categoryRevenue = revenueByCategory[category] || 0;
                      const categoryProducts = mockProducts.filter(p => p.category === category);
                      const percentage = totalRevenue > 0 ? (categoryRevenue / totalRevenue) * 100 : 0;

                      return (
                        <div key={category} className="space-y-2 group">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{category}</span>
                              <span className="text-xs text-muted-foreground">({categoryProducts.length} products)</span>
                            </div>
                            <span className="text-sm font-medium text-primary">{formatPrice(categoryRevenue)}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out group-hover:bg-primary/80"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {percentage.toFixed(1)}% of total revenue
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Selling Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topSellingProducts.map((product, index) => {
                      const revenue = product.price * product.sold;
                      return (
                        <div key={product.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors duration-300">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                            index === 0 ? 'bg-yellow-100 text-yellow-800' :
                            index === 1 ? 'bg-gray-100 text-gray-800' :
                            index === 2 ? 'bg-orange-100 text-orange-800' :
                            'bg-primary/10 text-primary'
                          }`}>
                            {index + 1}
                          </div>
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded transition-transform duration-300 hover:scale-110"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm line-clamp-1">{product.name}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{product.sold} sold</span>
                              <span>•</span>
                              <span>{formatPrice(product.price)}</span>
                              <span>•</span>
                              <span className="text-green-600 font-medium">{formatPrice(revenue)} revenue</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
