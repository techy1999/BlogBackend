const { rateLimit } = require('express-rate-limit')

exports.rateLimiter= rateLimit({
  windowMs:  5* 60 * 1000, // 5 min in milliseconds
  max: 50,
  message: {
    success:false,
    error: 'You have exceeded the 50 requests in 5 min limit!',
    data:"",
    message:"",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
