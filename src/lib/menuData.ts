export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
}

export interface MealCombo {
  id: string;
  name: string;
  description: string;
  items: string[];
  price: number;
  originalPrice: number;
  image: string;
}

export const menuItems: MenuItem[] = [
  // Breakfast
  {
    id: 'b1',
    name: 'Idli Sambar',
    description: 'Soft idlis served with hot sambar and chutneys',
    price: 40,
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: 'b2',
    name: 'Masala Dosa',
    description: 'Crispy dosa with spiced potato filling',
    price: 50,
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1694241506659-c88a4c57e184?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: 'b3',
    name: 'Poha',
    description: 'Flattened rice with peanuts and spices',
    price: 30,
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: 'b4',
    name: 'Upma',
    description: 'Semolina porridge with vegetables',
    price: 35,
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop',
    available: true,
  },

  // Veg
  {
    id: 'v1',
    name: 'Paneer Butter Masala',
    description: 'Cottage cheese in rich tomato gravy',
    price: 120,
    category: 'Veg',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: 'v2',
    name: 'Chole Bhature',
    description: 'Chickpea curry with fried bread',
    price: 80,
    category: 'Veg',
    image: 'https://images.unsplash.com/photo-1626132647523-66f71f97d07c?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: 'v3',
    name: 'Veg Biryani',
    description: 'Fragrant rice with mixed vegetables',
    price: 100,
    category: 'Veg',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
    available: true,
  },

  // Non-Veg
  {
    id: 'nv1',
    name: 'Chicken Biryani',
    description: 'Aromatic rice with tender chicken',
    price: 150,
    category: 'Non-Veg',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: 'nv2',
    name: 'Butter Chicken',
    description: 'Creamy chicken in tomato butter sauce',
    price: 140,
    category: 'Non-Veg',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: 'nv3',
    name: 'Chicken 65',
    description: 'Spicy fried chicken appetizer',
    price: 130,
    category: 'Non-Veg',
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: 'nv4',
    name: 'Fish Fry',
    description: 'Crispy fried fish with spices',
    price: 160,
    category: 'Non-Veg',
    image: 'https://images.unsplash.com/photo-1580959375944-2c85d862b53b?w=400&h=300&fit=crop',
    available: true,
  },

  // Dinner
  {
    id: 'd1',
    name: 'Roti with Curry',
    description: 'Whole wheat bread with mixed vegetable curry',
    price: 60,
    category: 'Dinner',
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: 'd2',
    name: 'Fried Rice',
    description: 'Stir-fried rice with vegetables',
    price: 90,
    category: 'Dinner',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: 'd3',
    name: 'Noodles',
    description: 'Hakka noodles with vegetables',
    price: 85,
    category: 'Dinner',
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=300&fit=crop',
    available: true,
  },

  // Desserts
  {
    id: 'ds1',
    name: 'Gulab Jamun',
    description: 'Sweet milk solid balls in sugar syrup',
    price: 40,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: 'ds2',
    name: 'Rasmalai',
    description: 'Cottage cheese dumplings in sweet milk',
    price: 50,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1631440337540-1b21bc2b58d3?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: 'ds3',
    name: 'Kheer',
    description: 'Rice pudding with nuts',
    price: 35,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1591100302184-a4b4cde44b50?w=400&h=300&fit=crop',
    available: true,
  },

  // Sweets
  {
    id: 's1',
    name: 'Jalebi',
    description: 'Crispy sweet spirals in sugar syrup',
    price: 30,
    category: 'Sweets',
    image: 'https://images.unsplash.com/photo-1601328991181-5e04d97df5e0?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: 's2',
    name: 'Ladoo',
    description: 'Sweet gram flour balls',
    price: 25,
    category: 'Sweets',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4cff32f5?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: 's3',
    name: 'Barfi',
    description: 'Milk-based sweet squares',
    price: 35,
    category: 'Sweets',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop',
    available: true,
  },

  // Beverages
  {
    id: 'bv1',
    name: 'Masala Chai',
    description: 'Spiced Indian tea',
    price: 15,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: 'bv2',
    name: 'Filter Coffee',
    description: 'Traditional South Indian coffee',
    price: 20,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: 'bv3',
    name: 'Cold Coffee',
    description: 'Iced coffee with milk',
    price: 40,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop',
    available: true,
  },

  // Juices
  {
    id: 'j1',
    name: 'Mango Juice',
    description: 'Fresh mango juice',
    price: 50,
    category: 'Juices',
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: 'j2',
    name: 'Orange Juice',
    description: 'Freshly squeezed orange juice',
    price: 45,
    category: 'Juices',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: 'j3',
    name: 'Watermelon Juice',
    description: 'Refreshing watermelon juice',
    price: 40,
    category: 'Juices',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784226?w=400&h=300&fit=crop',
    available: true,
  },

  // Ice Cream
  {
    id: 'ic1',
    name: 'Vanilla Ice Cream',
    description: 'Classic vanilla ice cream',
    price: 35,
    category: 'Ice Cream',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: 'ic2',
    name: 'Chocolate Ice Cream',
    description: 'Rich chocolate ice cream',
    price: 40,
    category: 'Ice Cream',
    image: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400&h=300&fit=crop',
    available: true,
  },
  {
    id: 'ic3',
    name: 'Kulfi',
    description: 'Traditional Indian ice cream',
    price: 30,
    category: 'Ice Cream',
    image: 'https://images.unsplash.com/photo-1591161351327-b3f71684e67e?w=400&h=300&fit=crop',
    available: true,
  },
];

export const mealCombos: MealCombo[] = [
  {
    id: 'c1',
    name: 'Breakfast Special',
    description: 'Idli + Vada + Coffee',
    items: ['Idli Sambar', 'Vada', 'Filter Coffee'],
    price: 60,
    originalPrice: 75,
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop',
  },
  {
    id: 'c2',
    name: 'Lunch Combo',
    description: 'Rice + Dal + Curry + Roti',
    items: ['Rice', 'Dal Tadka', 'Curry', 'Roti'],
    price: 100,
    originalPrice: 130,
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=300&fit=crop',
  },
  {
    id: 'c3',
    name: 'Biryani Feast',
    description: 'Biryani + Raita + Dessert',
    items: ['Chicken Biryani', 'Raita', 'Gulab Jamun'],
    price: 180,
    originalPrice: 210,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
  },
  {
    id: 'c4',
    name: 'Snack Time',
    description: 'Samosa + Chai + Jalebi',
    items: ['Samosa', 'Masala Chai', 'Jalebi'],
    price: 50,
    originalPrice: 65,
    image: 'https://images.unsplash.com/photo-1601328991181-5e04d97df5e0?w=400&h=300&fit=crop',
  },
];

export const categories = [
  'All',
  'Breakfast',
  'Veg',
  'Non-Veg',
  'Dinner',
  'Desserts',
  'Sweets',
  'Beverages',
  'Juices',
  'Ice Cream',
];