function onOpen(e){
    var ssId = SpreadsheetApp.getActiveSpreadsheet().getId();
    
    ScriptApp.newTrigger("makeDropDownMenu")
        .forSpreadsheet(ssId)
        .onOpen()
        .create();
    
    }