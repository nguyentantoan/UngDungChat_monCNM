import {contact} from "./../services/index";
import { validationResult } from "express-validator/check";

let findUsersContact = async(req, res) => {
    let errorArr = [];
    let validationErrors = validationResult(req);
  
    if (!validationErrors.isEmpty()) {
      let errors = Object.values(validationErrors.mapped());
      errors.forEach((item) => {
        errorArr.push(item.msg);
      });
      
      req.flash("errors", errorArr);
      return res.status(500).send(errorArr);
    }

    try {
        let currentUserId = req.user._id;
        let keyword = req.params.keyword;
       
        let users = await contact.findUsersContact(currentUserId, keyword);
        return res.render("main/contact/sections/_findUsersContact", {users});
    } catch (error) {
        return res.status(500).send(error);
    }
};

let addNew = async(req, res) => {
  
  try {
      let currentUserId = req.user._id;
      let contactId = req.body.uid;

      let newContact = await contact.addNew(currentUserId, contactId);
      return res.status(200).send({success: !!newContact});
    } catch (error) {
      return res.status(500).send(error);
  }
};

let removeContact = async (req, res) => {
  try {
    let currentUserId = req.user._id;
    let contactId = req.body.uid;

    let removeContact = await contact.removeContact(currentUserId, contactId);
    return res.status(200).send({success: !!removeContact});
  } catch (error) {
    return res.status(500).send(error);
 }
};

let removeRequestContactSent = async(req, res) => {
  try {
      let currentUserId = req.user._id;
      let contactId = req.body.uid;

      let removeReq = await contact.removeRequestContactSent(currentUserId, contactId);
      return res.status(200).send({success: !!removeReq});
    } catch (error) {
      return res.status(500).send(error);
  }
};

let removeRequestContactReceived = async(req, res) => {
  try {
      let currentUserId = req.user._id;
      let contactId = req.body.uid;

      let removeReq = await contact.removeRequestContactReceived(currentUserId, contactId);
      return res.status(200).send({success: !!removeReq});
    } catch (error) {
      return res.status(500).send(error);
  }
};

let approveRequestContactReceived = async(req, res) => {
  try {
      let currentUserId = req.user._id;
      let contactId = req.body.uid;

      let approveReq = await contact.approveRequestContactReceived(currentUserId, contactId);
      return res.status(200).send({success: !!approveReq});
    } catch (error) {
      return res.status(500).send(error);
  }
};


module.exports = {
    findUsersContact: findUsersContact,
    addNew: addNew,
    removeRequestContactSent: removeRequestContactSent,
    removeRequestContactReceived: removeRequestContactReceived,
    approveRequestContactReceived: approveRequestContactReceived,
    removeContact: removeContact,
   
}