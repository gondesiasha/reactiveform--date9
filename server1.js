var hapi=require('@hapi/hapi');
require("dotenv").config();
var mysql=require('mysql');
var Joi=require('@hapi/joi');



var server=new hapi.Server({
    host:'localhost',
    port:9100,
    routes : {
            cors : true
        }
});

server.route({
    method:"GET",
    path:"/api/data",
    handler:(request,reply)=>{
      return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_NAME
              });
              connection.connect();
              connection.query(`SELECT * from studentdata`, function (error,data, fields) {
                if (error) reject(error);
                resolve(data);
              }); 
              connection.end();
        })
      } 
});

server.route({
    method:"POST",
    path:"/api/data",
    options:{
        validate:{
            payload:{
                name:Joi.string().min(4).required(),
                lastName:Joi.string().min(4).required(),
                email:Joi.string().email().required(),
                dob:Joi.string().required(),
                gender:Joi.string().required(),
                mobile:Joi.number().min(10).required(),
                land:Joi.string().min(10).required(),
                college:Joi.string().required(),
                address:Joi.string().required(),
                state:Joi.string().required()
            }
        }
    },
   
    handler:(request,reply)=>{        
    
        var newstudentdata=request.payload;
            return new Promise((resolve,reject)=>{
                var connection = mysql.createConnection({
                    host     : process.env.DB_HOST,
                    user     : process.env.DB_USER,
                    password : process.env.DB_PASSWORD,
                    database : process.env.DB_NAME
                  });
                  connection.connect();
         
                  connection.query(`INSERT INTO studentdata(name,lastName,email,dob,gender,mobile,land,college,address,state) VALUES('${newstudentdata.name}',  '${newstudentdata.lastName}','${newstudentdata.email}',
                  '${newstudentdata.dob}','${newstudentdata.gender}','${newstudentdata.mobile}','${newstudentdata.land}',
                  '${newstudentdata.college}','${newstudentdata.address}','${newstudentdata.state}')`, function (error, data, fields) {
                    if (error) reject(error);
                    resolve(data);
                  });
                   
                  connection.end();
            })
            
        }
    
        
    });



server.start((err)=>{
    if(err) throw err;
    
})
console.log("Server is started"+ server.info.uri)
