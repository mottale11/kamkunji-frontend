import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import ShoppingCart from "@/components/shopping-cart";
import { ShoppingCart as CartIcon, Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [showCart, setShowCart] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { data: cartItems = [] } = useQuery({
    queryKey: ["/api/cart"],
    enabled: isAuthenticated,
  });

  const cartItemCount = (cartItems as any[]).reduce((sum: number, item: any) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <h1 className="text-xl font-bold text-primary cursor-pointer">
                  Kamkunji Ndogo
                </h1>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/">
                <span className="text-gray-700 hover:text-primary transition cursor-pointer">
                  Home
                </span>
              </Link>
              <Link href="/products">
                <span className="text-gray-700 hover:text-primary transition cursor-pointer">
                  Products
                </span>
              </Link>
              <Link href="/categories">
                <span className="text-gray-700 hover:text-primary transition cursor-pointer">
                  Categories
                </span>
              </Link>
              <Link href="/sell">
                <span className="text-primary font-medium hover:text-primary/80 transition cursor-pointer">
                  Sell Item
                </span>
              </Link>
              <Link href="/contact">
                <span className="text-gray-700 hover:text-primary transition cursor-pointer">
                  Contact
                </span>
              </Link>
            </div>
            
            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              {isAuthenticated && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCart(true)}
                  className="relative"
                >
                  <CartIcon className="w-5 h-5" />
                  {cartItemCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
              )}
              
              {/* Auth */}
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-2">
                    {user?.profileImageUrl && (
                      <img
                        src={user.profileImageUrl}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    )}
                    <span className="text-sm text-gray-700">
                      {user?.firstName || "User"}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button
                      className="bg-primary hover:bg-primary/90 text-white"
                      size="sm"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
              
              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-2">
              <Link href="/">
                <div className="block py-2 text-gray-700 cursor-pointer">Home</div>
              </Link>
              <Link href="/products">
                <div className="block py-2 text-gray-700 cursor-pointer">Products</div>
              </Link>
              <Link href="/categories">
                <div className="block py-2 text-gray-700 cursor-pointer">Categories</div>
              </Link>
              <Link href="/sell">
                <div className="block py-2 text-primary font-medium cursor-pointer">Sell Item</div>
              </Link>
              <Link href="/contact">
                <div className="block py-2 text-gray-700 cursor-pointer">Contact</div>
              </Link>
              {!isAuthenticated && (
                <>
                  <Link href="/login">
                    <div className="block py-2 text-gray-700 cursor-pointer">Login</div>
                  </Link>
                  <Link href="/register">
                    <div className="block py-2 text-primary font-medium cursor-pointer">Sign Up</div>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Shopping Cart Modal */}
      {showCart && (
        <ShoppingCart onClose={() => setShowCart(false)} />
      )}
    </>
  );
}
