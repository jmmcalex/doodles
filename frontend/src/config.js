const BACKEND = {
    ADDRESS: process.env.NODE_ENV === 'production' ?
        'https://danielleysdoodles.com':
        'http://localhost:3000'
};

export { BACKEND };