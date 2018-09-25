module.exports.download = function(app, id, res){
    //console.log("PDFGen.download")
    
    this.createHTML(id)

    .then(html=>{

        return this.exportPDF(html, id)
    })
    
    .then((file)=>{
        //console.log("baixar")
        res.download(file, id+'.pdf', function(err){
            if (err) {
                console.log(err)
            } else {
                console.log("arquivo "+id+".pdf gerado")
            }
        });
    })
}

module.exports.createHTML = function(id){
    
    return new Promise((resolve, reject)=>{
        
        //console.log("PDFGen.createHTML")
        let html =

        '<html>'+
        '<head>'+
        '</head>'+
        '<body>'+
        '<h1>'+id+'</h1>'+
        '</body>'+
        '</html>'

        resolve(html)

    })
}

module.exports.exportPDF = function(html, id){

    return new Promise((resolve, reject)=>{

        //console.log("PDFGen.exportPDF", html)
        let pdf = require('html-pdf');
        let options =   { 
                        "format": 'A4',
                        "orientation" : 'landscape' 
                        };
        let file = 'app/pdf/'+id+'.pdf';
        
        pdf.create(html, options).toFile(file, function(err, res) {

            if (err) reject(err);
            else {
                console.log(res);
                resolve(res.filename)
            }
        });
    
    })

}