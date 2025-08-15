import { MessageCircle } from "lucide-react";

interface FloatingWhatsAppProps {
  businessNumber?: string;
  businessName?: string;
  className?: string;
}

export default function FloatingWhatsApp({ 
  businessNumber = "+254700000000",
  businessName = "Kamkunji Store",
  className = ""
}: FloatingWhatsAppProps) {
  
  const handleClick = () => {
    const message = `Hi! I'm interested in shopping at ${businessName}. Can you help me?`;
    const whatsappUrl = `https://wa.me/${businessNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <button
        onClick={handleClick}
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        title="Order via WhatsApp"
        aria-label="Order via WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
      
      {/* Tooltip */}
      <div className="absolute bottom-16 right-0 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Order via WhatsApp
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );
}
