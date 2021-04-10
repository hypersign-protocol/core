import { logger } from "../config";
import { Request, Response } from "express";
import SchemaModel, { ISchema } from "../models/schema";

async function registerSchema(req: Request, res: Response) {
  try {
    const schema  = req.body;
    if(!schema) {
      return res.status(400).send("Error: Invalid schema");
    }

    const { id: schemaId, author } = schema;
    if(!schemaId) {
      return res.status(400).send("Error: Invalid schema");
    }

    const newEmp: ISchema = await SchemaModel.create({
      schemaId, 
      author,
      schemaString: JSON.stringify(schema)
    });
    return res.status(200).send(newEmp);

  } catch (e) {
    logger.error("ProjectCtrl:: addProject(): Error " + e);
    return res.status(500).send(`Error: ${e.message}`);
  }
}

async function getSchemaList(req: Request, res: Response) {
  try {

    const { author } =  req.query;
    let employeeList:Array<ISchema>;
    if(author){
      employeeList = await SchemaModel.where({author: author}).find();
      return res.status(200).send(employeeList);  
    }

    employeeList = await SchemaModel.find({});
    return res.status(200).send(employeeList);
  } catch (e) {
    logger.error('InvestorCtrl:: getAllProject(): Error ' + e);
    return res.status(500).send(`Error: ${e.message}`);
  }
}

async function getSchemaById(req: Request, res: Response) {
  try {
    const { schemaId } = req.params;
    const { author } =  req.query;

    const query = {};

    query["schemaId"] = schemaId;

    if(author){
      query["author"] = author;
    }

    console.log(query);

    const investor:ISchema = await SchemaModel.where(query).findOne();

    if(!investor){
      return res.status(400).send("Error: No record found")
    }

    const { schemaString } = investor;
    const schema = JSON.parse(schemaString);
    return res.status(200).send(schema);
  } catch (e) {
    logger.error('InvestorCtrl:: getProjectById(): Error ' + e);
    return res.status(500).send(`Error: ${e.message}`);
  }
}

export default {
  registerSchema,
  getSchemaById,
  getSchemaList
};
