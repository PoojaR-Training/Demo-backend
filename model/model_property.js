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
    enum: ["house", "flat", "farm", "pg"],
    required: [true, "Please enter a type of property"],
  },
  like: {
    type: Boolean,
    default: false,
  },
  booked:{
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
  freeWifi: {
    type: Boolean,
    default: false,

  },
  lanConnections: {
    type: Boolean,
    default: false,
    
  },
  AC: {
    type: Boolean,
    default: false,
   
  },
  washingMachine: {
    type: Boolean,
    default: false,
  
  },
  dryer: {
    type: Boolean,
    default: false,
   
  },
  furniture: {
    type: Boolean,
    default: false,
   
  },
  TV: {
    type: Boolean,
    default: false,
  
  },
  kitchenAppliances: {
    type: Boolean,
    default: false,
 
  },
  elevator: {
    type: Boolean,
    default: false,
 
  },
  housekeeping: {
    type: Boolean,
    default: false,
   
  },
  laundry: {
    type: Boolean,
    default: false,
   
  },
  meals: {
    type: Boolean,
    default: false,
  
  },
  breakfast: {
    type: Boolean,
    default: false,
  
  },
  seaview: {
    type: Boolean,
    default: false,
  
  },
  freeparking: {
    type: Boolean,
    default: false,

  },
  kitchen: {
    type: Boolean,
    default: false,
  
  },
  
  area: {
    type: String,
    required: [true, "Please specifie area of property"],
  },
  securitycamera: {
    type: Boolean,
    default: false,
  },
  ownerimage:{
    type:String,
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
  ownerid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  }, 
});

const Property = mongoose.model("property", schema);

module.exports = Property;
