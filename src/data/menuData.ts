
export interface MenuItemData {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export const MENU_CATEGORIES = [
  'Beverages',
  'Snacks',
  'Combos',
  'Meals',
  'Desserts',
];

export const MENU_ITEMS: MenuItemData[] = [
  // Beverages
  {
    id: 'bev1',
    name: 'Cappuccino',
    description: 'Espresso with steamed milk and a deep layer of foam',
    price: 120,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80',
    category: 'Beverages',
  },
  {
    id: 'bev2',
    name: 'Cold Brew',
    description: 'Smooth, cold-steeped coffee served over ice',
    price: 150,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    category: 'Beverages',
  },
  {
    id: 'bev3',
    name: 'Green Tea',
    description: 'Premium Japanese green tea, served hot',
    price: 90,
    image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'Beverages',
  },

  // Snacks
  {
    id: 'snk1',
    name: 'Croissant',
    description: 'Buttery, flaky French pastry',
    price: 85,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80',
    category: 'Snacks',
  },
  {
    id: 'snk2',
    name: 'Samosa',
    description: 'Crispy pastry filled with spiced potatoes and peas',
    price: 60,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'Snacks',
  },
  {
    id: 'snk3',
    name: 'Fruit Bowl',
    description: 'Fresh seasonal fruits, sliced and ready to eat',
    price: 120,
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'Snacks',
  },

  // Combos
  {
    id: 'com1',
    name: 'Breakfast Combo',
    description: 'Sandwich, fresh fruit, and coffee or tea',
    price: 220,
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'Combos',
  },
  {
    id: 'com2',
    name: 'Lunch Combo',
    description: 'Main dish, side, and beverage of your choice',
    price: 350,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'Combos',
  },

  // Meals
  {
    id: 'meal1',
    name: 'Buddha Bowl',
    description: 'Nutritious bowl with grains, veggies, protein and sauce',
    price: 280,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80',
    category: 'Meals',
  },
  {
    id: 'meal2',
    name: 'Pasta Primavera',
    description: 'Pasta tossed with seasonal vegetables',
    price: 240,
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'Meals',
  },
  {
    id: 'meal3',
    name: 'Chicken Wrap',
    description: 'Grilled chicken, fresh veggies in a wheat wrap',
    price: 220,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
    category: 'Meals',
  },

  // Desserts
  {
    id: 'des1',
    name: 'Chocolate Brownie',
    description: 'Rich, fudgy chocolate brownie',
    price: 90,
    image: 'http://images.unsplash.com/photo-1589886119971-ce58594dba81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8M3x8Y2hvY29sYXRlJTIwYnJvd25pZXN8fDB8fHx8MTYyOTI3NDE4MA&ixlib=rb-1.2.1&q=80&w=1080',
    category: 'Desserts',
  },
  {
    id: 'des2',
    name: 'Fruit Parfait',
    description: 'Layered yogurt with fresh fruits and granola',
    price: 150,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    category: 'Desserts',
  },
];

export const getMenuItemsByCategory = (category: string): MenuItemData[] => {
  return MENU_ITEMS.filter(item => item.category === category);
};

export const getAllMenuItems = (): MenuItemData[] => {
  return MENU_ITEMS;
};
