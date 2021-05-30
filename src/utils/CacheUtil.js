const Redis = require("ioredis");

class CacheUtil {
  constructor() {
    this.cacheService = new Redis({
      host: process.env.REDIS_HOST || "localhost",
      port: process.env.REDIS_PORT || 6379,
    }).on("error", (error) => {
      console.error('Não foi possível se conectar com o Redis');
      throw Error(`
        Erro ao se conectar com o Redis::ErrorMessage::${JSON.stringify(error)}`
      );
    });;
  }

  async get(key) {
    const value = await this.cacheService.get(key);
    return value ? JSON.parse(value) : null;
  }

  set(key, value, ttl = 600) {
    return this.cacheService.set(key, JSON.stringify(value), "EX", ttl);
  }
}

module.exports = new CacheUtil();
