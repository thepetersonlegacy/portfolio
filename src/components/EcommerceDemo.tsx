import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Filter, 
  Search, 
  User, 
  Menu,
  X,
  Plus,
  Minus,
  ArrowLeft,
  Truck,
  Shield,
  RotateCcw,
  CreditCard
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  colors: string[];
  sizes: string[];
  description: string;
  features: string[];
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
}

interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export const EcommerceDemo: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [currentView, setCurrentView] = useState<'home' | 'product' | 'cart'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const products: Product[] = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299,
      originalPrice: 399,
      image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Electronics",
      rating: 4.8,
      reviews: 1247,
      colors: ["Black", "White", "Silver"],
      sizes: ["One Size"],
      description: "Experience premium sound quality with our flagship wireless headphones featuring active noise cancellation and 30-hour battery life.",
      features: ["Active Noise Cancellation", "30-hour Battery", "Quick Charge", "Premium Materials"],
      inStock: true,
      isSale: true
    },
    {
      id: 2,
      name: "Luxury Leather Handbag",
      price: 450,
      image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Fashion",
      rating: 4.9,
      reviews: 892,
      colors: ["Brown", "Black", "Tan"],
      sizes: ["Medium", "Large"],
      description: "Handcrafted Italian leather handbag with timeless design and premium hardware. Perfect for both professional and casual occasions.",
      features: ["Italian Leather", "Handcrafted", "Multiple Compartments", "Premium Hardware"],
      inStock: true,
      isNew: true
    },
    {
      id: 3,
      name: "Smart Fitness Watch",
      price: 199,
      originalPrice: 249,
      image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Electronics",
      rating: 4.6,
      reviews: 2156,
      colors: ["Black", "Silver", "Rose Gold"],
      sizes: ["38mm", "42mm"],
      description: "Advanced fitness tracking with heart rate monitoring, GPS, and 7-day battery life. Track your health and stay connected.",
      features: ["Heart Rate Monitor", "GPS Tracking", "7-day Battery", "Water Resistant"],
      inStock: true,
      isSale: true
    },
    {
      id: 4,
      name: "Designer Sunglasses",
      price: 180,
      image: "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Fashion",
      rating: 4.7,
      reviews: 634,
      colors: ["Black", "Tortoise", "Gold"],
      sizes: ["One Size"],
      description: "Premium designer sunglasses with UV protection and polarized lenses. Timeless style meets modern functionality.",
      features: ["UV Protection", "Polarized Lenses", "Designer Frame", "Premium Case"],
      inStock: true
    },
    {
      id: 5,
      name: "Organic Skincare Set",
      price: 89,
      image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Beauty",
      rating: 4.8,
      reviews: 1543,
      colors: ["Natural"],
      sizes: ["Full Size", "Travel Size"],
      description: "Complete organic skincare routine with cleanser, serum, and moisturizer. Made with natural ingredients for all skin types.",
      features: ["Organic Ingredients", "All Skin Types", "Cruelty Free", "Eco Packaging"],
      inStock: true,
      isNew: true
    },
    {
      id: 6,
      name: "Premium Coffee Beans",
      price: 24,
      image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Food",
      rating: 4.9,
      reviews: 876,
      colors: ["Dark Roast", "Medium Roast", "Light Roast"],
      sizes: ["250g", "500g", "1kg"],
      description: "Single-origin coffee beans roasted to perfection. Rich, complex flavors with notes of chocolate and caramel.",
      features: ["Single Origin", "Freshly Roasted", "Fair Trade", "Premium Quality"],
      inStock: true
    }
  ];

  const categories = ["All", "Electronics", "Fashion", "Beauty", "Food"];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    const cartItem: CartItem = {
      ...product,
      quantity: 1,
      selectedColor: selectedColor || product.colors[0],
      selectedSize: selectedSize || product.sizes[0]
    };

    setCart(prev => {
      const existingItem = prev.find(item => 
        item.id === product.id && 
        item.selectedColor === cartItem.selectedColor && 
        item.selectedSize === cartItem.selectedSize
      );

      if (existingItem) {
        return prev.map(item =>
          item.id === product.id && 
          item.selectedColor === cartItem.selectedColor && 
          item.selectedSize === cartItem.selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, cartItem];
    });
  };

  const updateQuantity = (id: number, color: string, size: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(prev => prev.filter(item => 
        !(item.id === id && item.selectedColor === color && item.selectedSize === size)
      ));
    } else {
      setCart(prev => prev.map(item =>
        item.id === id && item.selectedColor === color && item.selectedSize === size
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            New
          </span>
        )}
        {product.isSale && (
          <span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Sale
          </span>
        )}
        <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>
        
        <h3 className="font-semibold text-lg mb-2 text-gray-900">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
          <button 
            onClick={() => {
              setSelectedProduct(product);
              setSelectedColor(product.colors[0]);
              setSelectedSize(product.sizes[0]);
              setCurrentView('product');
            }}
            className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors font-medium"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  const ProductDetail: React.FC = () => {
    if (!selectedProduct) return null;

    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <button 
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(selectedProduct.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-gray-600">({selectedProduct.reviews} reviews)</span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedProduct.name}</h1>
              
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">${selectedProduct.price}</span>
                {selectedProduct.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">${selectedProduct.originalPrice}</span>
                )}
                {selectedProduct.isSale && (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    Save ${selectedProduct.originalPrice! - selectedProduct.price}
                  </span>
                )}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">{selectedProduct.description}</p>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Color</h3>
                <div className="flex gap-3">
                  {selectedProduct.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                        selectedColor === color 
                          ? 'border-black bg-black text-white' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
                <div className="flex gap-3">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                        selectedSize === size 
                          ? 'border-black bg-black text-white' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Key Features</h3>
              <ul className="space-y-2">
                {selectedProduct.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4 pt-6">
              <button 
                onClick={() => addToCart(selectedProduct)}
                className="flex-1 bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="p-4 border-2 border-gray-300 rounded-xl hover:border-gray-400 transition-colors">
                <Heart className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Free Shipping</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">30-Day Returns</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">2-Year Warranty</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CartView: React.FC = () => (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <button 
          onClick={() => setCurrentView('home')}
          className="text-gray-600 hover:text-black transition-colors"
        >
          Continue Shopping
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to get started</p>
          <button 
            onClick={() => setCurrentView('home')}
            className="bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-6 bg-white p-6 rounded-2xl border border-gray-100">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-24 h-24 object-cover rounded-xl"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-2">
                  {item.selectedColor} • {item.selectedSize}
                </p>
                <p className="text-xl font-bold text-gray-900">${item.price}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                  <button 
                    onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                    className="p-2 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                    className="p-2 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button 
                  onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, 0)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          <div className="bg-gray-50 p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-900">Total ({getTotalItems()} items)</span>
              <span className="text-2xl font-bold text-gray-900">${getTotalPrice()}</span>
            </div>
            <button className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
              <CreditCard className="w-5 h-5" />
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <button 
                onClick={onClose}
                className="text-gray-600 hover:text-black transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Luxe Fashion</h1>
              
              <nav className="hidden md:flex space-x-8">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`font-medium transition-colors ${
                      selectedCategory === category 
                        ? 'text-black border-b-2 border-black pb-1' 
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              
              <button className="p-2 text-gray-600 hover:text-black transition-colors">
                <User className="w-6 h-6" />
              </button>
              
              <button 
                onClick={() => setCurrentView('cart')}
                className="relative p-2 text-gray-600 hover:text-black transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              <button 
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 text-gray-600 hover:text-black transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-white border-t border-gray-200 p-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowMobileMenu(false);
                    }}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category 
                        ? 'bg-black text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>
        {currentView === 'home' && (
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-3xl p-12 mb-12 text-white">
              <div className="max-w-2xl">
                <h2 className="text-4xl font-bold mb-4">New Collection</h2>
                <p className="text-xl mb-6 text-gray-300">Discover our latest premium products with exclusive designs and cutting-edge technology.</p>
                <button className="bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                  Shop Now
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'All' ? 'All Products' : selectedCategory}
              </h2>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {currentView === 'product' && <ProductDetail />}
        {currentView === 'cart' && <CartView />}
      </main>
    </div>
  );
};