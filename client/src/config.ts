export const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://my-unsplash-api.onrender.com";
