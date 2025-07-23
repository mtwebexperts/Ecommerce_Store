import React, { createContext, useContext, useState, useEffect } from 'react';
import { sampleProducts, sampleOrders } from '@/data/sampleProducts';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive';
  lastLogin: string;
  phone?: string;
  address?: string;
  avatar?: string;
}

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  customerName: string;
  customerEmail: string;
  items: any[];
  tracking: any;
  estimatedDelivery: string;
  actualDelivery?: string;
  shippingAddress: string;
  paymentMethod: string;
  trackingNumber?: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  stock: number;
  sold: number;
  rating: number;
  reviews: number;
  images: string[];
  status: string;
  brand: string;
  freeShipping: boolean;
  warranty: string;
  seller: string;
  sellerId: number;
  tags: string[];
  featured: boolean;
}

interface AppContextType {
  // Users
  users: User[];
  addUser: (user: Omit<User, 'id' | 'joinDate' | 'totalOrders' | 'totalSpent' | 'status' | 'lastLogin'>) => void;
  updateUser: (userId: number, updates: Partial<User>) => void;
  
  // Orders
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'date'>) => string;
  updateOrderStatus: (orderId: string, status: string) => void;
  
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'sold' | 'reviews'>) => void;
  updateProduct: (productId: number, updates: Partial<Product>) => void;
  deleteProduct: (productId: number) => void;
  
  // Analytics
  getTotalRevenue: () => number;
  getTotalCustomers: () => number;
  getRevenueByCategory: () => Record<string, number>;
  getTopSellingProducts: () => Product[];
  getRecentOrders: () => Order[];
  getLowStockProducts: () => Product[];
}

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with sample data
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Tanzeel Yousef",
      email: "tanzeel@example.com",
      role: "customer",
      joinDate: "2024-01-10",
      totalOrders: 3,
      totalSpent: 395997,
      status: "active",
      lastLogin: "2024-01-25",
      phone: "+92 300 1234567",
      address: "123 Main Street, Karachi, Pakistan"
    },
    {
      id: 2,
      name: "Ahmed Khan",
      email: "ahmed@example.com",
      role: "customer", 
      joinDate: "2024-01-12",
      totalOrders: 1,
      totalSpent: 159999,
      status: "active",
      lastLogin: "2024-01-24",
      phone: "+92 301 9876543",
      address: "456 Oak Avenue, Lahore, Pakistan"
    },
    {
      id: 3,
      name: "Sara Ali",
      email: "sara@example.com",
      role: "customer",
      joinDate: "2024-01-15",
      totalOrders: 1,
      totalSpent: 45999,
      status: "active",
      lastLogin: "2024-01-23",
      phone: "+92 302 5555555",
      address: "789 Pine Street, Islamabad, Pakistan"
    },
    {
      id: 4,
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      joinDate: "2024-01-01",
      totalOrders: 0,
      totalSpent: 0,
      status: "active",
      lastLogin: "2024-01-25",
      phone: "+92 300 0000000",
      address: "Admin Office, Tanzeel's Store HQ"
    }
  ]);

  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [products, setProducts] = useState<Product[]>(sampleProducts);

  // User management
  const addUser = (userData: Omit<User, 'id' | 'joinDate' | 'totalOrders' | 'totalSpent' | 'status' | 'lastLogin'>) => {
    const newUser: User = {
      ...userData,
      id: Date.now(),
      joinDate: new Date().toISOString().split('T')[0],
      totalOrders: 0,
      totalSpent: 0,
      status: 'active',
      lastLogin: new Date().toISOString().split('T')[0],
    };
    setUsers(prev => [...prev, newUser]);
  };

  const updateUser = (userId: number, updates: Partial<User>) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, ...updates } : user
    ));
  };

  // Order management
  const addOrder = (orderData: Omit<Order, 'id' | 'date'>) => {
    const orderId = `ORD-${Date.now()}`;
    const newOrder: Order = {
      ...orderData,
      id: orderId,
      date: new Date().toISOString().split('T')[0],
    };
    
    setOrders(prev => [newOrder, ...prev]);
    
    // Update user's order count and total spent
    const customer = users.find(user => user.email === orderData.customerEmail);
    if (customer) {
      updateUser(customer.id, {
        totalOrders: customer.totalOrders + 1,
        totalSpent: customer.totalSpent + orderData.total,
        lastLogin: new Date().toISOString().split('T')[0]
      });
    }
    
    // Update product sold counts
    orderData.items.forEach(item => {
      setProducts(prev => prev.map(product => 
        product.id === item.id 
          ? { ...product, sold: product.sold + item.quantity }
          : product
      ));
    });
    
    return orderId;
  };

  const updateOrderStatus = (orderId: string, status: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            status,
            tracking: {
              ...order.tracking,
              confirmed: ["confirmed", "shipped", "delivered"].includes(status),
              shipped: ["shipped", "delivered"].includes(status),
              delivered: status === "delivered"
            }
          }
        : order
    ));
  };

  // Product management
  const addProduct = (productData: Omit<Product, 'id' | 'sold' | 'reviews'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now(),
      sold: 0,
      reviews: 0,
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (productId: number, updates: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === productId ? { ...product, ...updates } : product
    ));
  };

  const deleteProduct = (productId: number) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
  };

  // Analytics functions
  const getTotalRevenue = () => {
    return products.reduce((sum, product) => sum + (product.price * product.sold), 0);
  };

  const getTotalCustomers = () => {
    return users.filter(user => user.role === "customer").length;
  };

  const getRevenueByCategory = () => {
    const categories = ["Electronics", "Audio", "Fashion", "Home & Living", "Sports", "Beauty", "Books", "Gaming"];
    return categories.reduce((acc, category) => {
      const categoryProducts = products.filter(p => p.category === category);
      const categoryRevenue = categoryProducts.reduce((sum, p) => sum + (p.price * p.sold), 0);
      acc[category] = categoryRevenue;
      return acc;
    }, {} as Record<string, number>);
  };

  const getTopSellingProducts = () => {
    return [...products].sort((a, b) => b.sold - a.sold).slice(0, 5);
  };

  const getRecentOrders = () => {
    return [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
  };

  const getLowStockProducts = () => {
    return products.filter(p => p.stock < 10);
  };

  const value: AppContextType = {
    // Users
    users,
    addUser,
    updateUser,
    
    // Orders
    orders,
    addOrder,
    updateOrderStatus,
    
    // Products
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    
    // Analytics
    getTotalRevenue,
    getTotalCustomers,
    getRevenueByCategory,
    getTopSellingProducts,
    getRecentOrders,
    getLowStockProducts,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
