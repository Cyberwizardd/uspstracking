import { Mail, Truck, Clock, MapPin, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleQuickTrack = () => {
    if (trackingNumber === "ES789645123US") {
      window.location.href = "/track";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-usps-dark to-slate-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="inline-flex p-4 bg-white/10 rounded-full mb-6">
              <Mail className="h-12 w-12" />
            </div>
            <h1 className="text-5xl font-bold mb-4">
              Track Packages Anytime, Anywhere
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Your trusted United States Postal Service - Fast, reliable package tracking
            </p>
          </div>
          
          <div className="max-w-md mx-auto bg-white rounded-lg p-6">
            <h3 className="text-usps-dark text-lg font-semibold mb-4">Quick Track</h3>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter tracking number"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="flex-1 text-black"
              />
              <Button onClick={handleQuickTrack} className="bg-usps-blue hover:bg-usps-blue/90">
                Track
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive shipping solutions tailored to meet your needs across the United States
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="bg-usps-blue/10 p-3 rounded-full w-fit mx-auto mb-4">
                  <Truck className="h-6 w-6 text-usps-blue" />
                </div>
                <h3 className="font-semibold mb-2">Express Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Fast delivery across the US with guaranteed time slots and real-time tracking.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="bg-usps-blue/10 p-3 rounded-full w-fit mx-auto mb-4">
                  <Shield className="h-6 w-6 text-usps-blue" />
                </div>
                <h3 className="font-semibold mb-2">Freight Services</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive freight solutions for businesses of all sizes across the nation.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="bg-usps-blue/10 p-3 rounded-full w-fit mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-usps-blue" />
                </div>
                <h3 className="font-semibold mb-2">Real-time Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Track your packages every step of the way with our advanced tracking system.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="bg-usps-blue/10 p-3 rounded-full w-fit mx-auto mb-4">
                  <Clock className="h-6 w-6 text-usps-blue" />
                </div>
                <h3 className="font-semibold mb-2">Door-to-Door</h3>
                <p className="text-sm text-muted-foreground">
                  Complete door-to-door service with pickup and delivery at your convenience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About USPS</h2>
              <p className="text-lg text-muted-foreground mb-6">
                The United States Postal Service is your trusted partner for reliable shipping 
                solutions nationwide. We provide comprehensive logistics services with real-time 
                tracking capabilities.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Our extensive network ensures fast, secure, and cost-effective delivery solutions 
                for businesses and individuals across the United States.
              </p>
              <Link to="/track">
                <Button size="lg" className="bg-usps-blue hover:bg-usps-blue/90">
                  Track Your Package
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6">
                <div className="text-4xl font-bold text-usps-blue mb-2">50</div>
                <div className="text-sm text-muted-foreground">States</div>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl font-bold text-usps-blue mb-2">100M+</div>
                <div className="text-sm text-muted-foreground">Packages</div>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl font-bold text-usps-blue mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
              <div className="text-center p-6">
                <div className="text-4xl font-bold text-usps-blue mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">Delivery Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-usps-blue text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Nationwide Coverage</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Comprehensive shipping network across all United States
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/track">
              <Button variant="secondary" size="lg">
                <Users className="h-4 w-4 mr-2" />
                Track Package
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
