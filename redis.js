import Redis from 'ioredis';

const redis = new Redis(
  'redis://default:dbd5f21f77f54bf1824ccf412ec432fc@skilled-muskox-31954.upstash.io:31954'
);

export default redis;
