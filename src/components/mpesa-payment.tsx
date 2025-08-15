import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Smartphone, Loader2, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import LipiaPaymentService from "@/lib/lipiaPayment";

interface MpesaPaymentProps {
  amount: number;
  orderId: string;
  onPaymentSuccess: (paymentData: any) => void;
  onPaymentError: (error: string) => void;
  userPhone?: string;
}

export default function MpesaPayment({ 
  amount, 
  orderId, 
  onPaymentSuccess, 
  onPaymentError,
  userPhone = ""
}: MpesaPaymentProps) {
  const { toast } = useToast();
  const [phone, setPhone] = useState(userPhone);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    setErrorMessage('');
    setPaymentStatus('idle');
  };

  const validateForm = (): boolean => {
    if (!phone.trim()) {
      setErrorMessage('Phone number is required');
      return false;
    }

    if (!LipiaPaymentService.validatePhone(phone)) {
      setErrorMessage('Please enter a valid phone number starting with 07');
      return false;
    }

    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('processing');
    setErrorMessage('');

    try {
      // Format phone number
      const formattedPhone = LipiaPaymentService.formatPhone(phone);
      
      // Initiate M-Pesa STK push
      const response = await LipiaPaymentService.initiatePayment(formattedPhone, amount);
      
      setPaymentDetails(response.data);
      setPaymentStatus('success');
      
      toast({
        title: "M-Pesa STK Push Sent! 📱",
        description: `Check your phone for the M-Pesa prompt. Reference: ${response.data.reference}`,
      });

      // Call success callback
      onPaymentSuccess({
        ...response.data,
        orderId,
        amount,
        phone: formattedPhone,
        timestamp: new Date().toISOString(),
      });

    } catch (error: any) {
      console.error('M-Pesa payment failed:', error);
      
      const userFriendlyError = LipiaPaymentService.getErrorMessage(error.message);
      setErrorMessage(userFriendlyError);
      setPaymentStatus('error');
      
      toast({
        title: "Payment Failed ❌",
        description: userFriendlyError,
        variant: "destructive",
      });

      onPaymentError(userFriendlyError);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetPayment = () => {
    setPaymentStatus('idle');
    setPaymentDetails(null);
    setErrorMessage('');
  };

  if (paymentStatus === 'success') {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <CardTitle className="text-green-800">STK Push Sent Successfully!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-green-700">
              Check your phone for the M-Pesa prompt to complete payment.
            </p>
            <div className="bg-white p-3 rounded-lg border border-green-200">
              <p className="text-sm text-gray-600">Reference Number</p>
              <p className="font-mono font-bold text-green-800">{paymentDetails?.reference}</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-green-200">
              <p className="text-sm text-gray-600">Amount</p>
              <p className="font-bold text-green-800">KSh {amount.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={resetPayment} 
              variant="outline" 
              className="flex-1"
            >
              Try Again
            </Button>
            <Button 
              onClick={() => window.location.href = '/payment-success'} 
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              View Order
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (paymentStatus === 'error') {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <XCircle className="w-16 h-16 text-red-600" />
          </div>
          <CardTitle className="text-red-800">Payment Failed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-red-700 mb-4">{errorMessage}</p>
            <Button onClick={resetPayment} className="w-full">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Smartphone className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <CardTitle>M-Pesa Payment</CardTitle>
            <p className="text-sm text-gray-600">
              Pay with M-Pesa via STK push
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Payment Summary */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Order Total:</span>
            <span className="font-bold text-lg">KSh {amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-600">Order ID:</span>
            <span className="font-mono text-sm">{orderId}</span>
          </div>
        </div>

        {/* Phone Number Input */}
        <div className="space-y-2">
          <Label htmlFor="phone">M-Pesa Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="07XXXXXXXX"
            value={phone}
            onChange={handlePhoneChange}
            className={errorMessage ? 'border-red-500' : ''}
            disabled={isProcessing}
          />
          {errorMessage && (
            <div className="flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errorMessage}
            </div>
          )}
          <p className="text-xs text-gray-500">
            Enter the phone number registered with M-Pesa
          </p>
        </div>

        {/* Payment Instructions */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-800 mb-2">How it works:</h4>
          <ol className="text-sm text-blue-700 space-y-1">
            <li>1. Enter your M-Pesa phone number</li>
            <li>2. Click "Pay with M-Pesa"</li>
            <li>3. Check your phone for the STK push</li>
            <li>4. Enter your M-Pesa PIN to complete payment</li>
          </ol>
        </div>

        {/* Payment Button */}
        <Button
          onClick={handlePayment}
          disabled={isProcessing || !phone.trim()}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          size="lg"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending STK Push...
            </>
          ) : (
            <>
              <Smartphone className="w-4 h-4 mr-2" />
              Pay with M-Pesa - KSh {amount.toFixed(2)}
            </>
          )}
        </Button>

        {/* Security Note */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            🔒 Your payment is secure and processed by Lipia Online
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
