import 'dotenv/config';

import Hapi from '@hapi/hapi';
import Jwt from '@hapi/jwt';

// Routes
import albumRoutes from './routes/albums.js';
import songRoutes from './routes/songs.js';
import userRoutes from './routes/users.js';
import authenticationRoutes from './routes/authentications.js';
import playlistRoutes from './routes/playlists.js';
import collaborationRoutes from './routes/collaborations.js';

// Token Manager
import TokenManager from './tokenize/TokenManager.js';

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

  // Registrasi plugin JWT
  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  // Mendefinisikan strategy autentikasi jwt
  server.auth.strategy('openmusic_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        userId: artifacts.decoded.payload.userId,
      },
    }),
  });

  // Registrasi routes
  server.route(albumRoutes);
  server.route(songRoutes);
  server.route(userRoutes);
  server.route(authenticationRoutes);
  server.route(playlistRoutes);
  server.route(collaborationRoutes);

  // Error handling
  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response.isBoom) {
      // Handle client errors
      if (response.isServer) {
        // Server error
        const newResponse = h.response({
          status: 'error',
          message: 'Terjadi kegagalan pada server kami',
        });
        newResponse.code(500);
        return newResponse;
      }

      // Client error
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
  console.log(`Server berjalan pada ${server.info.uri}`);
  console.log('OpenMusic API telah berhasil dijalankan!');
};

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception:', err);
  process.exit(1);
});

init();
