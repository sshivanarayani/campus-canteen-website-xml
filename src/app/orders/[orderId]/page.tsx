"use client"

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, ChefHat, Package } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface Order {
  id: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  paymentMethod: string;
  status: string;
  timestamp: string;
}

export default function OrderStatusPage() {
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const foundOrder = orders.find((o: Order) => o.id === params.orderId);
    setOrder(foundOrder);

    if (foundOrder) {
      // Show notification
      toast.success('Your order has been confirmed!', {
        description: 'The canteen will start preparing your food soon.',
      });
    }
  }, [params.orderId]);

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Order not found</p>
      </div>
    );
  }

  const statusSteps = [
    { label: 'Confirmed', icon: CheckCircle2, active: true },
    { label: 'Preparing', icon: ChefHat, active: false },
    { label: 'Ready', icon: Package, active: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <h1 className="text-2xl font-bold text-orange-500">CampusBite</h1>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Order Confirmed!</h2>
          <p className="text-muted-foreground">Order ID: {order.id}</p>
        </div>

        {/* Order Status Timeline */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              {statusSteps.map((step, index) => (
                <div key={step.label} className="flex flex-col items-center flex-1">
                  <div
                    className={`rounded-full p-3 mb-2 ${
                      step.active
                        ? 'bg-orange-500 text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <step.icon className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-medium">{step.label}</p>
                  {index < statusSteps.length - 1 && (
                    <div className="h-1 w-full bg-muted mt-2" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-orange-50 rounded-lg text-center">
              <Clock className="h-5 w-5 inline mr-2 text-orange-500" />
              <span className="text-sm">Estimated preparation time: 15-20 minutes</span>
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span className="font-semibold">₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total Paid</span>
                <span className="text-orange-500">₹{order.total}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>Payment Method</span>
                <span className="capitalize">{order.paymentMethod}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Link href="/profile" className="block">
            <Button variant="outline" className="w-full">
              View Order History
            </Button>
          </Link>
          <Link href="/menu" className="block">
            <Button className="w-full">Order More Food</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
