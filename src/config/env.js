const requireEnd = (key) => {
    const value = process.env[key];
    if(!value) {
        throw new Error('Missing environment variable: ' + key);
    }
    return value;
};

const config = {
    PORT: process.env.PORT ?? 3000,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_DIALECT: process.env.DB_DIALECT,
    BCRYPT_SALT_ROUNDS: +process.env.BCRYPT_SALT_ROUNDS,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_SECOND: process.env.JWT_EXPIRES_SECOND,
    DB_USE_SSL: process.env.DB_USE_SSL ?? false,
};

export default config;