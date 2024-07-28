export function markdownToPlainText(markdown) {
  // Remove headings
  let plainText = markdown?.replace(/^(#{1,6})\s*([^\n]+)/gm, "$2");

  // Remove bold and italic formatting
  plainText = plainText?.replace(/(\*\*|__)(.*?)\1/g, "$2");
  plainText = plainText?.replace(/(\*|_)(.*?)\1/g, "$2");

  // Remove strikethrough formatting
  plainText = plainText?.replace(/~~(.*?)~~/g, "$1");

  // Remove inline code
  plainText = plainText?.replace(/`(.*?)`/g, "$1");

  // Remove blockquotes
  plainText = plainText?.replace(/^\s{0,3}>\s?/gm, "");

  // Remove lists
  plainText = plainText?.replace(/^\s*[-+*]\s+/gm, "");
  plainText = plainText?.replace(/^\s*\d+\.\s+/gm, "");

  // Remove links but keep the link text
  plainText = plainText?.replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1");

  // Remove images
  plainText = plainText?.replace(/!\[([^\]]*)\]\([^\)]+\)/g, "$1");

  // Remove horizontal rules
  plainText = plainText?.replace(/^[-*]{3,}$/gm, "");

  // Remove code blocks
  plainText = plainText?.replace(/```[\s\S]*?```/g, "");

  // Remove extra line breaks
  plainText = plainText?.replace(/\n{2,}/g, "\n\n");

  return plainText;
}
