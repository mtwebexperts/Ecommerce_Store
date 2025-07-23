import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Package,
  Truck,
  Mail,
  Phone,
  Download,
  Share2,
  ArrowRight,
  Calendar,
  MapPin,
  CreditCard,
  Star,
} from "lucide-react";

export default function OrderSuccess() {
  const location = useLocation();
  const orderData = location.state?.orderData;

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case "card": return "Credit/Debit Card";
      case "jazzcash": return "JazzCash";
      case "easypaisa": return "EasyPaisa";
      case "bank": return "Bank Transfer";
      case "cod": return "Cash on Delivery";
      default: return method;
    }
  };

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  if (!orderData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Order Not Found</h2>
            <p className="text-muted-foreground mb-4">
              We couldn't find your order information.
            </p>
            <Button asChild>
              <Link to="/">Return to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">Order Placed Successfully!</h1>
          <p className="text-xl text-muted-foreground mb-4">
            Thank you for shopping with Tanzeel's Store
          </p>
          <div className="flex items-center justify-center gap-2 text-lg">
            <span className="text-muted-foreground">Order ID:</span>
            <Badge variant="outline" className="text-lg px-3 py-1">
              {orderData.orderId}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* What's Next */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  What happens next?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Order Confirmation</h4>
                      <p className="text-sm text-muted-foreground">
                        You'll receive an order confirmation email shortly with your order details and tracking information.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Package className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Order Processing</h4>
                      <p className="text-sm text-muted-foreground">
                        We'll start preparing your order for shipment. This usually takes 1-2 business days.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Truck className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Shipping & Delivery</h4>
                      <p className="text-sm text-muted-foreground">
                        Your order will be shipped and you'll receive tracking details via email and SMS.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderData.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Variant: {item.variant}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatPrice(item.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">
                    {orderData.shipping.firstName} {orderData.shipping.lastName}
                  </p>
                  <p className="text-muted-foreground">{orderData.shipping.address}</p>
                  <p className="text-muted-foreground">
                    {orderData.shipping.city}, {orderData.shipping.postalCode}
                  </p>
                  <p className="text-muted-foreground">{orderData.shipping.country}</p>
                  <div className="flex items-center gap-4 pt-2">
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{orderData.shipping.phone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{orderData.shipping.email}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Status */}
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-800">Order Confirmed</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Your order has been received and confirmed.
                  </p>
                </div>

                {/* Estimated Delivery */}
                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Estimated Delivery</span>
                  </div>
                  <span className="text-sm font-medium text-blue-800">
                    {estimatedDelivery.toLocaleDateString()}
                  </span>
                </div>

                {/* Payment Method */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Payment Method:</span>
                  <div className="flex items-center gap-1">
                    <CreditCard className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {getPaymentMethodName(orderData.paymentMethod)}
                    </span>
                  </div>
                </div>

                <Separator />

                {/* Total */}
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Total Paid:</span>
                  <span className="text-primary">{formatPrice(orderData.total)}</span>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-4">
                  <Button className="w-full" asChild>
                    <Link to="/dashboard">
                      Track Your Order
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Invoice
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Order
                  </Button>
                </div>

                {/* Customer Support */}
                <div className="pt-4 border-t space-y-2">
                  <h4 className="font-medium text-sm">Need Help?</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-3 h-3" />
                      <span>+92 123 456 7890</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-3 h-3" />
                      <span>support@tanzeelsstore.com</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="mt-12 text-center">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">Thank you for choosing Tanzeel's Store!</h3>
              <p className="text-muted-foreground mb-6">
                We appreciate your business. Don't forget to leave a review once you receive your items!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild>
                  <Link to="/products">
                    Continue Shopping
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/">
                    Back to Home
                  </Link>
                </Button>
              </div>
              
              {/* Rating Prompt */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-medium">Rate Your Experience</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your feedback helps us improve our service for everyone!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
