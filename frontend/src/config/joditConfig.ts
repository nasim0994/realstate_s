export const JODIT_CONFIG: any = {
  readonly: false,
  height: 450,
  width: "auto",
  toolbarSticky: false,
  theme: "default",
  statusbar: false,

  // Image Upload Handling
  uploader: {
    insertImageAsBase64URI: true,
  },

  buttons: [
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "|",
    "ul",
    "ol",
    "|",
    "font",
    "fontsize",
    "brush",
    "paragraph",
    "|",
    "image",
    "table",
    "link",
    "|",
    "align",
    "undo",
    "redo",
    "|",
    "hr",
    "eraser",
    "fullsize",
    "source",
  ],

  // Image popup configuration
  popup: {
    image: [
      "image",
      "|",
      "alignleft",
      "aligncenter",
      "alignright",
      "|",
      "image-properties",
      "delete",
    ],
  },

  // Extras
  showXPathInStatusbar: false,
  askBeforePasteHTML: false,
  askBeforePasteFromWord: false,
  defaultActionOnPaste: "insert_clear_html",

  // Text style options
  style: {
    fontFamily: "Inter, sans-serif",
    fontSize: "14px",
  },
};
