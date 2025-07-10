import { Package, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-usps-dark text-white py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-xl font-semibold">
          <div className="bg-white text-usps-dark p-2 rounded-full">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-lg font-bold">USPS</span>
            <span className="block text-xs text-gray-300">Track Packages Anytime, Anywhere</span>
          </div>
        </Link>
        
        <nav className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" asChild>
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" asChild>
            <Link to="/track">
              <Search className="h-4 w-4 mr-2" />
              Track Package
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}