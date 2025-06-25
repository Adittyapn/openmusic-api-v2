import jwt from 'jsonwebtoken';

const TokenManager = {
  generateAccessToken: (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: process.env.ACCESS_TOKEN_AGE || '1h',
    });
  },

  generateRefreshToken: (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_KEY);
  },

  verifyRefreshToken: (refreshToken) => {
    try {
      const artifacts = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
      return artifacts;
    } catch (error) {
      throw new Error('Refresh token tidak valid');
    }
  },

  verifyAccessToken: (accessToken) => {
    try {
      const artifacts = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
      return artifacts;
    } catch (error) {
      throw new Error('Access token tidak valid');
    }
  },
};

export default TokenManager;
