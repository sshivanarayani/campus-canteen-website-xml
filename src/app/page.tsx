"use client"

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UtensilsCrossed, Clock, Star, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 to-red-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="flex justify-center mb-6">
              <div className="bg-orange-500 p-6 rounded-full">
                <UtensilsCrossed className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
              Welcome to <span className="text-orange-500">CampusBite</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Madras Engineering College's official canteen ordering system. 
              Order your favorite meals and skip the queue!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              {isAuthenticated ? (
                <>
                  <Link href="/menu">
                    <Button size="lg" className="text-lg px-8">
                      Browse Menu
                    </Button>
                  </Link>
                  <Link href="/profile">
                    <Button size="lg" variant="outline" className="text-lg px-8">
                      My Profile
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button size="lg" className="text-lg px-8">
                      Login to Order
                    </Button>
                  </Link>
                  <Link href="/menu">
                    <Button size="lg" variant="outline" className="text-lg px-8">
                      View Menu
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose CampusBite?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="bg-orange-100 p-4 rounded-full">
                    <Clock className="h-8 w-8 text-orange-500" />
                  </div>
                </div>
                <CardTitle>Quick & Easy</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Order in advance and skip the long queues. Get your food ready when you arrive!
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="bg-orange-100 p-4 rounded-full">
                    <Star className="h-8 w-8 text-orange-500" />
                  </div>
                </div>
                <CardTitle>Fresh & Tasty</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All meals prepared fresh daily with quality ingredients and authentic flavors.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="bg-orange-100 p-4 rounded-full">
                    <ShieldCheck className="h-8 w-8 text-orange-500" />
                  </div>
                </div>
                <CardTitle>Student Verified</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Secure login with your student ID. Track orders and manage your preferences.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Items Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Items</h2>
            <p className="text-muted-foreground">Check out what students love most!</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { name: 'Masala Dosa', price: 50, image: 'https://images.unsplash.com/photo-1694241506659-c88a4c57e184?w=400&h=300&fit=crop' },
              { name: 'Chicken Biryani', price: 150, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop' },
              { name: 'Paneer Butter Masala', price: 120, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop' },
              { name: 'Filter Coffee', price: 20, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop' },
            ].map((item, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-40 w-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <CardDescription className="text-xl font-bold text-orange-500">
                    ₹{item.price}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/menu">
              <Button size="lg">View Full Menu</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Student Feedback Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Student Feedback</h2>
            <p className="text-muted-foreground">See what MEC students are saying about CampusBite!</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Rahul Kumar",
                department: "CSE - Final Year",
                rating: 5,
                feedback: "CampusBite has made my life so much easier! No more waiting in long queues during lunch breaks. The food is always fresh and ready on time.",
                date: "Nov 5, 2024"
              },
              {
                name: "Priya Sharma",
                department: "ECE - Third Year",
                rating: 5,
                feedback: "Love the variety of menu options! The breakfast combos are perfect for morning classes. Highly recommend the Masala Dosa!",
                date: "Nov 3, 2024"
              },
              {
                name: "Arun Vijay",
                department: "Mechanical - Second Year",
                rating: 4,
                feedback: "Great service and reasonable prices. The notification system is really helpful - I know exactly when my order is ready.",
                date: "Nov 1, 2024"
              }
            ].map((review, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <CardDescription className="text-sm">{review.department}</CardDescription>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? 'fill-orange-500 text-orange-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-3">"{review.feedback}"</p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          {isAuthenticated && (
            <div className="text-center mt-8">
              <Link href="/profile">
                <Button size="lg" variant="outline">
                  <Star className="mr-2 h-4 w-4" />
                  Leave Your Feedback
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of students enjoying convenient canteen ordering
          </p>
          {!isAuthenticated && (
            <Link href="/login">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Get Started Now
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-background">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 CampusBite - Madras Engineering College Canteen</p>
          <p className="text-sm mt-2">Made with ❤️ for MEC Students</p>
        </div>
      </footer>
    </div>
  );
}