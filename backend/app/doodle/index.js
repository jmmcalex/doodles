const DEFAULT_PROPERTIES = {
    title: 'untitled',
    filePath: 'public/images/doodles/default.jpg',
    get postDate() {
        return new Date();
    }
}

class Doodle {
    // We can give our constructor a default argument (an empty object)
    constructor({ title, filePath } =  {}){
        this.postDate = DEFAULT_PROPERTIES.postDate;
        this.title = title || DEFAULT_PROPERTIES.title;
        this.filePath = filePath || DEFAULT_PROPERTIES.filePath;
    }
}


module.exports = Doodle;