"use client"

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UtensilsCrossed, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const { cart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      {/* College Header */}
      <div className="bg-orange-500 text-white py-2">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-sm md:text-base font-bold tracking-wide">MADRAS ENGINEERING COLLEGE</h2>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-orange-500 p-2 rounded-lg">
              <UtensilsCrossed className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-orange-500">CampusBite</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Canteen Ordering System</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/menu">
              <Button variant="ghost">Menu</Button>
            </Link>
            {isAuthenticated && (
              <>
                <Link href="/cart">
                  <Button variant="ghost" className="relative">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Cart
                    {cart.length > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                        {cart.length}
                      </Badge>
                    )}
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="ghost">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                </Link>
              </>
            )}
            {!isAuthenticated && (
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t">
            <Link href="/menu" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Menu
              </Button>
            </Link>
            {isAuthenticated && (
              <>
                <Link href="/cart" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start relative">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Cart
                    {cart.length > 0 && (
                      <Badge className="ml-2">
                        {cart.length}
                      </Badge>
                    )}
                  </Button>
                </Link>
                <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                </Link>
              </>
            )}
            {!isAuthenticated && (
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">Login</Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}