import {
  postCollaborationHandler,
  deleteCollaborationHandler,
} from '../handlers/collaborations.js';
import {
  PostCollaborationPayloadSchema,
  DeleteCollaborationPayloadSchema,
} from '../validator/collaborations/schema.js';

const routes = [
  {
    method: 'POST',
    path: '/collaborations',
    handler: postCollaborationHandler,
    options: {
      auth: 'openmusic_jwt',
      validate: {
        payload: PostCollaborationPayloadSchema,
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
    method: 'DELETE',
    path: '/collaborations',
    handler: deleteCollaborationHandler,
    options: {
      auth: 'openmusic_jwt',
      validate: {
        payload: DeleteCollaborationPayloadSchema,
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
];

export default routes;
