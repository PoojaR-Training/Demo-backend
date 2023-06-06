const mongoose = require("mongoose");
const validator = require("validator");
var schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a title"],
    trim: true,
  },
  type: {
    type: String,
    enum: ["house", "apartment", "farm", "pg"],
    required: [true, "Please enter a type of property"],
  },
  like: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: [true, "Please enter a description"],
    trim: true,
    minlength: 10,
    maxlength: 700,
  },
  price: {
    type: Number,
    required: [true, "Please enter a Price"],
  },
  location: {
    type: String,
    required: [true, "Please enter a Location"],
  },
  address: {
    type: String,
    required: [true, "Please enter a Address"],
  },
  coverimage: {
    type: String,
    required: [true, "Please Attach cover image"],
  },
  propertyimages: {
    type: Array,
    required: [true, "Please Attach home image"],
  },
  avaliableto: {
    type: Date,
    required: [true, "Please Specify availability date"],
  },
  avaliablefrom:{
    type: Date,
    required: [true, "Please Specify availability date"],
  },
  freeInternet: {
    type: Boolean,
    default: false,
    required: [true, "Please specifie service"],
  },
  freeWifi: {
    type: Boolean,
    default: false,
    required: [true, "Please specifie service"],
  },
  lanConnections: {
    type: Boolean,
    default: false,
    required: [true, "Please specifie service"],
  },
  AC: {
    type: Boolean,
    default: false,
    required: [true, "Please specifie service"],
  },
  washingMachine: {
    type: Boolean,
    default: false,
    required: [true, "Please specifie service"],
  },
  dryer: {
    type: Boolean,
    default: false,
    required: [true, "Please specifie service"],
  },
  furniture: {
    type: Boolean,
    default: false,
    required: [true, "Please specifie service"],
  },
  TV: {
    type: Boolean,
    default: false,
    required: [true, "Please specifie service"],
  },
  kitchenAppliances: {
    type: Boolean,
    default: false,
    required: [true, "Please specifie service"],
  },
  elevator: {
    type: Boolean,
    default: false,
    required: [true, "Please specifie service"],
  },
  housekeeping: {
    type: Boolean,
    default: false,
    required: [true, "Please specifie service"],
  },
  laundry: {
    type: Boolean,
    default: false,
    required: [true, "Please specifie service"],
  },
  meals: {
    type: Boolean,
    default: false,
    required: [true, "Please specifie service"],
  },
  breakfast: {
    type: Boolean,
    default: false,
    required: [true, "Please specifie service"],
  },
  seaview: {
    type: Boolean,
    default: false,
    required: [true, "Please specifie service"],
  },
  freeparking: {
    type: Boolean,
    default: false,
    required: [true, "Please specifie service"],
  },
  kitchen: {
    type: Boolean,
    default: false,
    required: [true, "Please specifie service"],
  },
  roomsharing: {
    type: String,
    
  },
  area: {
    type: String,
    required: [true, "Please specifie area of property"],
  },
  securitycamera: {
    type: Boolean,
    default: false,
    required: [true, "Please specifie security"],
  },
  ownername: {
    type: String,
    required: [true, "Name is required"],
  },
  ownercontact: {
    type: Number,
    required: [true, "contact must be required"],
  },
  owneremail: {
    type: String,
    required: [true, "Please enter a email address"],
    validate: [validator.isEmail, "Please enter a valid email"],
    lowercase: true,
    trim: true,
  },
});

const Property = mongoose.model("property", schema);

module.exports = Property;
