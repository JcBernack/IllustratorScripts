try {
    // check if any documents are open
    if (app.documents.length == 0) throw new Error("No open documents.");
    // set up save options
    var options = new ExportOptionsSVG();
    options.fontSubsetting = SVGFontSubsetting.None;
    options.fontType = SVGFontType.SVGFONT;
    // what does this do? =)
    //options.sVGAutoKerning = true;
    // save all documents as svg
    for (var i = 0; i < app.documents.length; i++) {
        var doc = app.documents[i];
        var exportFile = new File(doc.name.substr(0, doc.name.lastIndexOf('.')));
        doc.exportFile(exportFile, ExportType.SVG, options);
    }
    alert("Saved " + app.documents.length + " files as SVG.", "Success!");    
} catch (e) {
    alert("Error: " + e.message);
}