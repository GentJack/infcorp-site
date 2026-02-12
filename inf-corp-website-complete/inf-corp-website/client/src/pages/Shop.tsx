import { useState, useMemo } from "react";
import { useReviews } from "@/contexts/ReviewsContext";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/data/products";
import { ShoppingCart, LogOut, Search, Star, Filter } from "lucide-react";

export default function Shop() {
  const [, setLocation] = useLocation();
  const { user, logout } = useAuth();
  const { addItem, totalItems } = useCart();
  const { getProductAverageRating, getProductReviewCount } = useReviews();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Get unique categories and types
  const categories = Array.from(new Set(products.map((p) => p.category)));
  const types = Array.from(new Set(products.map((p) => p.type)));

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesType = !selectedType || product.type === selectedType;
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [searchQuery, selectedCategory, selectedType]);

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    alert("Added to cart!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <button
            onClick={() => setLocation("/")}
            className="text-2xl font-bold text-accent hover:opacity-80 transition-opacity"
          >
            INF Corp
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLocation("/cart")}
              className="relative p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-foreground/70">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container py-8">
        {/* Header */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl font-bold mb-2">Shop</h1>
          <p className="text-foreground/60">Browse our products and services</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 relative animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 animate-in fade-in slide-in-from-left-4 duration-700">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </h3>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-sm mb-3">Category</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`block text-sm w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === null
                        ? "bg-accent text-accent-foreground font-medium"
                        : "hover:bg-secondary"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block text-sm w-full text-left px-3 py-2 rounded-lg transition-colors capitalize ${
                        selectedCategory === category
                          ? "bg-accent text-accent-foreground font-medium"
                          : "hover:bg-secondary"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <h4 className="font-semibold text-sm mb-3">Type</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedType(null)}
                    className={`block text-sm w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedType === null
                        ? "bg-accent text-accent-foreground font-medium"
                        : "hover:bg-secondary"
                    }`}
                  >
                    All Types
                  </button>
                  {types.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`block text-sm w-full text-left px-3 py-2 rounded-lg transition-colors capitalize ${
                        selectedType === type
                          ? "bg-accent text-accent-foreground font-medium"
                          : "hover:bg-secondary"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 animate-in fade-in duration-500">
                <p className="text-foreground/60 text-lg">No products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="bg-card border border-border rounded-lg overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:scale-105 animate-in fade-in slide-in-from-bottom-4 duration-700"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Product Image */}
                    <div className="bg-secondary/50 p-6 text-center text-5xl">
                      {product.image}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-foreground/60 mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(getProductAverageRating(product.id))
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-foreground/60">
                          ({getProductReviewCount(product.id)})
                        </span>
                      </div>

                      {/* Price and Button */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-2xl font-bold text-accent">
                          ${product.price}
                        </span>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => setLocation(`/product/${product.id}`)}
                            variant="outline"
                            className="transition-all duration-300 hover:scale-110"
                            size="sm"
                          >
                            View
                          </Button>
                          <Button
                            onClick={() => handleAddToCart(product)}
                            className="bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 hover:scale-110"
                            size="sm"
                          >
                            Add
                          </Button>
                        </div>
                      </div>

                      {/* Type Badge */}
                      <div className="mt-3 pt-3 border-t border-border">
                        <span className="text-xs bg-secondary/50 px-2 py-1 rounded capitalize">
                          {product.type}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
