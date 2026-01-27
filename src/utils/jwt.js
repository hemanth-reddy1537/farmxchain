// src/utils/jwt.js
// Lightweight helper to decode JWT payload and safely extract role claims

export function safeDecodeJwt(token) {
  if (!token || typeof token !== "string") return null;
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = parts[1];
    // Base64url -> Base64
    const b64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(b64)
        .split("")
        .map((c) => "%" + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.warn('safeDecodeJwt failed', e);
    return null;
  }
}

export function getRolesFromToken(token) {
  const decoded = safeDecodeJwt(token);
  if (!decoded) return [];

  // common claim names: role, roles, authorities, realm_access.roles
  if (decoded.role) return [decoded.role.toString().toLowerCase()];
  if (decoded.roles && Array.isArray(decoded.roles)) return decoded.roles.map(r=>r.toLowerCase());
  if (decoded.authorities && Array.isArray(decoded.authorities)) return decoded.authorities.map(r=>r.toLowerCase());
  if (decoded.realm_access && Array.isArray(decoded.realm_access.roles)) return decoded.realm_access.roles.map(r=>r.toLowerCase());

  // fallback: check 'scope' claim as space-separated
  if (decoded.scope && typeof decoded.scope === 'string') return decoded.scope.split(/\s+/).map(r=>r.toLowerCase());

  return [];
}
