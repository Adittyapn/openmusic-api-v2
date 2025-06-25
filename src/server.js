import 'dotenv/config';

import Hapi from '@hapi/hapi';

import albumRoutes from './routes/albums.js';
import songRoutes from './routes/songs.js';

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: process.env.HOST || 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(albumRoutes);
  server.route(songRoutes);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response.isBoom) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.output.statusCode);
      return newResponse;
    }

    return response.continue || response;
  });

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
