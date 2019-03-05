let domain, protocol;
if (process.env.MODE === 'production'){
    console.log('running frontend production env');
    domain = 'doodlesapi.danielleysdoodles.com';
    protocol = 'http';
} else { 
    console.log('running frontend dev environment');
    domain = 'localhost:8080';
    protocol = 'http';
}


const BACKEND = {
    ADDRESS: `${protocol}://${domain}`,
};

export { BACKEND };