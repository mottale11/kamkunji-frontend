import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Search, ShoppingCart, CreditCard, Package, MessageCircle, Shield } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function HowItWorks() {
  const buyingSteps = [
    {
      icon: Search,
      title: "Browse & Search",
      description: "Explore our wide selection of second-hand items or use our search to find exactly what you need."
    },
    {
      icon: MessageCircle,
      title: "Contact Seller",
      description: "Get in touch with sellers via WhatsApp to ask questions and negotiate prices."
    },
    {
      icon: ShoppingCart,
      title: "Add to Cart",
      description: "Add items to your cart and proceed to checkout when you're ready to buy."
    },
    {
      icon: CreditCard,
      title: "Secure Payment",
      description: "Pay safely using M-Pesa or card payment. Your payment is protected."
    },
    {
      icon: Package,
      title: "Receive Item",
      description: "Coordinate with the seller for pickup or delivery of your purchased item."
    }
  ];

  const sellingSteps = [
    {
      icon: Package,
      title: "Submit Your Item",
      description: "Fill out our simple form with photos and details about your item."
    },
    {
      icon: Shield,
      title: "Review Process",
      description: "Our team reviews your submission to ensure quality and authenticity."
    },
    {
      icon: Search,
      title: "Item Goes Live",
      description: "Your approved item appears in our marketplace for buyers to discover."
    },
    {
      icon: MessageCircle,
      title: "Connect with Buyers",
      description: "Interested buyers will contact you directly via WhatsApp."
    },
    {
      icon: CreditCard,
      title: "Complete Sale",
      description: "Coordinate payment and delivery with your buyer to complete the sale."
    }
  ];

  const features = [
    {
      title: "Quality Assurance",
      description: "All items are reviewed by our team to ensure quality and authenticity."
    },
    {
      title: "Secure Payments",
      description: "Protected transactions with M-Pesa and card payment options."
    },
    {
      title: "WhatsApp Integration",
      description: "Easy communication between buyers and sellers via WhatsApp."
    },
    {
      title: "Wide Selection",
      description: "From electronics to fashion, find everything you need in one place."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="gradient-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            How It Works
          </h1>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Learn how Kamkunji Ndogo makes buying and selling second-hand items simple, safe, and convenient.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Buying Process */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-800">For Buyers</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Buy</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Finding and purchasing quality second-hand items is easy with our streamlined process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {buyingSteps.map((step, index) => (
              <Card key={index} className="relative">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {index + 1}
                  </div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </CardContent>
                
                {index < buyingSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30"></div>
                )}
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/products">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Start Shopping Now
              </Button>
            </Link>
          </div>
        </div>

        {/* Selling Process */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-800">For Sellers</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Sell</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Turn your unused items into cash with our simple selling process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {sellingSteps.map((step, index) => (
              <Card key={index} className="relative">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {index + 1}
                  </div>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </CardContent>
                
                {index < sellingSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-blue-600/30"></div>
                )}
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/sell">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Selling Today
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Kamkunji Ndogo?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide a safe, convenient platform for buying and selling second-hand items.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of users who are already buying and selling on Kamkunji Ndogo marketplace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" variant="secondary">
                  Browse Products
                </Button>
              </Link>
              <Link href="/sell">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                  Start Selling
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}