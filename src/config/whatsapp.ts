// WhatsApp Configuration
export const WHATSAPP_CONFIG = {
  // Business WhatsApp number (replace with your actual number)
  // Format: country code + phone number (e.g., 254700000000 for Kenya)
  BUSINESS_NUMBER: "254111882253",
  
  // Business name
  BUSINESS_NAME: "Kamkunji Store",
  
  // Default messages
  MESSAGES: {
    ORDER_INQUIRY: "Hi! I'm interested in ordering this product:",
    GENERAL_INQUIRY: "Hi! I'd like to place an order for products from Kamkunji Store. Can you help me with the ordering process?",
    QUESTIONS: "Hi! I have some questions about your products and services. Can you help me?",
  },
  
  // WhatsApp API base URL
  WA_ME_BASE_URL: "https://wa.me",
} as const;

// Helper function to generate WhatsApp URL
export const generateWhatsAppUrl = (message: string, phoneNumber?: string): string => {
  const number = phoneNumber || WHATSAPP_CONFIG.BUSINESS_NUMBER;
  const encodedMessage = encodeURIComponent(message);
  return `${WHATSAPP_CONFIG.WA_ME_BASE_URL}/${number}?text=${encodedMessage}`;
};

// Helper function to open WhatsApp
export const openWhatsApp = (message: string, phoneNumber?: string): void => {
  const url = generateWhatsAppUrl(message, phoneNumber);
  window.open(url, "_blank");
};
