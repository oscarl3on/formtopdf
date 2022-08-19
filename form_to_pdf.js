//Crea el PDF tomando del archivo de excel la información, ejecutado desde el Appscritp. 

function createPDF(){
    const info = {
        'First Name':['Jane'],
        'Last Name':['Doe'],
        'Shipping Address':['123 Michigan Ave Chicago IL'],
        'Quantity Required':['45']
    };

    const pdfFolder = DriveApp.getFolderById("1gnYP99PiT0ci0Avgmq8nFkKblKVEMmoe");
    const tempFolder = DriveApp.getFolderById("1X9MbFhG-Ui61CzFbXYr7NlSiy4vpLNEE");
    const templateDoc = DriveApp.getFileById("1yCrcWoqaxc_SMeczvzmL8LKnDxUnBIPGVaOoM6R2IfM");

    const newTempFile = templateDoc.makeCopy(tempFolder);

    const openDoc = DocumentApp.openById(newTempFile.getId());
    const body = openDoc.getBody();
    body.replaceText("{fn}", info['First Name'][0]);
    body.replaceText("{ln}", info['Last Name'][0]);
    body.replaceText("{addr}", info['Shipping Address'][0]);
    body.replaceText("{qty}", info['Quantity Required'][0]);
    openDoc.saveAndClose();

    const blobPDF = newTempFile.getAs(MimeType.PDF);
    const pdfFile = pdfFolder.createFile(blobPDF).setName("My PDF");
}