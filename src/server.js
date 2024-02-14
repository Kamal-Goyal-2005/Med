const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const mysql=require('mysql')


//define the express operation
const app=express();
const port=3000;


//defining the cors -cross origin by reciving the data in json format
app.use(cors());
app.use(bodyParser.json())




//establish the connection with the dB
const db=mysql.createConnection({
host:'localhost',
port:3306,
user:'root',
password:'root',
database:'db2'   
});




//verifying whether db is connected or not
db.connect(err=>{
if(err){
    console.error('connection is not established with the dB',err);
}
else{
    console.log('Connected to db')
}


});


app.listen(port,()=>{console.log('server port estbalished on 3000')})


//to get all the Medicines
app.get('/getMedicines',(req,res)=>{
const sql='select * from xxordermedicine';
db.query(sql,(err,result)=>{
    if(err){
    console.error('Error in fetching the Medicines',err);
    res.status(500).json({error:'An error occured'});
}else{
    res.status(200).json(result);
}


});
});
//to get a Medicine on id
app.get('/getMedicine/:id',(req,res)=>{
    const id=req.params.id;
    const sql='select * from xxordermedicine where id=?';
    db.query(sql,[id],(err,result)=>{
        if(err){
        console.error('Error in fetching the Medicines details',err);
        res.status(500).json({error:'An error occured'});
    }else{
        res.status(200).json(result);
    }
   
    });
    });
//to insert Medicine into db
app.post('/addMedicine',(req,res)=>{
    const {medicine_name,quantity,price,name,phone,address}=req.body;
    const sql='insert into xxordermedicine(medicine_name,quantity,price,name,phone,address) values(?,?,?,?,?,?)';
    db.query(sql,[medicine_name,quantity,price,name,phone,address],(err,result)=>{
        if(err){
            console.error('Error in adding the Medicine',err);
            res.status(500).json({error:'An error occured'});
        }else{
            res.status(200).json({message:'Medicine added successfully'});
        }


    });
    });

//updation of Medicine
app.put('/updateMedicine',(req,res)=>{
    const {id,medicine_name,quantity,price}=req.body;
    const sql='update xxordermedicine set medicine_name=?,quantity=?,price=? where id=?';
    db.query(sql,[medicine_name,quantity,price,id],(err,result)=>{
        if(err){
            console.error('Error in updating the Medicine',err);
            res.status(500).json({error:'An error occured'});
        }else{
            res.status(200).json({message:'Medicine updated successfully'});
        }


    });
    });
//deletion of Medicine
app.delete('/deleteMedicine/:id',(req,res)=>{
    const id=req.params.id;
    const sql='delete from xxordermedicine where id=?';
    db.query(sql,[id],(err,result)=>{
        if(err){
        console.error('Error in deleting the Medicine',err);
        res.status(500).json({error:'An error occured'});
    }else{
        res.status(200).json({message:'Medicine deleted successfully'});
    }
   
    });
    });

