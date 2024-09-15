export function isAuthenticated() {
  const token = request.cookies.get("token").value || "hi";

  return !!token;
}
