const config = process.env.NODE_ENV === 'production'
    ? require('./production')
    : require('./development');

module.exports = {
    ...config
};
