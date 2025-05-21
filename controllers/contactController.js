const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel");
// @desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler( async (req,res)=> {
    const contacts = await Contact.find(
         
        
    );
    res.status(200).json({message:'Contacts', data:contacts});
});

const createContact = asyncHandler (async (req,res)=>{
    console.log(req.body);
    const { name, email, phone} = req.body;

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json({message:'Create Contact', data:contact});
});

const getContact = asyncHandler (async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json({message:`Get Contact for ${req.params.id}`, data:contact});
});

const updateContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )

    res.status(200).json({message:'Updated Contact',  data:updatedContact});
});

const deleteContact = asyncHandler(async (req,res)=>{
     const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    await contact.deleteOne();
    res.status(200).json({message:'Delete Contact', data:contact});
});

module.exports = { 
    getContacts, 
    createContact, 
    getContact, 
    updateContact, 
    deleteContact 
};