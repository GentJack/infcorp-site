import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { ArrowLeft, Trash2, Plus, Minus, ShoppingCart } from "lucide-react";

export default function Cart() {
  const [, setLocation] = useLocation();
  const { logout } = useAuth();
  const { items, removeItem, updateQuantity, clearCart, totalPrice, totalItems } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      setLocation("/order-confirmation");
    }, 1500);
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

          <button
            onClick={() => {
              logout();
              setLocation("/");
            }}
            className="text-sm text-foreground/70 hover:text-foreground transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="container py-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <button
            onClick={() => setLocation("/shop")}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-4xl font-bold">Shopping Cart</h1>
            <p className="text-foreground/60">{totalItems} item(s) in cart</p>
          </div>
        </div>

        {items.length === 0 ? (
          // Empty Cart
          <div className="text-center py-16 animate-in fade-in duration-500">
            <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
            <p className="text-foreground/60 text-lg mb-6">Your cart is empty</p>
            <Button
              onClick={() => setLocation("/shop")}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 animate-in fade-in slide-in-from-left-4 duration-700">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-card border border-border rounded-lg p-4 flex gap-4 hover:border-accent/50 transition-all duration-300"
                  >
                    {/* Product Image */}
                    <div className="bg-secondary/50 rounded-lg p-4 text-3xl w-24 h-24 flex items-center justify-center flex-shrink-0">
                      {item.image}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <p className="text-sm text-foreground/60 mb-2">{item.category}</p>
                      <p className="text-lg font-semibold text-accent">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-destructive" />
                      </button>

                      <div className="flex items-center gap-2 bg-secondary/50 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-secondary rounded transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-secondary rounded transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping Button */}
              <Button
                onClick={() => setLocation("/shop")}
                variant="outline"
                className="w-full mt-6"
              >
                Continue Shopping
              </Button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 animate-in fade-in slide-in-from-right-4 duration-700">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                {/* Breakdown */}
                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/60">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/60">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/60">Tax</span>
                    <span>${(totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="font-bold">Total</span>
                  <span className="text-2xl font-bold text-accent">
                    ${(totalPrice * 1.1).toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <Button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 transition-all duration-300 hover:scale-105"
                >
                  {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                </Button>

                {/* Clear Cart */}
                <button
                  onClick={clearCart}
                  className="w-full mt-3 text-sm text-destructive hover:text-destructive/80 transition-colors"
                >
                  Clear Cart
                </button>

                {/* Info */}
                <div className="mt-6 p-4 bg-secondary/50 rounded-lg text-xs text-foreground/60">
                  <p className="font-semibold mb-2">Free Shipping</p>
                  <p>On all orders over $50</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
