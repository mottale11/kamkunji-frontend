import { Button } from "@/components/ui/button";
import { MessageCircle, ShoppingBag, HelpCircle } from "lucide-react";
import { WHATSAPP_CONFIG, openWhatsApp } from "@/config/whatsapp";

interface WhatsAppOrderProps {
  variant?: "default" | "compact" | "banner";
  className?: string;
  businessNumber?: string;
  businessName?: string;
}

export default function WhatsAppOrder({ 
  variant = "default", 
  className = "",
  businessNumber = WHATSAPP_CONFIG.BUSINESS_NUMBER
}: WhatsAppOrderProps) {
  
  const defaultMessage = WHATSAPP_CONFIG.MESSAGES.GENERAL_INQUIRY;
  const questionMessage = WHATSAPP_CONFIG.MESSAGES.QUESTIONS;

  if (variant === "compact") {
    return (
      <div className={`bg-green-500 rounded-lg p-4 text-white ${className}`}>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold mb-1">Order via WhatsApp</h4>
            <p className="text-sm text-green-100">Quick ordering & support</p>
          </div>
          <Button
            onClick={() => openWhatsApp(defaultMessage, businessNumber)}
            size="sm"
            className="bg-white text-green-600 hover:bg-green-50"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Chat Now
          </Button>
        </div>
      </div>
    );
  }

  if (variant === "banner") {
    return (
      <div className={`bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white ${className}`}>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Order via WhatsApp</h3>
            <p className="text-green-100">
              Get instant support and place orders directly through WhatsApp. 
              Our team is available to help you with product details, pricing, and delivery.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => openWhatsApp(defaultMessage, businessNumber)}
              className="bg-white text-green-600 hover:bg-green-50 font-semibold px-6 py-3"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Start WhatsApp Chat
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-600 font-semibold px-6 py-3"
              onClick={() => openWhatsApp(questionMessage, businessNumber)}
            >
              <HelpCircle className="w-5 h-5 mr-2" />
              Ask Questions
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 shadow-sm ${className}`}>
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Order via WhatsApp</h3>
        <p className="text-gray-600">
          Get instant support and place orders directly through WhatsApp. 
          Our team is available to help you with product details, pricing, and delivery.
        </p>
      </div>
      
      <div className="space-y-3">
        <Button
          onClick={() => openWhatsApp(defaultMessage, businessNumber)}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3"
        >
          <ShoppingBag className="w-5 h-5 mr-2" />
          Place Order via WhatsApp
        </Button>
        
        <Button
          onClick={() => openWhatsApp(questionMessage, businessNumber)}
          variant="outline"
          className="w-full border-green-500 text-green-600 hover:bg-green-50 font-semibold py-3"
        >
          <HelpCircle className="w-5 h-5 mr-2" />
          Ask Questions
        </Button>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Available 24/7 for your convenience
        </p>
      </div>
    </div>
  );
}
