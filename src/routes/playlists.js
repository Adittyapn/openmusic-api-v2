import {
  postPlaylistHandler,
  getPlaylistsHandler,
  deletePlaylistHandler,
  postSongToPlaylistHandler,
  getPlaylistSongsHandler,
  deleteSongFromPlaylistHandler,
  getPlaylistActivitiesHandler,
} from '../handlers/playlists.js';
import {
  PostPlaylistPayloadSchema,
  PostSongToPlaylistPayloadSchema,
  DeleteSongFromPlaylistPayloadSchema,
} from '../validator/playlists/schema.js';

const routes = [
  {
    method: 'POST',
    path: '/playlists',
    handler: postPlaylistHandler,
    options: {
      auth: 'openmusic_jwt',
      validate: {
        payload: PostPlaylistPayloadSchema,
        failAction: (request, h, error) => {
          const response = h.response({
            status: 'fail',
            message: error.details[0].message,
          });
          response.code(400);
          return response.takeover();
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: getPlaylistsHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}',
    handler: deletePlaylistHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: 'POST',
    path: '/playlists/{id}/songs',
    handler: postSongToPlaylistHandler,
    options: {
      auth: 'openmusic_jwt',
      validate: {
        payload: PostSongToPlaylistPayloadSchema,
        failAction: (request, h, error) => {
          const response = h.response({
            status: 'fail',
            message: error.details[0].message,
          });
          response.code(400);
          return response.takeover();
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/playlists/{id}/songs',
    handler: getPlaylistSongsHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}/songs',
    handler: deleteSongFromPlaylistHandler,
    options: {
      auth: 'openmusic_jwt',
      validate: {
        payload: DeleteSongFromPlaylistPayloadSchema,
        failAction: (request, h, error) => {
          const response = h.response({
            status: 'fail',
            message: error.details[0].message,
          });
          response.code(400);
          return response.takeover();
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/playlists/{id}/activities',
    handler: getPlaylistActivitiesHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
];

export default routes;
