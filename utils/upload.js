const formidable = require('formidable');
const path = require('path');

function upload(ctx){
  return new Promise((resolve,reject)=>{
    let form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname,'../','uploads','user');
    form.keepExtensions = true;
    form.parse(ctx.req, (err, fields, files) => {
      if(err){
        reject(err);
      } else {
        resolve(files);
      }      
    });
  })
}

module.exports = upload;