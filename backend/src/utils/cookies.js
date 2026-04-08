function parseCookies(req) {
  const header = req.headers.cookie || '';
  const result = {};
  header.split(';').forEach((pair) => {
    const idx = pair.indexOf('=');
    if (idx === -1) return;
    const key = pair.slice(0, idx).trim();
    const value = pair.slice(idx + 1).trim();
    if (!key) return;
    result[key] = decodeURIComponent(value);
  });
  return result;
}

function setCookie(res, { name, value, maxAgeSeconds = 3600, httpOnly = true, secure = false, sameSite = 'Lax', path = '/' }) {
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    `Path=${path}`,
    `Max-Age=${maxAgeSeconds}`,
    `SameSite=${sameSite}`
  ];
  if (httpOnly) parts.push('HttpOnly');
  if (secure) parts.push('Secure');
  const cookie = parts.join('; ');
  const current = res.getHeader('Set-Cookie');
  if (!current) {
    res.setHeader('Set-Cookie', cookie);
  } else if (Array.isArray(current)) {
    res.setHeader('Set-Cookie', [...current, cookie]);
  } else {
    res.setHeader('Set-Cookie', [current, cookie]);
  }
}

function clearCookie(res, name) {
  setCookie(res, { name, value: '', maxAgeSeconds: 0 });
}

module.exports = {
  parseCookies,
  setCookie,
  clearCookie
};
