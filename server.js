const http = require('http');
const { createStrapi, compileStrapi } = require('@strapi/strapi');

const host = process.env.HOST || '0.0.0.0';
const port = Number(process.env.PORT || 1337);

let requestHandler = (request, response) => {
  response.statusCode = 503;
  response.setHeader('Content-Type', 'text/plain');
  response.end('Strapi is starting...');
};

const server = http.createServer((request, response) => {
  requestHandler(request, response);
});

server.listen(port, host, () => {
  console.log(`Initial server listening on ${host}:${port}`);
});

async function startStrapi() {
  try {
    const appContext = await compileStrapi();
    const app = await createStrapi(appContext).load();

    app.server.mount();
    requestHandler = app.server.app.callback();

    await app.postListen();
    app.log.info('Strapi attached to the Hostinger HTTP server');

    const shutdown = async () => {
      server.close();
      await app.destroy();
      process.exit(0);
    };

    process.once('SIGTERM', shutdown);
    process.once('SIGINT', shutdown);
  } catch (error) {
    console.error('Failed to initialize Strapi:', error);
    server.close();
    process.exit(1);
  }
}

startStrapi();
