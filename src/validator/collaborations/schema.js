import Joi from '@hapi/joi';

const PostCollaborationPayloadSchema = Joi.object({
  playlistId: Joi.string().required(),
  userId: Joi.string().required(),
});

const DeleteCollaborationPayloadSchema = Joi.object({
  playlistId: Joi.string().required(),
  userId: Joi.string().required(),
});

export { PostCollaborationPayloadSchema, DeleteCollaborationPayloadSchema };
