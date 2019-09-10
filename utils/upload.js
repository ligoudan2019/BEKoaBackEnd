const formidable = require('formidable');
const path = require('path');

function upload(ctx,target = 'user'){
  return new Promise((resolve,reject)=>{
    let form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname,'../','uploads', target);
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