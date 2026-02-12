import React, { createContext, useContext, useEffect, useState } from "react";

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  helpful: number;
}

export interface ReviewContextType {
  reviews: Review[];
  addReview: (review: Omit<Review, "id" | "createdAt">) => void;
  getProductReviews: (productId: string) => Review[];
  getProductAverageRating: (productId: string) => number;
  getProductReviewCount: (productId: string) => number;
  deleteReview: (reviewId: string) => void;
  markHelpful: (reviewId: string) => void;
}

const ReviewsContext = createContext<ReviewContextType | undefined>(undefined);

export function ReviewsProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([]);

  // Load reviews from localStorage on mount
  useEffect(() => {
    const storedReviews = localStorage.getItem("inf-corp-reviews");
    if (storedReviews) {
      try {
        setReviews(JSON.parse(storedReviews));
      } catch (error) {
        console.error("Failed to parse stored reviews:", error);
        localStorage.removeItem("inf-corp-reviews");
      }
    } else {
      // Initialize with sample reviews
      const sampleReviews: Review[] = [
        {
          id: "review_1",
          productId: "dev-001",
          userId: "user_1",
          userName: "John Smith",
          rating: 5,
          title: "Excellent Service!",
          comment: "The website development team delivered exactly what we needed. Professional and timely.",
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          helpful: 12,
        },
        {
          id: "review_2",
          productId: "dev-001",
          userId: "user_2",
          userName: "Sarah Johnson",
          rating: 4,
          title: "Great Quality",
          comment: "Very satisfied with the website. Minor tweaks needed but overall great work.",
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          helpful: 8,
        },
        {
          id: "review_3",
          productId: "des-001",
          userId: "user_3",
          userName: "Mike Chen",
          rating: 5,
          title: "Perfect Logo Design",
          comment: "Absolutely love the logo design. It perfectly represents our brand.",
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          helpful: 15,
        },
        {
          id: "review_4",
          productId: "sec-001",
          userId: "user_4",
          userName: "Lisa Anderson",
          rating: 5,
          title: "Comprehensive Testing",
          comment: "The penetration testing was thorough and identified critical vulnerabilities.",
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          helpful: 10,
        },
        {
          id: "review_5",
          productId: "inf-001",
          userId: "user_5",
          userName: "Robert Taylor",
          rating: 4,
          title: "Reliable Hosting",
          comment: "Good uptime and responsive support team. Recommended!",
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          helpful: 7,
        },
      ];
      setReviews(sampleReviews);
      localStorage.setItem("inf-corp-reviews", JSON.stringify(sampleReviews));
    }
  }, []);

  // Save reviews to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("inf-corp-reviews", JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (review: Omit<Review, "id" | "createdAt">) => {
    const newReview: Review = {
      ...review,
      id: `review_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setReviews((prevReviews) => [newReview, ...prevReviews]);
  };

  const getProductReviews = (productId: string) => {
    return reviews.filter((r) => r.productId === productId).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  };

  const getProductAverageRating = (productId: string) => {
    const productReviews = getProductReviews(productId);
    if (productReviews.length === 0) return 0;
    const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / productReviews.length) * 10) / 10;
  };

  const getProductReviewCount = (productId: string) => {
    return getProductReviews(productId).length;
  };

  const deleteReview = (reviewId: string) => {
    setReviews((prevReviews) => prevReviews.filter((r) => r.id !== reviewId));
  };

  const markHelpful = (reviewId: string) => {
    setReviews((prevReviews) =>
      prevReviews.map((r) =>
        r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r
      )
    );
  };

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        addReview,
        getProductReviews,
        getProductAverageRating,
        getProductReviewCount,
        deleteReview,
        markHelpful,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error("useReviews must be used within ReviewsProvider");
  }
  return context;
}
