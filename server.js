const { createServer } = require('./backend/src/server');
const { env } = require('./backend/src/config/env');

createServer()
  .then((server) => {
    server.listen(env.port, () => {
      console.log(`Monocle backend running on http://localhost:${env.port}`);
      console.log(`DB client: ${env.dbClient}`);
    });
  })
  .catch((error) => {
    console.error('[Monocle] startup failed:', error && error.message ? error.message : String(error));
    process.exit(1);
  });
