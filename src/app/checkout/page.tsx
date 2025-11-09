"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { CreditCard, Wallet, Banknote, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const { cart, getTotal, clearCart } = useCart();
  const { student } = useAuth();
  const router = useRouter();

  const total = Math.round(getTotal() * 1.05);

  const handlePlaceOrder = () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const orderId = `ORD${Date.now()}`;
      const newOrder = {
        id: orderId,
        items: cart,
        total,
        paymentMethod,
        status: 'confirmed',
        timestamp: new Date().toISOString(),
        studentId: student?.id,
      };

      // Save to localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(newOrder);
      localStorage.setItem('orders', JSON.stringify(orders));

      clearCart();
      setIsProcessing(false);
      
      // Enhanced success notification
      toast.success('Order Placed Successfully! 🎉', {
        description: `Your order #${orderId.slice(-6)} has been confirmed. The canteen will start preparing your food soon.`,
        duration: 5000,
      });
      
      router.push(`/orders/${orderId}`);
    }, 2000);
  };

  if (cart.length === 0) {
    router.push('/menu');
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

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <h2 className="text-3xl font-bold mb-8">Checkout</h2>

        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-semibold">₹{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{getTotal()}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>GST (5%)</span>
                  <span>₹{Math.round(getTotal() * 0.05)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-orange-500">₹{total}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                      <CreditCard className="h-5 w-5" />
                      <div>
                        <p className="font-semibold">Debit/Credit Card</p>
                        <p className="text-sm text-muted-foreground">Pay securely with your card</p>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Wallet className="h-5 w-5" />
                      <div>
                        <p className="font-semibold">UPI</p>
                        <p className="text-sm text-muted-foreground">Pay using UPI apps</p>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Banknote className="h-5 w-5" />
                      <div>
                        <p className="font-semibold">Cash on Pickup</p>
                        <p className="text-sm text-muted-foreground">Pay when you collect your order</p>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Student Info */}
          <Card>
            <CardHeader>
              <CardTitle>Student Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-semibold">{student?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ID:</span>
                  <span className="font-semibold">{student?.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-semibold">{student?.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            className="w-full" 
            size="lg"
            onClick={handlePlaceOrder}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : `Place Order - ₹${total}`}
          </Button>
        </div>
      </main>
    </div>
  );
}