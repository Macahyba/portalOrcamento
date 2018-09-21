module.exports.download = function(app, id, res){
    console.log("PDFGen.download")
    let file = this.createHTML(app, id);
    res.download(file, id+'.pdf', function(err){
        if (err) {
            console.log("opa "+err)
        } else {
            console.log("arquivo "+id+" gerado")
        }
      });
}

module.exports.createHTML = function(app, id){
    console.log("PDFGen.createHTML")
    let html =

    '<html>'+
    '<head>'+
    '</head>'+
    '<body>'+
    '<h1>'+id+'</h1>'+
    '</body>'+
    '</html>'

    return this.exportPDF(html, id);
}

module.exports.exportPDF = function(html, id){
    console.log("PDFGen.exportPDF", html)
    let pdf = require('html-pdf');
    let options = { format: 'Portrait' };
    let file = 'app/pdf/'+id+'.pdf';
     
    pdf.create(html, options).toFile(file, function(err, res) {
      if (err) return console.log(err);
      console.log(res);
      //return file
    });
    
    return file;

}