const { selection } = figma.currentPage;
function clone(val) {
    return JSON.parse(JSON.stringify(val));
}
selection.forEach(async (textNode) => {
    if (textNode.type === "TEXT") {
        await figma.loadFontAsync(textNode.fontName);
        const makeTextStyle = figma.createTextStyle();
        let textStyle = textNode.fontName;
        // figma.notify(textStyle.family + " " + textStyle.style);
        if (textNode.fontName !== figma.mixed) {
            makeTextStyle.fontName = {
                family: textStyle.family,
                style: textStyle.style,
            };
            figma.notify(`${selection.length} Text Styles created`);
        }
        if (textNode.fontName === figma.mixed) {
            figma.notify("Cannot assign Text Style, please ensure selection contains only a single font style");
        }
        makeTextStyle.name = textNode.name;
        makeTextStyle.lineHeight =
            textNode.lineHeight !== figma.mixed ? textNode.lineHeight : null;
        makeTextStyle.letterSpacing =
            textNode.letterSpacing !== figma.mixed ? textNode.letterSpacing : null;
        makeTextStyle.paragraphIndent = textNode.paragraphIndent;
        makeTextStyle.paragraphSpacing = textNode.paragraphSpacing;
        makeTextStyle.textCase =
            textNode.textCase !== figma.mixed ? textNode.textCase : null;
        makeTextStyle.textDecoration =
            textNode.textDecoration !== figma.mixed ? textNode.textDecoration : null;
        makeTextStyle.description = textNode.characters;
        makeTextStyle.fontSize =
            textNode.fontSize !== figma.mixed ? textNode.fontSize : null;
    }
    Promise.resolve("Done").then((msg) => figma.closePlugin(msg));
    return;
});
