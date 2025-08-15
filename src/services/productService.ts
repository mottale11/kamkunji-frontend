import apiClient from '@/lib/api';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  status: 'active' | 'inactive' | 'deleted';
  images?: string[];
  created_at: string;
  updated_at: string;
}

export interface ProductFilters {
  category?: string;
  status?: string;
  search?: string;
}

const productService = {
  // Get all products with optional filtering
  async getProducts(filters?: ProductFilters): Promise<Product[]> {
    try {
      const response = await apiClient.get<Product[]>('/products', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get single product by ID
  async getProductById(id: string): Promise<Product> {
    try {
      const response = await apiClient.get<Product>(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },

  // Create a new product
  async createProduct(productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
    try {
      const response = await apiClient.post<Product>('/products', productData);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Update an existing product
  async updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
    try {
      const response = await apiClient.put<Product>(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw error;
    }
  },

  // Delete a product (soft delete)
  async deleteProduct(id: string): Promise<void> {
    try {
      await apiClient.delete(`/products/${id}`);
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      throw error;
    }
  },
};

export default productService;
