import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SellItemForm from "@/components/sell-item-form";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Plus, DollarSign, Users, Clock } from "lucide-react";
import { Link } from "wouter";

export default function Sell() {
  const { isAuthenticated } = useAuth();
  const [showForm, setShowForm] = useState(false);

  const benefits = [
    {
      icon: DollarSign,
      title: "Earn Money",
      description: "Turn your unused items into cash quickly and easily"
    },
    {
      icon: Users,
      title: "Reach Buyers",
      description: "Connect with thousands of potential buyers in your area"
    },
    {
      icon: Clock,
      title: "Quick Process",
      description: "List your items in minutes with our simple form"
    }
  ];

  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <Button
              variant="outline"
              onClick={() => setShowForm(false)}
              className="mb-4"
            >
              ← Back to Sell Page
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Submit Your Item</h1>
            <p className="text-gray-600 mt-2">
              Fill out the form below to list your item for sale
            </p>
          </div>
          <SellItemForm onClose={() => setShowForm(false)} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="gradient-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Sell Your Items
          </h1>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Turn your pre-loved items into cash. Join thousands of sellers on Kamkunji Ndogo marketplace.
          </p>
          
          {isAuthenticated ? (
            <Button
              onClick={() => setShowForm(true)}
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3"
            >
              <Plus className="w-5 h-5 mr-2" />
              Start Selling Now
            </Button>
          ) : (
            <div className="space-y-4">
              <p className="text-lg opacity-90">Sign up to start selling your items</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3"
                  >
                    Sign Up to Sell
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Benefits Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Sell With Us?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kamkunji Ndogo makes it easy to sell your items and connect with buyers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <Card className="mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">How It Works</CardTitle>
            <CardDescription>Simple steps to start selling</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  1
                </div>
                <h4 className="font-semibold mb-2">Submit Your Item</h4>
                <p className="text-gray-600 text-sm">
                  Fill out our simple form with item details and photos
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  2
                </div>
                <h4 className="font-semibold mb-2">Review & Approval</h4>
                <p className="text-gray-600 text-sm">
                  Our team reviews your submission and approves it for listing
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  3
                </div>
                <h4 className="font-semibold mb-2">Start Selling</h4>
                <p className="text-gray-600 text-sm">
                  Your item goes live and buyers can contact you directly
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center bg-gray-100 rounded-lg p-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Selling?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join our community of sellers and turn your unused items into cash today.
          </p>
          
          {isAuthenticated ? (
            <Button
              onClick={() => setShowForm(true)}
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-5 h-5 mr-2" />
              List Your First Item
            </Button>
          ) : (
            <Link href="/register">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                Sign Up to Start Selling
              </Button>
            </Link>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}