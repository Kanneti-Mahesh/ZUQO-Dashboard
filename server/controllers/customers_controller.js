const customerSchema = require('../models/customers_model');



   //1. To add new customers with basic validation to store valid info in db...
const customerPost = async(req,res)=>{

    try{
        const {customerSno , customerName, customerMobile, customerEmail} = req.body;

        const exist = await customerSchema.findOne({customerEmail});
            //---(OR)--- we can as unique one to check ("either mobile/email...")
        const existMobile = await customerSchema.findOne({customerMobile});
        
        if(exist){
            return res.status(400).send('Customer is already Found with Email Id')
        }
        else if(existMobile){
            return res.status(400).send('Mobile Number is already Used');
        }
        else if(customerEmail.slice(-10)!=='@gmail.com'){
            return res.status(400).send('Validation Error. Please Enter valid Email');
        }
                    //IND COUNTRY MOBILE NUMBERS STARTS WITH (9,8,7)...
        else if(customerMobile.charAt(0) !=='9' && customerMobile.charAt(0) !=='8' && customerMobile.charAt(0) !=='8'){
            return res.status(400).send('Validation Error. Please Enter valid Mobile No');
        }


        let newCustomer = new customerSchema({
            customerSno, customerName, customerMobile, customerEmail
        });
        newCustomer.save();
        return res.status(201).send('New Customer added Successfully');

    }

    catch(err){
        console.log(err);
        return res.status(500).send('Server Error...')
    }

}



//2.Customers data to GET/FETCHING...


const customersList = async(req,res)=>{

    try{
        const customerList = await customerSchema.find();
        return res.status(200).json(customerList);
    }

    catch(err){
        console.log(err);
        return res.status(500).send('Server Error...')
    }

}



//3. DELETE Customers data from List...


const customerDelete = async(req,res)=>{

    try{
        const customerList = await customerSchema.findByIdAndDelete(req.params.id);
        return res.status(200).send("Customer deleted successfully");
    }

    catch(err){
        console.log(err);
        return res.status(500).send('Server Error...')
    }

}



module.exports = { customerPost, customersList, customerDelete };