"use client"

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { User, LogOut, Star } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface Order {
  id: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  timestamp: string;
  status: string;
}

export default function ProfilePage() {
  const { student, logout, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const studentOrders = storedOrders.filter((o: Order) => o.studentId === student?.id);
    setOrders(studentOrders);
  }, [isAuthenticated, router, student?.id]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleSubmitFeedback = () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    const feedbackData = {
      rating,
      feedback,
      studentId: student?.id,
      timestamp: new Date().toISOString(),
    };

    const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    feedbacks.push(feedbackData);
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

    toast.success('Thank you for your feedback!');
    setRating(0);
    setFeedback('');
  };

  if (!isAuthenticated || !student) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <h1 className="text-2xl font-bold text-orange-500">CampusBite</h1>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">My Profile</h2>
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Order History</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Student Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-semibold">{student.name}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Student ID</span>
                    <span className="font-semibold">{student.id}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-semibold">{student.email}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Total Orders</span>
                    <span className="font-semibold">{orders.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View all your past orders</CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">No orders yet</p>
                    <Link href="/menu">
                      <Button>Start Ordering</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <p className="font-semibold">Order #{order.id}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(order.timestamp).toLocaleString()}
                              </p>
                            </div>
                            <Badge>{order.status}</Badge>
                          </div>
                          <div className="space-y-2 mb-4">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>
                                  {item.name} x {item.quantity}
                                </span>
                                <span>₹{item.price * item.quantity}</span>
                              </div>
                            ))}
                          </div>
                          <Separator className="my-2" />
                          <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span className="text-orange-500">₹{order.total}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>Share Your Feedback</CardTitle>
                <CardDescription>Help us improve your canteen experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Rate Your Experience</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= rating
                              ? 'fill-orange-500 text-orange-500'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback">Your Feedback</Label>
                  <Textarea
                    id="feedback"
                    placeholder="Tell us about your experience..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={5}
                  />
                </div>

                <Button onClick={handleSubmitFeedback} className="w-full">
                  Submit Feedback
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
