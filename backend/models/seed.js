// const faker = require("faker");
// const MongoClient = require("mongodb").MongoClient;
import dotenv from "dotenv";
dotenv.config();

import MongoClient from "mongodb";

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function seedDB() {
    // Connection URL
    const uri = `${process.env.MONGO_URI}`;

    const client = new MongoClient.MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log("Connected correctly to server");

        const collection = client.db("test").collection("products");

        // The drop() command destroys all data from a collection.
        // Make sure you run it against proper database and collection.
        collection.drop();

        // make a bunch of time series data
        const items = [
            {
              "name": "Bat",
              "description": "",
              "image": "https://res.cloudinary.com/dkrkhvs8g/image/upload/v1656079407/img/bat_c7bqou.webp",
              "countInStock": 25,
              "user": ""
            },
            {
              "name": "Ball",
              "description": "",
              "image": "https://res.cloudinary.com/dkrkhvs8g/image/upload/v1656079396/img/ball_fqhfjv.webp",
              "countInStock": 25,
              "user": ""
            },
            {
              "name": "Badminton racket",
              "description": "",
              "image": "https://res.cloudinary.com/dkrkhvs8g/image/upload/v1656079388/img/badminton_g7ins3.webp",
              "countInStock": 25,
              "user": ""
            },
            {
              "name": "Football",
              "description": "",
              "image": "https://res.cloudinary.com/dkrkhvs8g/image/upload/v1656079424/img/football_net_z4dova.webp",
              "countInStock": 25,
              "user": ""
            },
            {
              "name": "Basketball",
              "description": "",
              "image": "https://res.cloudinary.com/dkrkhvs8g/image/upload/v1656079402/img/basketball_yjccnq.webp",
              "countInStock": 25,
              "user": ""
            },
            {
              "name": "Volleyball",
              "description": "",
              "image": "https://res.cloudinary.com/dkrkhvs8g/image/upload/v1656079423/img/volleyball_wivuum.webp",
              "countInStock": 25,
              "user": ""
            },
            {
              "name": "Football nets",
              "description": "",
              "image": "https://res.cloudinary.com/dkrkhvs8g/image/upload/v1656079424/img/football_net_z4dova.webp",
              "countInStock": 25,
              "user": ""
            },
            {
              "name": "Chess board",
              "description": "",
              "image": "https://res.cloudinary.com/dkrkhvs8g/image/upload/v1656079422/img/chess_nv7jv8.webp",
              "countInStock": 25,
              "user": ""
            },
            {
              "name": "Carrom",
              "description": "",
              "image": "https://res.cloudinary.com/dkrkhvs8g/image/upload/v1656079423/img/carrom_qedcab.webp",
              "countInStock": 25,
              "user": ""
            },
            {
              "name": "Table tennis",
              "description": "",
              "image": "https://res.cloudinary.com/dkrkhvs8g/image/upload/v1656079424/img/tt_wedmbd.webp",
              "countInStock": 25,
              "user": ""
            }
        ];

        // for (let i = 0; i < 10; i++) {
        //     const firstName = faker.name.firstName();
        //     const lastName = faker.name.lastName();
        //     let newDay = {
        //         timestamp_day: faker.date.past(),
        //         cat: faker.random.word(),
        //         owner: {
        //             email: faker.internet.email(firstName, lastName),
        //             firstName,
        //             lastName,
        //         },
        //         events: [],
        //     };

        //     for (let j = 0; j < randomIntFromInterval(1, 6); j++) {
        //         let newEvent = {
        //             timestamp_event: faker.date.past(),
        //             weight: randomIntFromInterval(14,16),
        //         }
        //         newDay.events.push(newEvent);
        //     }
        //     timeSeriesData.push(newDay);
        // }
        collection.insertMany(items);

        console.log("Database seeded! :)");
        client.close();
    } catch (err) {
        console.log(err.stack);
    }
}

seedDB();
