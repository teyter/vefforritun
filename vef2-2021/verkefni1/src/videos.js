const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);

const express = require('express');
const router = express.Router();
// Runtime villur
function catchErrors(fn) {
    return (req, res, next) => fn(req, res, next).catch(next);
}

// JSON
async function readVideos() {
    const file = await readFileAsync('./public/videos.json');
    const json = JSON.parse(file);
    return json;
}

// Route handler fyrir homepage
async function list(req, res, next) {
    const json = await readVideos();
    const title = 'Fræðslumyndbandaleigan';
    const { videos, categories, } = json;
    res.render('videos', { title, videos, categories });
}

// Finna video by id
async function findVideo(id, videos) {
    let videoFound;
    const numId = Number(id);
    videos.forEach((video) => {
        if (video.id === numId) { videoFound = video; }
    });
    if (videoFound) { return videoFound; }
    return false;
}

// Route handler  fyrir videos page
async function showVideo(req, res, next) {
    const { slug } = req.params;
    if (slug !== 'video') { return next(); }
    const { id } = req.query;
    const json = await readVideos();
    const { videos } = json;
    const video = await findVideo(id, videos);
    if (!video) { return next(); }
    const { title } = video;
    res.render('video', { title, video, videos });
    return '';
}

router.get('/', catchErrors(list));
router.get('/:slug', catchErrors(showVideo));

module.exports = router;
