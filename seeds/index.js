const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    family:4
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price=Math.floor(Math.random() * 20)+10;
        const camp = new Campground({
            author:'62c94c72169c5f72dc796c38',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images:[
                {
                  url: 'https://res.cloudinary.com/dxrjmvmst/image/upload/v1657657458/CampFinder/ma30hc5ww3usdfxwhxvh.jpg',
                  filename: 'CampFinder/ma30hc5ww3usdfxwhxvh'
                },
                {
                  url: 'https://res.cloudinary.com/dxrjmvmst/image/upload/v1657657458/CampFinder/z9aebogmq4vh5disxdob.jpg',
                  filename: 'CampFinder/z9aebogmq4vh5disxdob'
                }
              ] ,
            description:'TBD',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    console.log('done')
    mongoose.connection.close();
})