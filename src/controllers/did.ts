import { logger } from "../config";
import { Request, Response } from "express";
import DIDModel, { IDID } from "../models/did";

async function registerDID(req: Request, res: Response) {
  try {
    const  didDoc  = req.body;
    if(!didDoc) {
      return res.status(400).send("Error: Invalid didDoc");
    }

    const { id: did } = didDoc;
    if(!did) {
      return res.status(400).send("Error: Invalid didDoc");
    }

    const newEmp: IDID = await DIDModel.create({
      did, 
      didDocString: JSON.stringify(didDoc)
    });
    return res.status(200).send(newEmp);
  } catch (e) {
    logger.error("InvestorCtrl:: addInvestor(): Error " + e);
    return res.status(500).send(`Error: ${e.message}`);
  }
}

async function getDIDList(req: Request, res: Response) {
  try {
    const employeeList:Array<IDID> = await DIDModel.find({});
    return res.status(200).send(employeeList);
  } catch (e) {
    logger.error('InvestorCtrl:: getAllInvestor(): Error ' + e);
    return res.status(500).send(`Error: ${e.message}`);
  }
}

async function resolveDID(req: Request, res: Response) {
  try {
    const { did } = req.params;
    const didData:IDID = await DIDModel.where({did: did}).findOne();
    
    if(!didData){
      return res.status(400).send("Error: Invalid did")
    }
    
    const { didDocString } = didData;
    const didDoc = JSON.parse(didDocString);
    return res.status(200).send(didDoc);
  } catch (e) {
    logger.error('InvestorCtrl:: getInvestorByDID(): Error ' + e);
    return res.status(500).send(`Error: ${e.message}`);
  }
}

export default {
  registerDID,
  resolveDID,
  getDIDList
};

