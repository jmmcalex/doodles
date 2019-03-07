let domain, protocol;
if (process.env.MODE === 'production'){
    domain = 'doodlesapi.danielleysdoodles.com';
    protocol = 'https';
} else { 
    domain = 'localhost:5000';
    protocol = 'http';
}


const BACKEND = {
    ADDRESS: `${protocol}://${domain}`,
};

export { BACKEND };