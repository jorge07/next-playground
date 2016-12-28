exports = module.exports = {
    'PAGES_PATH': '.',
    'PORT': process.env.PORT || 3000,
    'CACHE_MAX': process.env.CACHE_MAX || 800,
    'CACHE_MAX_AGE': process.env.CACHE_MAX_AGE || 1000 * 30 * 60 // 30hour
};
