function json(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(body);
}

function text(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end(payload);
}

function parseJsonBody(req, maxSizeBytes = 1_000_000) {
  return new Promise((resolve, reject) => {
    let buffer = '';
    req.on('data', (chunk) => {
      buffer += chunk;
      if (buffer.length > maxSizeBytes) {
        reject(new Error('payload_too_large'));
      }
    });
    req.on('end', () => {
      if (!buffer) return resolve({});
      try {
        resolve(JSON.parse(buffer));
      } catch (_error) {
        reject(new Error('invalid_json'));
      }
    });
    req.on('error', reject);
  });
}

module.exports = {
  json,
  text,
  parseJsonBody
};
