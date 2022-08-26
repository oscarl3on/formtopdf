//Este es el código con el cual se inicializan las variables para convetir los PDF

function createPDF(){

    const info = {
        'OF-SIT-RCO-103-08-2022':['Jane'],
        'Correlativo: 30534-2022':['Doe'],
        'Guatemala, 19 de agosto 2022':['12'],
        'MP001-2022-23175':['Guatemala'],
        'IMEI':['Guatemala'],
        'Hora':['Guatemala'],
        'Resultado':['Guatemala'],
        'Realizado por':['Guatemala']
    };

    //Se declaran las variables para manipular el Drive
    const pdfFolder = DriveApp.getFolderById("1Hx2uyKM5vOswhsdJeCYYuJcwjl5JJTGH"); // Agregar el ID del URL
    const tempFolder = DriveApp.getFolderById("1AOiNVaVydND5CfIZLcMPtH_JyyjEIpCe"); // Agregar el ID del URL
    const templateDoc = DriveApp.getFileById("1pKZrM0x_plj1Cc1SEELvbrFHDePta9OP5bddDII8EKw"); // Agregar el ID del URL

    const newTempFile = templateDoc.makeCopy(tempFolder); // Crea una copia temporal de la plantilla

    const openDoc = DocumentApp.openById(newTempFile.getId()); // Abre el el doc y agrega la información al cuerpo.
    const body = openDoc.getBody();
    body.replaceText("{sitrco}", info['OF-SIT-RCO-103-08-2022'][0]); // Este dato debe coincidir con la constante info
    body.replaceText("{correlativo}", info['Correlativo: 30534-2022'][0]); // Este dato debe coincidir con la constante info
    body.replaceText("{fecha}", info['Guatemala, 19 de agosto 2022'][0]); 
    body.replaceText("{mp}", info['MP001-2022-23175'][0]);
    body.replaceText("{imei}", info['IMEI'][0]); 
    body.replaceText("{hora}", info['Hora'][0]); 
    body.replaceText("{resultado}", info['Resultado'][0]); 
    body.replaceText("{creado}", info['Realizado por'][0]);  
    openDoc.saveAndClose();

    const blobPDF = newTempFile.getAs(MimeType.PDF);
    const pdfFile = pdfFolder.createFile(blobPDF).setName("OFICIO");

}

//Correr la funcion createPDF y seguir el Paso2