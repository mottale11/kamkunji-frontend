import { Link } from "wouter";
import { Phone, Mail, MessageCircle, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Company Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-primary">
              Kamkunji Ndogo
            </h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Your trusted marketplace for second-hand items. Quality goods at unbeatable prices.
            </p>
            
            {/* Social Media Links */}
            <div className="flex justify-center sm:justify-start gap-3 mt-4">
              <a href="#" className="p-2 bg-gray-700 hover:bg-primary rounded-full transition-colors duration-200">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-gray-700 hover:bg-primary rounded-full transition-colors duration-200">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-gray-700 hover:bg-primary rounded-full transition-colors duration-200">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Quick Links</h4>
            <ul className="space-y-1 md:space-y-2 text-gray-400">
              <li>
                <Link href="/products">
                  <span className="hover:text-white transition cursor-pointer text-sm md:text-base">
                    Products
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/sell">
                  <span className="hover:text-white transition cursor-pointer text-sm md:text-base">
                    Sell Your Item
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/how-it-works">
                  <span className="hover:text-white transition cursor-pointer text-sm md:text-base">
                    How It Works
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="hover:text-white transition cursor-pointer text-sm md:text-base">
                    Contact Us
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Categories</h4>
            <ul className="space-y-1 md:space-y-2 text-gray-400">
              <li>
                <Link href="/products?category=electronics">
                  <span className="hover:text-white transition cursor-pointer text-sm md:text-base">
                    Electronics
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/products?category=fashion">
                  <span className="hover:text-white transition cursor-pointer text-sm md:text-base">
                    Fashion
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/products?category=furniture">
                  <span className="hover:text-white transition cursor-pointer text-sm md:text-base">
                    Furniture
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/products?category=books">
                  <span className="hover:text-white transition cursor-pointer text-sm md:text-base">
                    Books
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Contact Info</h4>
            <ul className="space-y-2 md:space-y-3 text-gray-400">
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm md:text-base">+254 700 123456</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm md:text-base">info@kamkunjindogo.com</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <MessageCircle className="w-4 h-4 text-primary" />
                <span className="text-sm md:text-base">WhatsApp Support</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm md:text-base">Nairobi, Kenya</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-6 md:mt-8 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; 2024 Kamkunji Ndogo. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
