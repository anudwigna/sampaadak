import { Extension } from '@tiptap/core';

const FontSelector = Extension.create({
  name: 'fontSelector',

  addOptions() {
    return {
      defaultFont: 'Arial, sans-serif',
      fonts: [
        { name: 'Arial', css: 'font-family: Arial, sans-serif;' },
        { name: 'Courier New', css: 'font-family: Courier New, monospace;' },
        { name: 'Georgia', css: 'font-family: Georgia, serif;' },
        { name: 'Times New Roman', css: 'font-family: Times New Roman, serif;' },
        { name: 'Verdana', css: 'font-family: Verdana, sans-serif;' },
      ],
    };
  },

  addCommands() {
    return {
      setFont: (font) => ({ chain }) => {
        return chain().setMark('textStyle', { style: font }).run();
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            // Set default font style when the editor is created
            create: () => {
              this.editor.commands.setFont(this.options.defaultFont);
              return false;
            },
          },
        },
      }),
    ];
  },
});

export default FontSelector;
