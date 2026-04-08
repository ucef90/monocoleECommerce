const crypto = require('crypto');

function buildAuthService(config) {
  const cookieName = 'monocle_admin';

  function stableHash(value) {
    return crypto.createHash('sha256').update(String(value)).digest();
  }

  function timingSafeEqualString(a, b) {
    const ah = stableHash(a);
    const bh = stableHash(b);
    return crypto.timingSafeEqual(ah, bh);
  }

  function validateCredentials(username, password) {
    return timingSafeEqualString(username, config.adminUsername)
      && timingSafeEqualString(password, config.adminPassword);
  }

  function base64url(input) {
    return Buffer.from(input).toString('base64url');
  }

  function sign(input) {
    return crypto.createHmac('sha256', config.adminSessionSecret).update(input).digest('base64url');
  }

  function createToken(username) {
    const payloadObj = {
      u: username,
      exp: Date.now() + config.adminSessionHours * 3600 * 1000
    };
    const payload = base64url(JSON.stringify(payloadObj));
    const sig = sign(payload);
    return `${payload}.${sig}`;
  }

  function verifyToken(token) {
    if (!token || !token.includes('.')) return null;
    const [payload, sig] = token.split('.');
    if (!payload || !sig) return null;
    const expected = sign(payload);
    if (!timingSafeEqualString(sig, expected)) return null;

    try {
      const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
      if (!decoded.exp || Date.now() > decoded.exp) return null;
      return decoded;
    } catch (_error) {
      return null;
    }
  }

  return {
    cookieName,
    validateCredentials,
    createToken,
    verifyToken
  };
}

module.exports = { buildAuthService };
