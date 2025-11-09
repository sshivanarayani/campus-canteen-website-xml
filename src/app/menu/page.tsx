"use client"

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { menuItems, mealCombos, categories } from '@/lib/menuData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Plus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { isAuthenticated } = useAuth();
  const { addToCart, cart } = useCart();
  const router = useRouter();

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const handleAddToCart = (item: typeof menuItems[0]) => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      category: item.category,
      image: item.image,
    });
    toast.success('Added to cart!', {
      description: `${item.name} has been added to your cart.`,
    });
  };

  const handleAddCombo = (combo: typeof mealCombos[0]) => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    addToCart({
      id: combo.id,
      name: combo.name,
      price: combo.price,
      category: 'Combo',
      image: combo.image,
    });
    toast.success('Combo added to cart!', {
      description: `${combo.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold text-orange-500">CampusBite</h1>
          </Link>
          <Link href="/cart">
            <Button variant="outline" className="relative">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Cart
              {cart.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center">
                  {cart.length}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Our Menu</h2>
          <p className="text-muted-foreground">Delicious meals prepared fresh daily</p>
        </div>

        <Tabs defaultValue="menu" className="space-y-6">
          <TabsList>
            <TabsTrigger value="menu">Menu Items</TabsTrigger>
            <TabsTrigger value="combos">Meal Combos</TabsTrigger>
          </TabsList>

          <TabsContent value="menu" className="space-y-6">
            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 w-full">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute top-2 right-2">{item.category}</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{item.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-orange-500">₹{item.price}</span>
                    <Button onClick={() => handleAddToCart(item)} size="sm">
                      <Plus className="mr-1 h-4 w-4" /> Add
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="combos" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mealCombos.map((combo) => (
                <Card key={combo.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 w-full">
                    <Image
                      src={combo.image}
                      alt={combo.name}
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-500">Combo Deal</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle>{combo.name}</CardTitle>
                    <CardDescription>{combo.description}</CardDescription>
                    <div className="pt-2">
                      <p className="text-sm text-muted-foreground">Includes:</p>
                      <ul className="text-sm list-disc list-inside">
                        {combo.items.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-orange-500">₹{combo.price}</span>
                      <span className="text-sm line-through text-muted-foreground ml-2">
                        ₹{combo.originalPrice}
                      </span>
                    </div>
                    <Button onClick={() => handleAddCombo(combo)} size="sm">
                      <Plus className="mr-1 h-4 w-4" /> Add
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}