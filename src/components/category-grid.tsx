import { Link } from "wouter";

interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string;
  productCount?: number;
}

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  // Default category images and counts for visual appeal
  const defaultCategoryData = {
    Electronics: {
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      count: 124
    },
    Fashion: {
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      count: 89
    },
    Furniture: {
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      count: 56
    },
    Books: {
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      count: 203
    },
    Sports: {
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      count: 42
    },
    "Home & Garden": {
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      count: 78
    },
    "Mobile Phones": {
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      count: 67
    },
    "Laptops & Computers": {
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      count: 45
    },
    "Automotive": {
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      count: 34
    },
    "Baby & Kids": {
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      count: 89
    },
    "Health & Beauty": {
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      count: 56
    },
    "Jewelry & Watches": {
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      count: 23
    },
    "Tools & DIY": {
      image: "https://images.unsplash.com/photo-1581147033419-419a5c5e7b3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      count: 78
    },
    "Music & Instruments": {
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      count: 34
    },
    "Art & Collectibles": {
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      count: 45
    },
    "Pet Supplies": {
      image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      count: 28
    },
    "Office & Business": {
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      count: 67
    },
    "Gaming": {
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      count: 39
    },
    "Outdoor & Camping": {
      image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      count: 52
    }
  };

  const getCategoryData = (category: Category) => {
    const defaultData = (defaultCategoryData as any)[category.name];
    return {
      image: category.imageUrl || defaultData?.image || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      count: category.productCount || defaultData?.count || 0
    };
  };

  if (categories.length === 0) {
    return (
      <div className="grid-categories">
        {/* Show skeleton loading or empty state */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="category-card p-6 text-center cursor-pointer animate-pulse">
            <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-16 mx-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid-categories">
      {categories.map((category) => {
        const categoryData = getCategoryData(category);
        
        return (
          <Link key={category.id} href={`/products?category=${category.id}`}>
            <div className="category-card card-hover p-6 text-center cursor-pointer">
              <img
                src={categoryData.image}
                alt={`${category.name} category`}
                className="w-16 h-16 mx-auto mb-4 rounded-lg object-cover"
                loading="lazy"
              />
              <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
              <p className="text-sm text-gray-600">
                {categoryData.count} items
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
