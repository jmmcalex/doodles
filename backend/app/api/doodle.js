/**
 * backend/app/api/doodle.js
 * 
 * Overview:
 * -- This file is the api endpoint where files are uploaded to
 *    the server for storage.
 */

const { Router } = require('express');
const multer = require('multer');
const fs = require('fs-extra');
const DoodleTable = require('../doodle/table.js');
const Doodle = require('../doodle');
const uuid = require('uuid');

const DOODLE_STORAGE  = "./public/images/doodles";
const DOODLE_STATIC_PATH = "/images/doodles";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdirsSync(DOODLE_STORAGE);
        cb(null, DOODLE_STORAGE);
    },
    filename: (req, file, cb) => {
        cb(null, `${uuid()}-${Date.now()}.png`);
    }
});

const upload = multer({ storage });
const router = new Router();

router.get('/', (req, res, next) => {
    let { per, page } = req.query;          // The frontend sends this in to let the backend know to request next page 
    const limit = parseInt(per);            // We will limit the number of results per page here
    const offset = (parseInt(page) - 1) * limit;
    DoodleTable.getDoodles({ limit, offset })
        .then(doodles => {
            console.log(doodles);
            res.json({ doodles });
        })
        .catch(error => next(error));
});

router.post('/new', upload.single('doodleFile'), (req, res, next) => {
    const  { title } = req.body; 
    const file = req.file;
    const filePath = `${DOODLE_STATIC_PATH}/${file.filename}`;
    const doodle = new Doodle({ title, filePath });

    DoodleTable.storeDoodle(doodle)
        .then(() => {
            console.log('doodle successfully stored');
            res.json({ doodle });
        }) 
        .catch(error => next(error));
});

module.exports = router;