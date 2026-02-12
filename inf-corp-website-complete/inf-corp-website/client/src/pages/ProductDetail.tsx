import { useState } from "react";
import { useLocation, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useReviews } from "@/contexts/ReviewsContext";
import { products } from "@/data/products";
import { ArrowLeft, ShoppingCart, Star, Send, ThumbsUp } from "lucide-react";

export default function ProductDetail() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/product/:id");
  const { user } = useAuth();
  const { addItem } = useCart();
  const { getProductReviews, getProductAverageRating, getProductReviewCount, addReview, markHelpful } = useReviews();

  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const productId = params?.id;
  const product = products.find((p) => p.id === productId);
  const productReviews = productId ? getProductReviews(productId) : [];
  const avgRating = productId ? getProductAverageRating(productId) : 0;
  const reviewCount = productId ? getProductReviewCount(productId) : 0;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-foreground/60 text-lg mb-4">Product not found</p>
          <Button onClick={() => setLocation("/shop")}>Back to Shop</Button>
        </div>
      </div>
    );
  }

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setLocation("/login");
      return;
    }

    if (!title.trim() || !comment.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      addReview({
        productId: product.id,
        userId: user.id,
        userName: user.name,
        rating,
        title,
        comment,
        helpful: 0,
      });
      setTitle("");
      setComment("");
      setRating(5);
      alert("Review submitted successfully!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddToCart = () => {
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
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <button
            onClick={() => setLocation("/shop")}
            className="text-2xl font-bold text-accent hover:opacity-80 transition-opacity"
          >
            INF Corp
          </button>
          <button
            onClick={() => setLocation("/shop")}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <main className="container py-8">
        {/* Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Product Image */}
          <div className="bg-secondary/50 rounded-lg p-12 flex items-center justify-center">
            <div className="text-9xl">{product.image}</div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-foreground/70 text-lg mb-6">{product.description}</p>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(avgRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold">{avgRating}</span>
              <span className="text-foreground/60">({reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-foreground/60 text-sm mb-2">Price</p>
              <p className="text-4xl font-bold text-accent">${product.price}</p>
            </div>

            {/* Type Badge */}
            <div className="mb-6">
              <span className="inline-block bg-secondary/50 px-4 py-2 rounded-lg capitalize font-medium">
                {product.type}
              </span>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 mb-4 flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </Button>

            {/* Product Details */}
            <div className="bg-secondary/30 rounded-lg p-4 space-y-2 text-sm">
              <p><strong>Category:</strong> <span className="capitalize">{product.category}</span></p>
              <p><strong>Type:</strong> <span className="capitalize">{product.type}</span></p>
              <p><strong>In Stock:</strong> {product.inStock ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>

          {/* Add Review Form */}
          {user ? (
            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Share Your Review</h3>
              <form onSubmit={handleAddReview} className="space-y-4">
                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setRating(num)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            num <= rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium mb-2">Review Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Summarize your review..."
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    required
                  />
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-sm font-medium mb-2">Your Review</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience with this product..."
                    rows={4}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>
              </form>
            </div>
          ) : (
            <div className="bg-secondary/30 rounded-lg p-6 mb-8 text-center">
              <p className="text-foreground/70 mb-4">Sign in to leave a review</p>
              <Button
                onClick={() => setLocation("/login")}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Sign In
              </Button>
            </div>
          )}

          {/* Reviews List */}
          <div className="space-y-4">
            {productReviews.length === 0 ? (
              <div className="text-center py-12 text-foreground/60">
                <p>No reviews yet. Be the first to review this product!</p>
              </div>
            ) : (
              productReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all"
                >
                  {/* Review Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-lg">{review.title}</h4>
                      <p className="text-sm text-foreground/60">
                        {review.userName} • {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
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
                  </div>

                  {/* Review Comment */}
                  <p className="text-foreground/70 mb-4">{review.comment}</p>

                  {/* Helpful Button */}
                  <button
                    onClick={() => markHelpful(review.id)}
                    className="flex items-center gap-2 text-sm text-foreground/60 hover:text-accent transition-colors"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    Helpful ({review.helpful})
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
