import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import Navbar from "@/components/layout/navbar";
import { ArrowLeft, CreditCard, Smartphone, Truck, MapPin, Clock, Package } from "lucide-react";
import { Link } from "wouter";
import { isUnauthorizedError } from "@/lib/authUtils";

export default function Checkout() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [guestInfo, setGuestInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  
  const [deliveryDetails, setDeliveryDetails] = useState({
    deliveryMethod: "standard",
    deliveryAddress: "",
    deliveryNotes: "",
    preferredDeliveryTime: "",
    contactPerson: "",
    contactPhone: "",
    isGift: false,
    giftMessage: "",
  });
  
  const [paymentMethod, setPaymentMethod] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ["/api/cart"],
    enabled: isAuthenticated,
  });

  // For guest checkout, we'll need to handle cart differently
  // For now, we'll redirect guests to login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      toast({
        title: "Login Required",
        description: "Please login to proceed with checkout",
        variant: "destructive",
      });
      window.location.href = "/login";
    }
  }, [isAuthenticated, isLoading, toast]);

  // Initialize delivery address from user data
  useEffect(() => {
    if (user?.address) {
      setDeliveryDetails(prev => ({
        ...prev,
        deliveryAddress: user.address || "",
        contactPerson: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : "",
        contactPhone: user.phone || "",
      }));
    }
  }, [user]);

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      const response = await apiRequest("POST", "/api/orders", orderData);
      return response.json();
    },
    onSuccess: (order) => {
      toast({
        title: "Order Created!",
        description: `Redirecting to payment for order ${order.orderNumber}...`,
      });
      
      // Clear cart
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      
      // Create payment intent and redirect to payment page
      setTimeout(() => {
        // In a real implementation, this would create a payment intent
        // and redirect to Stripe checkout or custom payment page
        const paymentData = {
          orderId: order.id,
          amount: total,
          method: paymentMethod
        };
        
        // Store payment data in sessionStorage for payment page
        sessionStorage.setItem('pendingPayment', JSON.stringify(paymentData));
        
        // Redirect to payment processing page
        window.location.href = `/payment?order=${order.id}&amount=${total}&method=${paymentMethod}`;
      }, 1000);
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 500);
        return;
      }
      toast({
        title: "Order Failed",
        description: error.message || "Failed to create order",
        variant: "destructive",
      });
    },
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Login Required
          </h1>
          <p className="text-gray-600 mb-6">
            Please login to proceed with checkout
          </p>
          <Button onClick={() => window.location.href = "/login"}>
            Login
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-4">
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if ((cartItems as any[]).length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-6">
            Add some items to your cart before checkout
          </p>
          <Link href="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const total = (cartItems as any[]).reduce((sum: number, item: any) => {
    return sum + (parseFloat(item.product?.price || "0") * item.quantity);
  }, 0);

  const deliveryFee = deliveryDetails.deliveryMethod === "express" ? 500 : 200;
  const finalTotal = total + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paymentMethod) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method",
        variant: "destructive",
      });
      return;
    }

    if (!termsAccepted) {
      toast({
        title: "Terms & Conditions",
        description: "Please accept the terms and conditions",
        variant: "destructive",
      });
      return;
    }

    if (!deliveryDetails.deliveryAddress) {
      toast({
        title: "Delivery Address Required",
        description: "Please provide a delivery address",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      userId: user?.id,
      customerName: user?.firstName && user?.lastName 
        ? `${user.firstName} ${user.lastName}` 
        : guestInfo.name,
      customerEmail: user?.email || guestInfo.email,
      customerPhone: user?.phone || guestInfo.phone,
      shippingAddress: deliveryDetails.deliveryAddress,
      deliveryDetails: {
        method: deliveryDetails.deliveryMethod,
        notes: deliveryDetails.deliveryNotes,
        preferredTime: deliveryDetails.preferredDeliveryTime,
        contactPerson: deliveryDetails.contactPerson,
        contactPhone: deliveryDetails.contactPhone,
        isGift: deliveryDetails.isGift,
        giftMessage: deliveryDetails.giftMessage,
      },
      total: finalTotal.toFixed(2),
      deliveryFee: deliveryFee.toFixed(2),
      paymentMethod,
      items: (cartItems as any[]).map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
        pricePerItem: item.product?.price,
        total: (parseFloat(item.product?.price || "0") * item.quantity).toFixed(2),
      })),
    };

    createOrderMutation.mutate(orderData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/products">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shopping
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="xl:col-span-2 space-y-6">
            {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!user?.firstName && (
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={guestInfo.name}
                        onChange={(e) => setGuestInfo({...guestInfo, name: e.target.value})}
                        required
                      />
                    </div>
                  )}
                  
                  {!user?.email && (
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={guestInfo.email}
                        onChange={(e) => setGuestInfo({...guestInfo, email: e.target.value})}
                        required
                      />
                    </div>
                  )}
                  
                  {!user?.phone && (
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={guestInfo.phone}
                        onChange={(e) => setGuestInfo({...guestInfo, phone: e.target.value})}
                        required
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Delivery & Shipment Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Delivery & Shipment Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Delivery Method */}
                  <div>
                    <Label htmlFor="deliveryMethod">Delivery Method *</Label>
                    <Select 
                      value={deliveryDetails.deliveryMethod} 
                      onValueChange={(value) => setDeliveryDetails({...deliveryDetails, deliveryMethod: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select delivery method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            Standard Delivery (2-3 days) - KSh 200
                          </div>
                        </SelectItem>
                        <SelectItem value="express">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Express Delivery (Same day) - KSh 500
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Delivery Address */}
                  <div>
                    <Label htmlFor="deliveryAddress">Delivery Address *</Label>
                    <Textarea
                      id="deliveryAddress"
                      value={deliveryDetails.deliveryAddress}
                      onChange={(e) => setDeliveryDetails({...deliveryDetails, deliveryAddress: e.target.value})}
                      required
                      rows={3}
                      placeholder="Enter your complete delivery address including street, city, and postal code"
                    />
                  </div>

                  {/* Contact Person for Delivery */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactPerson">Contact Person</Label>
                      <Input
                        id="contactPerson"
                        value={deliveryDetails.contactPerson}
                        onChange={(e) => setDeliveryDetails({...deliveryDetails, contactPerson: e.target.value})}
                        placeholder="Name of person to contact"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactPhone">Contact Phone</Label>
                      <Input
                        id="contactPhone"
                        type="tel"
                        value={deliveryDetails.contactPhone}
                        onChange={(e) => setDeliveryDetails({...deliveryDetails, contactPhone: e.target.value})}
                        placeholder="Phone number for delivery"
                      />
                    </div>
                  </div>

                  {/* Preferred Delivery Time */}
                  <div>
                    <Label htmlFor="preferredTime">Preferred Delivery Time</Label>
                    <Select 
                      value={deliveryDetails.preferredDeliveryTime} 
                      onValueChange={(value) => setDeliveryDetails({...deliveryDetails, preferredDeliveryTime: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select preferred time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (8 AM - 12 PM)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
                        <SelectItem value="evening">Evening (4 PM - 8 PM)</SelectItem>
                        <SelectItem value="anytime">Anytime</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Delivery Notes */}
                  <div>
                    <Label htmlFor="deliveryNotes">Delivery Notes</Label>
                    <Textarea
                      id="deliveryNotes"
                      value={deliveryDetails.deliveryNotes}
                      onChange={(e) => setDeliveryDetails({...deliveryDetails, deliveryNotes: e.target.value})}
                      rows={2}
                      placeholder="Any special instructions for delivery (e.g., gate code, landmarks, etc.)"
                    />
                  </div>

                  {/* Gift Options */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isGift"
                        checked={deliveryDetails.isGift}
                        onCheckedChange={(checked) => setDeliveryDetails({...deliveryDetails, isGift: checked as boolean})}
                      />
                      <Label htmlFor="isGift">This is a gift</Label>
                    </div>
                    {deliveryDetails.isGift && (
                      <div>
                        <Label htmlFor="giftMessage">Gift Message</Label>
                        <Textarea
                          id="giftMessage"
                          value={deliveryDetails.giftMessage}
                          onChange={(e) => setDeliveryDetails({...deliveryDetails, giftMessage: e.target.value})}
                          rows={2}
                          placeholder="Add a personal message for the gift recipient"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mpesa">
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-green-600" />
                          <span className="font-medium">M-Pesa</span>
                          <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Popular</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="card">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-blue-600" />
                          <span className="font-medium">Credit/Debit Card</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Terms and Conditions */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={termsAccepted}
                      onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                      required
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      I agree to the{" "}
                      <a href="#" className="text-primary hover:underline">Terms and Conditions</a>
                      {" "}and{" "}
                      <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(cartItems as any[]).map((item: any) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                        {item.product?.images?.[0] && (
                          <img
                            src={item.product.images[0]}
                            alt={item.product.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {item.product?.title}
                          </h4>
                          <p className="text-gray-600">
                            KSh {item.product?.price} x {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            KSh {(parseFloat(item.product?.price || "0") * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    <div className="border-t border-gray-200 pt-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Subtotal:</span>
                        <span>KSh {total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Delivery Fee:</span>
                        <span>KSh {deliveryFee.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total:</span>
                          <span className="text-primary">KSh {finalTotal.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full h-12 text-base font-semibold"
                      disabled={createOrderMutation.isPending || !termsAccepted}
                    >
                      {createOrderMutation.isPending ? "Processing..." : "Proceed to Payment"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
