import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import ProductCard from "@/components/product-card";
import WhatsAppOrder from "@/components/whatsapp-order";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Skeleton } from "@/components/ui/skeleton";
import productService, { Product, ProductFilters } from "@/services/productService";

interface Category {
  id: string;
  name: string;
}

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  // Get URL parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get("search");
    const category = params.get("category");
    
    if (search) setSearchQuery(search);
    if (category) setSelectedCategory(category);
  }, []);

  // Fetch products with filters
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", { search: searchQuery, category: selectedCategory }],
    queryFn: async () => {
      const filters: ProductFilters = {};
      if (searchQuery) filters.search = searchQuery;
      if (selectedCategory && selectedCategory !== "all") filters.category = selectedCategory;
      
      return await productService.getProducts(filters);
    },
  });

  // Mock categories - replace with actual API call if needed
  const categories: Category[] = [
    { id: "1", name: "Electronics" },
    { id: "2", name: "Clothing" },
    { id: "3", name: "Furniture" },
    { id: "4", name: "Books" },
  ];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.append("search", searchQuery);
    if (selectedCategory && selectedCategory !== "all") params.append("category", selectedCategory);
    
    const newUrl = `/products${params.toString() ? `?${params.toString()}` : ""}`;
    window.history.pushState({}, "", newUrl);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setPriceRange("all");
    window.history.pushState({}, "", "/products");
  };

  // Filter products by price range
  const filteredProducts = products.filter((product: Product) => {
    if (!priceRange || priceRange === "all") return true;
    
    const price = parseFloat(product.price.toString());
    switch (priceRange) {
      case "0-10000":
        return price <= 10000;
      case "10000-50000":
        return price > 10000 && price <= 50000;
      case "50000-100000":
        return price > 50000 && price <= 100000;
      case "100000+":
        return price > 100000;
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Products</h1>
          
          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="0-10000">Under KSh 10,000</SelectItem>
                  <SelectItem value="10000-50000">KSh 10,000 - 50,000</SelectItem>
                  <SelectItem value="50000-100000">KSh 50,000 - 100,000</SelectItem>
                  <SelectItem value="100000+">Over KSh 100,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button onClick={handleSearch} className="flex-1 md:flex-none">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            {isLoading ? (
              "Loading products..."
            ) : (
              `Showing ${filteredProducts.length} product${filteredProducts.length !== 1 ? "s" : ""}`
            )}
          </p>
        </div>

        {/* WhatsApp Ordering Section */}
        <WhatsAppOrder />

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-4">
                <Skeleton className="w-full h-48 mb-4" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or browse our categories.
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
