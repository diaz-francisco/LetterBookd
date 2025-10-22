const API_BASE_URL = import.meta.env.DEV ? "http://localhost:3001" : "https://letter-bookd.up.railway.app";

export interface Review {
  _id: string;
  bookId: string;
  bookSource: string;
  review: string;
  user: {
    _id: string;
    name: string;
    photo?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewData {
  bookId: string;
  bookSource?: string;
  review: string;
}

export async function getReviewsByBookId(bookId: string): Promise<Review[]> {
  const token = localStorage.getItem("auth_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/reviews/book/${bookId}`, {
      method: "GET",
      headers,
      credentials: "include",
    });

    if (!res.ok) {
      // More specific error handling
      if (res.status === 404) {
        throw new Error("No reviews found for this book");
      } else if (res.status >= 500) {
        throw new Error("Server error. Please try again later");
      } else {
        throw new Error(`Failed to fetch reviews (${res.status})`);
      }
    }

    const data = await res.json();
    return data.data.reviews;
  } catch (error) {
    // Handle network errors (backend not running, CORS, etc.)
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error("Cannot connect to server. Please check if the backend is running.");
    }
    throw error; // Re-throw other errors
  }
}

export async function createReview(reviewData: CreateReviewData): Promise<Review> {
  const token = localStorage.getItem("auth_token");

  if (!token) {
    throw new Error("Please sign in to create a review");
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const res = await fetch(`${API_BASE_URL}/api/v1/reviews`, {
    method: "POST",
    headers,
    credentials: "include",
    body: JSON.stringify(reviewData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to create review");
  }

  const data = await res.json();
  return data.data.review;
}

export async function updateReview(reviewId: string, reviewText: string): Promise<Review> {
  const token = localStorage.getItem("auth_token");

  if (!token) {
    throw new Error("Please sign in to update a review");
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const res = await fetch(`${API_BASE_URL}/api/v1/reviews/${reviewId}`, {
    method: "PATCH",
    headers,
    credentials: "include",
    body: JSON.stringify({ review: reviewText }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to update review");
  }

  const data = await res.json();
  return data.data.review;
}

export async function deleteReview(reviewId: string): Promise<void> {
  const token = localStorage.getItem("auth_token");

  if (!token) {
    throw new Error("Please sign in to delete a review");
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const res = await fetch(`${API_BASE_URL}/api/v1/reviews/${reviewId}`, {
    method: "DELETE",
    headers,
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to delete review");
  }
}
