try {
    // check if any documents are open
    if (app.documents.length == 0) throw new Error("No open documents.");
    // set up save options
    var options = new ExportOptionsSVG();
    options.fontSubsetting = SVGFontSubsetting.None;
    options.fontType = SVGFontType.SVGFONT;
    // prepare regular expressions
    var regenechsen = new Array();
    regenechsen[0] = { expression: /font-family:'([^']*)';/g, replace: "font-family:$1;" };
    regenechsen[1] = { expression: /ArialMT/g, replace: "Arial" };
    // save all documents as svg
    var n = app.documents.length;
    for (var i = n-1; i >= 0; i--) {
        var doc = app.documents[i];
        // save current document
        doc.save();
        // export document to svg
        var orgFilename = new String(doc.fullName);
        var exportFile = new File(orgFilename.substr(0, orgFilename.lastIndexOf('.')) + ".svg");
        doc.exportFile(exportFile, ExportType.SVG, options);
        // close the document to prevent accidentally editing the svg instead of the ai file
        doc.close(SaveOptions.DONOTSAVECHANGES);
        // read all contents of the svg file
        exportFile.open("r");
        var svgContent = exportFile.read();
        exportFile.close();
        // string replace with regular expressions
        for (var j = 0; j < regenechsen.length; j++) {
            svgContent =svgContent.replace(regenechsen[j].expression, regenechsen[j].replace);
        }
        // overwrite svg with results
        exportFile.open("w");
        exportFile.write(svgContent);
        exportFile.close();
    }
    alert("Saved " + n + " files as SVG.", "Success!");
} catch (e) {
    alert("Error: " + e.message);
}