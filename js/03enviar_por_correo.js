//Se crea el codigo para enviar por correo el PDF.
//Crear otra hoja en el Google Sheet, para colocar los links
//Agregar la formula =ARRAYFORMULA('Respuestas de formulario 1'!A2:E)
//Ejecutar la funcion enviar EMAIL

function afterFormSubmit(e){

    const info = e.namedValues;
    const pdfFile = createPDF(info);
    const entryRow = e.range.getRow();
    const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("People");
    ws.getRange(entryRow, 6).setValue(pdfFile.getUrl());
    ws.getRange(entryRow, 7).setValue(pdfFile.getName());

    sendEmail(e.namedValues['email'][0],pdfFile);
}

function sendEmail(email,pdfFile){
    GmailApp.sendEmail(email,"Este es el oficio que has creado","Descargue el adjunto",{
        attachments: [pdfFile],
        name: 'Registro de Comercializadores'
    });
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
    return pdfFile;

}

//Correr la funcion createPDF y seguir el Paso