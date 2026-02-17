import Address from "../model/address.js";

//API's saveAddress
export const saveAddress = async (req, res) => {
  try {
    const address = await Address.create(req.body);
    res.json({ message: "Address saved Successfully", address });
  } catch (err) {
    res.status(500).json({ message: "Error Saving Address", err });
  }
};

//API's Get address by userId
export const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({
        userId:req.params.userId
    });
    res.json(addresses);
  } catch (err) {
    res.json({ message: "Error fetching Addresses", err });
  }
};
