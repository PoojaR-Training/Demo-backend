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
    const property = await Property.find({ location: search });
    if (property.length === 0) {
      return res.status(404).json({ message: "No property found" });
    }
    res.status(200).json(property);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}
async function getpropertyByCityType(req, res) {
  try {
    const {search} = req.params
    const {type}=req.params
    const property = await Property.find({ location: search , type:type});
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

async function propertyCreate(req, res) {
  try {
    const {
      title,
      type,
      like,
      description,
      price,
      location,
      address,
      coverimage,
      propertyimages,
      avaliableto,
      avaliablefrom,
      freeInternet,
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
      area,
      roomsharing,
      securitycamera,
      ownername,
      ownercontact,
      owneremail,
    } = req.body;

    // Upload cover image to Cloudinary
    const coverImageResult = await cloudinary.uploader.upload(coverimage);
    const coverImageUrl = coverImageResult.secure_url;

    // Upload property images to Cloudinary
    const propertyImageUrls = [];
    for (const image of propertyimages) {
      const propertyImageResult = await cloudinary.uploader.upload(image);
      propertyImageUrls.push(propertyImageResult.secure_url);
    }
    const property = await Property.create({
      title,
      type,
      like,
      description,
      price,
      location,
      address,
      coverimage: coverImageUrl,
      propertyimages: propertyImageUrls,
      avaliableto,
      avaliablefrom,
      freeInternet,
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
      area,
      roomsharing,
      securitycamera,
      ownername,
      ownercontact,
      owneremail,
    });

    res.status(200).json(property);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
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
  getpropertyByCityType
};
