//Este es el código con el cual se inicializan las variables para convetir los PDF

function createPDF(){

    const info = {
        'First Name':['Jane'],
        'Last Name':['Doe'],
        'Quantity':['12'],
        'Address':['Guatemala'],
    }

    //Se declaran las variables para manipular el Drive
    const pdfFolder = DriveApp.getFolderById("1Hx2uyKM5vOswhsdJeCYYuJcwjl5JJTGH"); // Agregar el ID del URL
    const tempFolder = DriveApp.getFolderById("1AOiNVaVydND5CfIZLcMPtH_JyyjEIpCe"); // Agregar el ID del URL
    const templateDoc = DriveApp.getFileById("1pKZrM0x_plj1Cc1SEELvbrFHDePta9OP5bddDII8EKw"); // Agregar el ID del URL

    const newTempFile = templateDoc.makeCopy(tempFolder); // Crea una copia temporal de la plantilla

    const blobPDF = newTempFile.getAs(MimeType.PDF);
    const pdfFile = pdfFolder.createFile(blobPDF).setName("My PDF");

}