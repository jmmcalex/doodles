/**
 * Nothing much to do in this file. This is purely where the server will 
 * start and listen to requests
 * 
 * The big point of this file is to define which port we are listening on
 */

const app = require('../app/index.js');
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Welcome to Danielleys Doodles, listening on ${port}`);
}); 