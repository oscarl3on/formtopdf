//Se crea el codigo para enviar por correo el PDF.

function afterFormSubmit(e){

    const info = e.namedValues;
    createPDF(info);

}

function createPDF(info){

    //Se declaran las variables para manipular el Drive
    const pdfFolder = DriveApp.getFolderById("1Hx2uyKM5vOswhsdJeCYYuJcwjl5JJTGH"); // Agregar el ID del URL
    const tempFolder = DriveApp.getFolderById("1AOiNVaVydND5CfIZLcMPtH_JyyjEIpCe"); // Agregar el ID del URL
    const templateDoc = DriveApp.getFileById("1pKZrM0x_plj1Cc1SEELvbrFHDePta9OP5bddDII8EKw"); // Agregar el ID del URL

    const newTempFile = templateDoc.makeCopy(tempFolder); // Crea una copia temporal de la plantilla

    const openDoc = DocumentApp.openById(newTempFile.getId()); // Abre el el doc y agrega la información al cuerpo.
    const body = openDoc.getBody();
    body.replaceText("{fn}", info['First Name'][0]); // Este dato debe coincidir con la constante info
    body.replaceText("{ln}", info['Last Name'][0]); // Este dato debe coincidir con la constante info
    body.replaceText("{qty}", info['Quantity'][0]); // Este dato debe coincidir con la constante info
    body.replaceText("{addr}", info['Address'][0]); // Este dato debe coincidir con la constante info
    openDoc.saveAndClose();

    const blobPDF = newTempFile.getAs(MimeType.PDF);
    const pdfFile = pdfFolder.createFile(blobPDF).setName(info['First Name'][0] + " " + info['Last Name'][0] + " " + new Date());
    tempFolder.removeFile(newTempFile);

}

//Correr la funcion createPDF y seguir el Paso3