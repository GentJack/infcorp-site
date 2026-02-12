import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useReviews } from "@/contexts/ReviewsContext";
import { products } from "@/data/products";
import {
  BarChart3,
  Users,
  ShoppingCart,
  Star,
  LogOut,
  Trash2,
  TrendingUp,
} from "lucide-react";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { user, logout } = useAuth();
  const { items: cartItems } = useCart();
  const { reviews, deleteReview } = useReviews();
  const [activeTab, setActiveTab] = useState<"overview" | "reviews" | "products">("overview");

  // Redirect if not admin
  if (!user?.isAdmin) {
    setLocation("/");
    return null;
  }

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  // Calculate statistics
  const totalProducts = products.length;
  const totalReviews = reviews.length;
  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  const totalOrders = Math.floor(Math.random() * 50) + 20; // Mock data

  // Get products with reviews
  const productsWithReviews = products.map((product) => {
    const productReviews = reviews.filter((r) => r.productId === product.id);
    const avgRating = productReviews.length > 0
      ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1)
      : 0;
    return {
      ...product,
      reviewCount: productReviews.length,
      avgRating: parseFloat(avgRating as string),
    };
  }).filter((p) => p.reviewCount > 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-accent" />
            <span className="text-xl font-bold">Admin Portal</span>
          </div>

          <div className="flex items-center gap-4">
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
      </nav>

      <main className="container py-8">
        {/* Header */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-foreground/60">Manage your business, reviews, and products</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-3 font-medium transition-colors border-b-2 ${
              activeTab === "overview"
                ? "border-accent text-accent"
                : "border-transparent text-foreground/60 hover:text-foreground"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-4 py-3 font-medium transition-colors border-b-2 ${
              activeTab === "reviews"
                ? "border-accent text-accent"
                : "border-transparent text-foreground/60 hover:text-foreground"
            }`}
          >
            Reviews ({totalReviews})
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-3 font-medium transition-colors border-b-2 ${
              activeTab === "products"
                ? "border-accent text-accent"
                : "border-transparent text-foreground/60 hover:text-foreground"
            }`}
          >
            Products
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-500">
            {/* Total Products */}
            <div className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground/60 text-sm mb-1">Total Products</p>
                  <p className="text-3xl font-bold">{totalProducts}</p>
                </div>
                <ShoppingCart className="w-10 h-10 text-accent opacity-20" />
              </div>
            </div>

            {/* Total Reviews */}
            <div className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground/60 text-sm mb-1">Total Reviews</p>
                  <p className="text-3xl font-bold">{totalReviews}</p>
                </div>
                <Star className="w-10 h-10 text-yellow-400 opacity-20" />
              </div>
            </div>

            {/* Average Rating */}
            <div className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground/60 text-sm mb-1">Average Rating</p>
                  <p className="text-3xl font-bold">{averageRating}</p>
                  <p className="text-xs text-foreground/50">out of 5</p>
                </div>
                <Star className="w-10 h-10 text-yellow-400 opacity-20" />
              </div>
            </div>

            {/* Total Orders */}
            <div className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground/60 text-sm mb-1">Total Orders</p>
                  <p className="text-3xl font-bold">{totalOrders}</p>
                </div>
                <TrendingUp className="w-10 h-10 text-green-500 opacity-20" />
              </div>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div className="animate-in fade-in duration-500">
            {reviews.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-foreground/60">No reviews yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => {
                  const product = products.find((p) => p.id === review.productId);
                  return (
                    <div
                      key={review.id}
                      className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-lg">{review.title}</h3>
                          <p className="text-sm text-foreground/60">
                            {review.userName} • {product?.name}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteReview(review.id)}
                          className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                          title="Delete review"
                        >
                          <Trash2 className="w-5 h-5 text-destructive" />
                        </button>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-foreground/60">
                          {review.rating}/5
                        </span>
                      </div>

                      {/* Comment */}
                      <p className="text-foreground/70 mb-3">{review.comment}</p>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-xs text-foreground/50">
                        <span>
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                        <span>{review.helpful} people found this helpful</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="animate-in fade-in duration-500">
            {productsWithReviews.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-foreground/60">No products with reviews yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {productsWithReviews.map((product) => (
                  <div
                    key={product.id}
                    className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-3xl">{product.image}</span>
                          <div>
                            <h3 className="font-bold text-lg">{product.name}</h3>
                            <p className="text-sm text-foreground/60 capitalize">
                              {product.category} • {product.type}
                            </p>
                          </div>
                        </div>
                        <p className="text-foreground/70 text-sm mb-3">
                          {product.description}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-accent mb-2">
                          ${product.price}
                        </p>
                        <div className="flex items-center justify-end gap-2 mb-2">
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.avgRating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-semibold">
                            {product.avgRating}
                          </span>
                        </div>
                        <p className="text-xs text-foreground/60">
                          {product.reviewCount} review{product.reviewCount !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
