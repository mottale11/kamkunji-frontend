import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Smartphone } from "lucide-react";
import MpesaPayment from "@/components/mpesa-payment";

export default function Payment() {
  const [, navigate] = useLocation();
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "card">("mpesa");
  const { toast } = useToast();

  const handleBack = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Checkout
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Select Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant={paymentMethod === "mpesa" ? "default" : "outline"}
                  onClick={() => setPaymentMethod("mpesa")}
                  className="flex-1 justify-start gap-2"
                >
                  <Smartphone className="w-5 h-5" />
                  M-Pesa
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {paymentMethod === "mpesa" && (
          <MpesaPayment 
            amount={1000} // Replace with actual amount from your state/context
            orderId="order123" // Replace with actual order ID from your state/context
            onPaymentSuccess={() => {
              toast({
                title: "Payment Successful",
                description: "Your payment has been processed successfully.",
              });
              navigate("/payment/success");
            }}
            onPaymentError={(error) => {
              toast({
                title: "Payment Failed",
                description: typeof error === 'string' ? error : "There was an error processing your payment.",
                variant: "destructive",
              });
            }}
          />
        )}
      </div>
    </div>
  );
}