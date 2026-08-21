const { createStrapi, compileStrapi } = require('@strapi/strapi');

async function main() {
  try {
    const appContext = await compileStrapi();
    const app = await createStrapi(appContext).start();
    app.log.info('Strapi started successfully');
  } catch (error) {
    console.error('Failed to start Strapi:', error);
    process.exit(1);
  }
}

main();
