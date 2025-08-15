import React from 'react';
import { Switch, Route } from "wouter";
import FloatingWhatsApp from "@/components/floating-whatsapp";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import Products from "@/pages/products";
import Checkout from "@/pages/checkout";
import Contact from "@/pages/contact";
import Categories from "@/pages/categories";
import Sell from "@/pages/sell";
import HowItWorks from "@/pages/how-it-works";
import Payment from "@/pages/payment";
import PaymentSuccess from "@/pages/payment-success";
import Login from "@/pages/login";
import Register from "@/pages/register";

function Router() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path="/" component={Landing} />
      <Route path="/products" component={Products} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/contact" component={Contact} />
      <Route path="/categories" component={Categories} />
      <Route path="/sell" component={Sell} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/payment" component={Payment} />
      <Route path="/payment/success" component={PaymentSuccess} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/home" component={Home} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <div className="App">
      <Router />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
