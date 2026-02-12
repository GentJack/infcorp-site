import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { CheckCircle, Download, Package } from "lucide-react";

export default function OrderConfirmation() {
  const [, setLocation] = useLocation();
  const { user, logout } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const [orderNumber, setOrderNumber] = useState("");
  const [orderDate, setOrderDate] = useState("");

  useEffect(() => {
    // Generate order number and date
    const orderNum = `INF-${Date.now().toString().slice(-8)}`;
    const date = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setOrderNumber(orderNum);
    setOrderDate(date);

    // Clear cart after confirmation
    clearCart();
  }, [clearCart]);

  const handleDownloadInvoice = () => {
    // In a real app, this would generate and download a PDF
    alert("Invoice download feature coming soon!");
  };

  const totalWithTax = totalPrice * 1.1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
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

      <main className="container py-12">
        {/* Success Card */}
        <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="bg-card border border-border rounded-lg shadow-lg p-8 text-center">
            {/* Success Icon */}
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6 animate-in zoom-in duration-500" />

            {/* Header */}
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-foreground/60 mb-8">
              Thank you for your purchase. Your order has been successfully placed.
            </p>

            {/* Order Details */}
            <div className="bg-secondary/50 rounded-lg p-6 mb-8 text-left">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Order Number</p>
                  <p className="font-bold text-lg">{orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Order Date</p>
                  <p className="font-bold text-lg">{orderDate}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Customer</p>
                  <p className="font-bold text-lg">{user?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Email</p>
                  <p className="font-bold text-lg">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-8 text-left">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order Items
              </h3>
              <div className="space-y-3 bg-secondary/30 rounded-lg p-4">
                {items.length > 0 ? (
                  items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-foreground/60">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-foreground/60">No items in order</p>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="mb-8 text-left bg-secondary/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-foreground/60">Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">Tax (10%)</span>
                <span>${(totalPrice * 0.1).toFixed(2)}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-accent">${totalWithTax.toFixed(2)}</span>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-left">
              <p className="font-semibold text-blue-900 mb-2">What's Next?</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>✓ Confirmation email sent to {user?.email}</li>
                <li>✓ Order will be processed within 24 hours</li>
                <li>✓ You'll receive a tracking number via email</li>
                <li>✓ For digital products, download links are available in your account</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleDownloadInvoice}
                variant="outline"
                className="flex-1 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Invoice
              </Button>
              <Button
                onClick={() => setLocation("/shop")}
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Continue Shopping
              </Button>
            </div>

            {/* Return Home */}
            <button
              onClick={() => setLocation("/")}
              className="w-full mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
