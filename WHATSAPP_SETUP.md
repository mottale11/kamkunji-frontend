# WhatsApp Ordering System Setup

This document explains how to set up and customize the WhatsApp ordering system for Kamkunji Store.

## Overview

The WhatsApp ordering system allows customers to quickly order products via WhatsApp with pre-filled messages. It uses the `https://wa.me/<phone>?text=<pre-filled-message>` link format that opens WhatsApp on the device with product information and product URL.

## Features

- **Product-specific ordering**: Each product card has a WhatsApp button that generates a message with product details
- **Floating WhatsApp button**: A fixed button accessible from any page
- **WhatsApp ordering sections**: Prominent sections on products and home pages
- **Centralized configuration**: Easy to update business number and messages
- **Multiple variants**: Different component styles for different use cases

## Setup Instructions

### 1. Update Business Information

Edit `frontend/src/config/whatsapp.ts`:

```typescript
export const WHATSAPP_CONFIG = {
  // Replace with your actual WhatsApp business number
  // Format: country code + phone number (e.g., 254700000000 for Kenya)
  BUSINESS_NUMBER: "254700000000",
  
  // Update with your business name
  BUSINESS_NAME: "Kamkunji Store",
  
  // Customize default messages
  MESSAGES: {
    ORDER_INQUIRY: "Hi! I'm interested in ordering this product:",
    GENERAL_INQUIRY: "Hi! I'd like to place an order for products from Kamkunji Store. Can you help me with the ordering process?",
    QUESTIONS: "Hi! I have some questions about your products and services. Can you help me?",
  },
  
  // WhatsApp API base URL (usually don't change this)
  WA_ME_BASE_URL: "https://wa.me",
} as const;
```

### 2. Test the System

1. Navigate to the products page
2. Click the WhatsApp button on any product card
3. Verify that WhatsApp opens with the pre-filled message
4. Test the floating WhatsApp button from different pages

## Components

### WhatsAppOrder

A reusable component with three variants:

- **`default`**: Full-featured card with description and two buttons
- **`compact`**: Small inline component for tight spaces
- **`banner`**: Large banner-style component for prominent placement

```tsx
import WhatsAppOrder from "@/components/whatsapp-order";

// Default variant
<WhatsAppOrder />

// Compact variant
<WhatsAppOrder variant="compact" />

// Banner variant
<WhatsAppOrder variant="banner" />
```

### FloatingWhatsApp

A fixed floating button that appears on all pages:

```tsx
import FloatingWhatsApp from "@/components/floating-whatsapp";

// Automatically included in App.tsx
<FloatingWhatsApp />
```

### ProductCard Integration

Each product card includes a WhatsApp ordering button that generates product-specific messages.

## Message Format

The system generates messages in this format:

```
Hi! I'm interested in ordering this product:

*Product Title*
Price: KSh 25,000
Condition: Like New
Description: Product description...

Product URL: https://yourstore.com/products?id=123

Can you please provide more details about availability and delivery?
```

## Customization

### Adding New Message Types

1. Add new message to `WHATSAPP_CONFIG.MESSAGES`
2. Use `openWhatsApp()` helper function
3. Update components as needed

### Styling

All components use Tailwind CSS classes and can be customized by:
- Modifying the component files
- Passing custom `className` props
- Updating the configuration

### Business Logic

The system is designed to be lightweight and doesn't require server integration. All WhatsApp links are generated client-side using the `wa.me` API.

## Troubleshooting

### WhatsApp Not Opening

1. Verify the phone number format (country code + number)
2. Check if the device has WhatsApp installed
3. Test the `wa.me` link manually in a browser

### Message Not Pre-filling

1. Ensure the message is properly encoded
2. Check for special characters that might break the URL
3. Verify the message length (WhatsApp has limits)

### Component Not Rendering

1. Check import paths
2. Verify component is properly exported
3. Check browser console for errors

## Security Considerations

- Phone numbers are visible in the client-side code
- Messages are generated client-side
- No sensitive data is transmitted
- Consider using environment variables for production

## Future Enhancements

- Add analytics tracking for WhatsApp orders
- Implement message templates
- Add support for multiple business numbers
- Create admin panel for message customization
- Add order tracking integration
