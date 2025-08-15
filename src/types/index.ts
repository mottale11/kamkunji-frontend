// User types
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  phone?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

// Category types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
}

// Product types
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  condition: string;
  stock: number;
  categoryId: string;
  images: string[];
  isFeatured: boolean;
  isActive: boolean;
  rating: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

// Order types
export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  total: number;
  status: string;
  paymentMethod?: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
}

// Order item types
export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  pricePerItem: number;
  total: number;
}

// Cart item types
export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  product?: Product;
}

// Item submission types
export interface ItemSubmission {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  condition: string;
  askingPrice: number;
  images: string[];
  submitterName: string;
  submitterEmail: string;
  submitterPhone: string;
  status: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

// Admin user types
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}
