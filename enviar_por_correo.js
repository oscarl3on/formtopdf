function afterFormSubmit(e) {
    const info = e.namedValues;
    const pdfFile = createPDF(info);
    const entryRow = e.range.getRow();
    const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("People");
    ws.getRange(entryRow, 7).setValue(pdfFile.getUrl());
    ws.getRange(entryRow, 8).setValue(pdfFile.getName());
  
    sendEmail(e.namedValues['email'][0],pdfFile);
  }
  
  function sendEmail(email,pdfFile){
  
    GmailApp.sendEmail(email, "Su OFICIO a sido creado con éxito", "Gracias por utilizar este servicio, hemos adjuntado a este correo el PDF correspondiente a su OFICIO.", {
      attachments: [pdfFile],
      name:'RCO Generador de OFICIOS'
    });
  
  }
  
  function createPDF(info){
  
      const pdfFolder = DriveApp.getFolderById("1gnYP99PiT0ci0Avgmq8nFkKblKVEMmoe");
      const tempFolder = DriveApp.getFolderById("1X9MbFhG-Ui61CzFbXYr7NlSiy4vpLNEE");
      const templateDoc = DriveApp.getFileById("1yCrcWoqaxc_SMeczvzmL8LKnDxUnBIPGVaOoM6R2IfM");
  
      const newTempFile = templateDoc.makeCopy(tempFolder);
  
      const openDoc = DocumentApp.openById(newTempFile.getId());
      const body = openDoc.getBody();
      body.replaceText("{fn}", info['Nombre'][0]);
      body.replaceText("{ln}", info['Apellido'][0]);
      body.replaceText("{addr}", info['IMEI'][0]);
      body.replaceText("{qty}", info['MPE'][0]);
      openDoc.saveAndClose();
  
      const blobPDF = newTempFile.getAs(MimeType.PDF);
      const pdfFile = pdfFolder.createFile(blobPDF).setName(info['Nombre'][0] + " " + info['Apellido'][0] + " " + new Date());
      tempFolder.removeFile(newTempFile);
  
      return pdfFile;
  }

  //Activar permisos en google
  //https://www.mejorcodigo.com/p/74669.html