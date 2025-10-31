export interface Like {
  _id: string;
  bookId: string;
  bookSource: string;
  status: "Read" | "Want to read" | "Currently reading";
  rating?: number;
  user: { _id: string; name: string; photo?: string };
  createdAt: string;
  updatedAt: string;
}

export interface RatingStats {
  bookId: string;
  averageRating: number | null;
  ratingsCount: number;
}

export interface CreateLikeData {
  bookId: string;
  bookSource?: string;
  status?: "Read" | "Want to read" | "Currently reading";
  rating?: number;
}

const API_URL = import.meta.env.DEV ? "http://localhost:3001" : "https://letter-bookd.up.railway.app";

async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<any> {
  const token = localStorage.getItem("auth_token");
  const headers = new Headers(options.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  headers.set("Content-Type", "application/json");

  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function getUserLike(bookId: string): Promise<Like | null> {
  const json = await fetchWithAuth(`${API_URL}/api/v1/likes/book/${bookId}/user`);
  return json.data.like;
}

export async function createOrUpdateLike(data: CreateLikeData): Promise<Like> {
  const json = await fetchWithAuth(`${API_URL}/api/v1/likes/book/${data.bookId}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return json.data.like;
}

export async function updateRating(bookId: string, rating: number): Promise<Like> {
  const json = await fetchWithAuth(`${API_URL}/api/v1/likes/book/${bookId}/rating`, {
    method: "PATCH",
    body: JSON.stringify({ rating }),
  });
  return json.data.like;
}

export async function removeRating(bookId: string): Promise<Like> {
  const json = await fetchWithAuth(`${API_URL}/api/v1/likes/book/${bookId}/rating`, {
    method: "DELETE",
  });
  return json.data.like;
}

export async function deleteLike(bookId: string): Promise<void> {
  await fetchWithAuth(`${API_URL}/api/v1/likes/book/${bookId}`, {
    method: "DELETE",
  });
}

export async function getBookRatingStats(bookId: string): Promise<RatingStats> {
  const res = await fetch(`${API_URL}/api/v1/likes/book/${bookId}/stats`, {
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
  }

  const json = await res.json();
  return json.data;
}
