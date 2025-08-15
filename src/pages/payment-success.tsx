import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Package, ArrowRight, Smartphone } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import { useQuery } from "@tanstack/react-query";

export default function PaymentSuccess() {
  const [location] = useLocation();
  const [orderId, setOrderId] = useState<string>("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    const orderParam = urlParams.get('order');
    if (orderParam) {
      setOrderId(orderParam);
    }
  }, [location]);

  const { data: order } = useQuery({
    queryKey: ["/api/orders", orderId],
    enabled: !!orderId,
  });

  // Type-safe order data
  const orderData = order as any;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
            <p className="text-gray-600">Your order has been confirmed and payment processed</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {orderData && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Order Details</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Order Number:</span> {orderData.orderNumber || orderId}</p>
                  <p><span className="font-medium">Total Amount:</span> KSh {orderData.totalAmount || "0.00"}</p>
                  <p><span className="font-medium">Status:</span> {orderData.status || "Confirmed"}</p>
                  <p><span className="font-medium">Delivery Address:</span> {orderData.deliveryAddress || "As provided"}</p>
                </div>
              </div>
            )}

            {/* M-Pesa Payment Info */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">M-Pesa Payment Confirmed</span>
              </div>
              <p className="text-sm text-green-700 mb-2">
                Your M-Pesa payment has been processed successfully. You should receive an SMS confirmation from M-Pesa shortly.
              </p>
              <div className="text-xs text-green-600">
                💡 Keep your M-Pesa transaction receipt for reference
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-5 h-5 text-blue-600" />
                <span className="font-medium">What happens next?</span>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• We'll prepare your items for delivery</li>
                <li>• You'll receive SMS updates on your order status</li>
                <li>• Items will be delivered to your address within 2-5 business days</li>
                <li>• Contact support if you have any questions</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/">
                <Button className="flex-1 w-full">
                  Continue Shopping
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="flex-1 w-full">
                  Contact Support
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Thank you for shopping with Kamkunji Ndogo!</p>
        </div>
      </div>
    </div>
  );
}