const domainModel = require("../../models/domainModel");
const Validator = require("../../helpers/validators");
const keccakHelper = require("keccak");
const axios = require("axios");
const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider || 'https://eth.llamarpc.com');
const planPurchaseModel = require("../../models/planPurchaseModel");
var dotenv = require("dotenv");
dotenv.config();

const network = "mainnet";


exports.fetchDomainData = async (req, res) => {
    try {
        let data = Validator.checkValidation(req.query);
        if (data["success"] === true) {
            data = data["data"];
        } else {
            res.status(201).send({ success: false, msg: "Missing field", data: {}, errors: "" });
        }
        if (data) {
            const domainData = await domainModel.findOne({ domain: data.domain });
            if (domainData !== null) {
                res.status(200).send({ success: true, msg: "Sucessfully fetched data", data: domainData, errors: "" });
            }
        } else {
            return res.status(203).send({ success: false, msg: "Something went wrong ! Please try again later", data: "", errors: "" });
        }
    } catch (error) {
        res.status(500).send({ success: false, msg: "Error", data: {}, errors: error });
    }
};

exports.deleteDomainData = async (req, res) => {
    try {
        let data = Validator.checkValidation(req.query);
        if (data["success"] === true) {
            data = data["data"];
        } else {
            res.status(201).send({ success: false, msg: "Missing field", data: {}, errors: "" });
        }
        if (data) {
            await domainDB.deleteMany({ domain: data.domain });
            res.status(200).send({ success: true, msg: "Sucessfully deleted data", data: {}, errors: "" });
        } else {
            return res.status(203).send({ success: false, msg: "Something went wrong ! Please try again later", data: "", errors: "" });
        }
    } catch (error) {
        res.status(500).send({ success: false, msg: "Error", data: {}, errors: error });
    }
};

exports.getDomainData = async (req, res) => {
    try {
        let data = Validator.checkValidation(req.query);
        if (data["success"] === true) {
            data = data["data"];
        } else {
            res.status(201).send({ success: false, msg: "Missing field", data: {}, errors: "" });
        }
        if (data) {
            const domainData = await domainDB.find({ userId: data.userId });
            if (domainData !== null) {
                res.status(200).send({ success: true, msg: "Data fetched successfully", data: domainData });
            } else {
                res.status(203).send({ success: false, msg: "There was some error in fetching data", data: {}, errors: error });
            }
        } else {
            res.status(203).send({ success: false, msg: "Something went wrong ! Please try again later", data: "", errors: "" });
        }
    } catch (error) {
        res.status(500).send({ success: false, msg: "Error", data: {}, errors: error });
    }
};

exports.saveDomainData = async (req, res) => {
    const receivedData = req.body;
    if (receivedData.domainName.includes("/") || receivedData.domainName.includes(":")) {
    } else {
        const address = await web3.eth.ens.getAddress(receivedData.domainName)
            let data = {
                contract: process.env.ENS_CONTRACT_MAINNET,
                labelHash: keccakHelper("keccak256").update(receivedData.domainName.split(".")[0]).digest("hex"),
            };
            axios
                .get(`https://metadata.ens.domains/${network}/${process.env.ENS_CONTRACT_MAINNET}/${"0x" + data.labelHash}`)
                .then((response) => {
                    data["isExpired"] = false;
                    data["domain"] = response.data.name;
                    data["address"] = address
                    data["expiryDate"] = response.data.attributes.filter((attribs) => attribs.trait_type === "Expiration Date")[0].value;
                    {
                        //  planPurchaseModel.findOne({ userId: receivedData.userId }).then((planData) => {
                          const newDomainData = new domainModel({
                                userId: req.user.id,
                                planId: "newPlan001",
                                domain: data.domain,
                                address: data.address,
                                isExpired: data.isExpired,
                                expiryDate: data.expiryDate
                            });
                            newDomainData
                                .save(newDomainData)
                                .then((data) => {
                                    res.status(200).send({ success: true, msg: "Data saved sucessfully", data: "", errors: "" });
                                })
                                .catch((err) => {
                                    console.log(err);
                                    res.status(500).send({
                                        message: err.message || "Some error occurred while saving your data",
                                    });
                                });
                        // });
                    }

                })
                .catch((err) => {
                    res.json({
                        expired: true,
                        message: err.response,
                    });
                });
    }
};