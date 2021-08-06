const { selection } = figma.currentPage;

selection.forEach(async (textNode): Promise<string> => {
  if (textNode.type === "TEXT") {
    await figma.loadFontAsync(textNode.fontName as FontName);
    const makeTextStyle = figma.createTextStyle();
    let textStyle = textNode.fontName;
    if (textNode.fontName !== figma.mixed) {
      makeTextStyle.fontName = {
        family: (textStyle as FontName).family,
        style: (textStyle as FontName).style,
      };
      figma.notify(`${selection.length} Text Styles created`);
    }
    if (textNode.fontName === figma.mixed) {
      figma.notify(
        "Cannot assign Text Style, please ensure selection contains only a single font style"
      );
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
  Promise.resolve("Done").then(() => figma.closePlugin());
  return;
});
