const express=require('express');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = "mongodb+srv://ManshourDB:nCKPcYsTgNckjhoD@cluster0.hiaj5.mongodb.net/Manshours?retryWrites=true&w=majority";

const client = new MongoClient(url);

const router=express.Router();

console.log(client.db);
router.post('/add-post',(req,res,next)=>{
        client.connect(function (er,client){
    
        if(er){console.log('error in connection:',er)}
        const db=client.db("Manshours");
        console.log('this iss the id coming from edit page:',req.body.id)
        if (!req.body.id){
            db.collection("manshour-app").insertOne({
                number:req.body.number,
                textBody: req.body.textBody
                },
            function (er,r) {
                console.log('this is reponse :',r);
                if (er){console.log('there is an error in sending the text body:', er)};
                    res.json({message:'post have been posted',id:r.insertedId}) ;   
    })
        }else {
            const id= new mongodb.ObjectId(req.body._id)
            console.log('this is the id after ObjectId function:',id)
        db.collection("manshour-app")
                .updateOne({number:req.body.number}, { $set: {textBody:req.body.textBody} },
                    function(er,r){
                    if(er){console.log('some error occurs during giving the response:',er)}
                   console.log('this is the text body updated:',req.body.textBody)
                    res.json({id:req.body._id});
                    });
    }

    });   
    });   
    router.get('/get',(req,res,next)=>{
        client.connect(function (er,client){
            const db=client.db("Manshours");
            db.collection("manshour-app").find({}).
                 toArray(function(er,doc){
                    if (er){'Errors in getting the data',er};
                    console.log('these are all the documents :',doc);
                    res.json(doc);
                 })
   
        })
    })     
router.delete('/delete-post',(req,res,next)=>{
    
       const db=client.db("Manshours");
        db.collection("manshour-app").deleteOne({ number: req.body.number }, function (er,r){
              if (er) throw er;
              console.log('Im in delete function')
            res.json({r})
        });
    
})
    

    module.exports=router;
