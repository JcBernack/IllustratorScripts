try {
    // check if document may be valid
    if (app.activeDocument.layers.length > 1) {
        throw new Error("Expected a document with just a single layer.");
    }
    #include "ConvertGroupsIntoLayers.jsx"
    var failLayer = app.activeDocument.layers[0];
    // convert the groups into actual layers
    var n = ConvertGroupsIntoLayers(failLayer, 0);
    // move them to the document
    var m = failLayer.layers.length;
    for (var i = failLayer.layers.length-1; i >= 0; i--) {
        failLayer.layers[i].move(failLayer.parent, ElementPlacement.PLACEATBEGINNING);
    }
    // remove the bad container layer
    failLayer.remove();
    alert("Converted " + n + " groups into layers\nand moved " + m + " layers to the document root.", "Success!");
} catch(e) {
    alert("Error: " + e.message);
}