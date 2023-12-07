const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({path:'./config/config.env'})
//connect db
mongoose.connect(process.env.MONGO_URI)

// lodad models
const Restaurant = require('./models/Restaurants')

//read json file
// console.log(__dirname)
const restaurant = JSON.parse(fs.readFileSync(`${__dirname}/_data/restaurants.json`))

const importData = async()=>{
    try{
        await Restaurant.create(restaurant)
        console.log('Data imported...')
        process.exit(1)
    }catch(err){
        console.log(err)
    }
}

const removeData = async()=>{
    try{
        await Restaurant.deleteMany({})
        console.log('Data removed...')
        process.exit(1)
    }catch(err){
        console.log(err)
    }
}

if(process.argv[2] === '-i'){
    importData()
}else if(process.argv[2] === '-D'){
    removeData()
}

