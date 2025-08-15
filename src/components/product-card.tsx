import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, MessageCircle, Star, Heart } from "lucide-react";
import { openWhatsApp } from "@/config/whatsapp";
import { Product } from "@/services/productService";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();
  const [imageError, setImageError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const handleWhatsAppOrder = () => {
    const message = `I'm interested in this product: ${product.name} (${window.location.origin}/products/${product.id})`;
    openWhatsApp(message);
  };

  // Use the first image as the main image, or a placeholder if no images
  const mainImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : 'https://via.placeholder.com/300';

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
      {/* Product Image */}
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        <img
          src={imageError ? 'https://via.placeholder.com/300' : mainImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setImageError(true)}
        />
        
        {/* Wishlist Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
          aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
            strokeWidth={isLiked ? 2 : 1.5} 
          />
        </button>
        
        {/* Stock Status */}
        {product.stock === 0 && (
          <div className="absolute bottom-2 left-2">
            <Badge variant="destructive">Out of Stock</Badge>
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-gray-900 line-clamp-2 h-12">
            {product.name}
          </h3>
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-900">
              KSh {parseFloat(product.price.toString()).toLocaleString()}
            </p>
            {/* Original price display removed as it's not in the Product interface */}
          </div>
        </div>
        
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 h-10">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
            <span className="text-sm text-gray-500">
      {'4.5'} (24)
    </span>
          </div>
          <Badge variant="outline" className="capitalize">
            {product.category}
          </Badge>
        </div>
        
        <div className="mt-4 space-y-2">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={handleWhatsAppOrder}
          >
            <MessageCircle className="h-4 w-4" />
            Order via WhatsApp
          </Button>
          
          <Button 
            className="w-full"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>
    </div>
  );
}
