const Property = require("../model/model_property");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dn1p21zgh",
  api_key: "384833787236885",
  api_secret: "cn-pl1rrfD0exF4biU9ykFOcDi4",
});

async function getPropertyData(req, res) {
  try {
    const property = await Property.find({});
    if (!property) {
      return res.status(404).json({ message: `cannot find any property` });
    } else {
      res.status(200).json(property);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}

async function getPropertyById(req, res) {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: `cannot find any property` });
    } else {
      res.status(200).json(property);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}
async function getpropertyByType(req, res) {
  try {
    const { type } = req.params;
    const property = await Property.find({ type: type });
    if (!property) {
      return res
        .status(400)
        .json({ message: `cannot find any property with given type` });
    } else {
      res.status(200).json(property);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}
async function getpropertyByCity(req, res) {
  try {
    const { search } = req.params;
    console.log(search);
    const lowercaseSearch = search.toLowerCase();
    console.log(lowercaseSearch);
    const property = await Property.find({ location: lowercaseSearch});
    if (property.length === 0) {
      return res.status(404).json({ message: "No property found" });
    }
    res.status(200).json(property);
    console.log(property)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}
async function getpropertyByCityType(req, res) {
  try {
    const {search} = req.params
    const {type}=req.params
    const lowercaseSearch = search.toLowerCase()
    const property = await Property.find({ location: lowercaseSearch , type:type});
    if (property.length === 0) {
      return res.status(404).json({ message: "No property found" });
    }
    res.status(200).json(property);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}
async function getPropertyByLike(req, res) {
  try {
    const properties = await Property.find({ like: true });
    if (properties.length === 0) {
      return res
        .status(404)
        .json({ message: "No properties found with like set to true" });
    }
    res.status(200).json(properties);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}
async function updateLike(req, res) {
  try {
    const { id } = req.params;
    const { like } = req.body;
    console.log("like",like);
    
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    property.like = like;
    await property.save();
    return res.status(200).json({ message: "Property like updated" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}
 async function getRentedProperty(req, res, next) {
  try{
  const { id } = req.params;
  const property = await Property.find({ ownerid: id});
  if (property.length === 0) {
    return res.status(404).json({ message: "No property found" });
  }
  res.status(200).json(property);
} catch (error) {
  console.log(error.message);
  res.status(500).json({ error: error.message });
}
 }
async function propertyCreate(req, res) {
  try {
   // console.log(req.body);
    const data = req.body;
    const {ownerid}= req.params
    console.log(ownerid);
    const {
      title,
      description,
      price,
      rent,
      location,
      address,
      area
    } = data[0];

    const { type } = data[1];

    const { cover } = data[2];

    const property = data[3].property;

    const {
      freeWifi,
      lanConnections,
      AC,
      washingMachine,
      dryer,
      furniture,
      TV,
      kitchenAppliances,
      elevator,
      housekeeping,
      laundry,
      meals,
      breakfast,
      seaview,
      freeparking,
      kitchen,
      securitycamera
    } = data.slice(4, 21).reduce((acc, item) => {
      const key = Object.keys(item)[0];
      const value = item[key];
      acc[key] = value;
      return acc;
    }, {});

    const { ownerimage, ownername, ownercontact, owneremail } = data.slice(21).reduce((acc, item) => {
      const key = Object.keys(item)[0];
      const value = item[key];
      acc[key] = value;
      return acc;
    }, {});

    const lowercaseLocation = location.toLowerCase();


    // Upload cover image to Cloudinary
    const coverImageResult = await cloudinary.uploader.upload(cover);
    const coverImageUrl = coverImageResult.secure_url;

    // Upload property images to Cloudinary
    const propertyImageUrls = await Promise.all(
      property.map(async (image) => {
        const propertyImageResult = await cloudinary.uploader.upload(image);
        return propertyImageResult.secure_url;
      })
    );
    const ownerImageResult = await cloudinary.uploader.upload(ownerimage);
    const ownerImageUrl = ownerImageResult.secure_url;

    const propertyData = {
      title,
      description,
      price,
      location:lowercaseLocation,
      address,
      area,
      type,
      coverimage: coverImageUrl,
      propertyimages: propertyImageUrls,
      freeWifi,
      lanConnections,
      AC,
      washingMachine,
      dryer,
      furniture,
      TV,
      kitchenAppliances,
      elevator,
      housekeeping,
      laundry,
      meals,
      breakfast,
      seaview,
      freeparking,
      kitchen,
      securitycamera,
      ownerimage:ownerImageUrl,
      ownername,
      ownercontact,
      owneremail,
      ownerid
    };

    const propertypost = await Property.create(propertyData);

    res.status(200).json(propertypost);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}
async function deleteProperty(req, res, next){
  try{
  const {id} = req.params
  const property = await Property.findByIdAndDelete(id);
    if (!property) {
      return res
        .status(404)
        .json({ message: `cannot find any post with ID ${id}` });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "something went wrong ",
    });
  }
}
module.exports = {
  getPropertyData,
  propertyCreate,
  getPropertyById,
  getpropertyByType,
  updateLike,
  getPropertyByLike,
  getpropertyByCity,
  getpropertyByCityType,
  getRentedProperty,
  deleteProperty
};
