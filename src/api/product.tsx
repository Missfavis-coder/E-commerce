import type { Product } from "@/type/type";

const BASE_URL = "https://dummyjson.com";

// Fetch all products
export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data.products; // <-- return only the array
  
}

// Fetch single product by ID
export async function getProduct(id: number): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

// Fetch products by category
export async function getProductsByCategory(category: string): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products/category/${category}`);
  if (!res.ok) throw new Error("Failed to fetch category");
  const data = await res.json();
  return data.products; // <-- return only the array
}
