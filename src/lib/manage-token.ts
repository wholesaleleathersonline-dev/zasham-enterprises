export function generateManageToken() {
  return crypto.randomUUID().replace(/-/g, "");
}