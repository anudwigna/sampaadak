import { Extension } from '@tiptap/core';
import { TextStyle } from '@tiptap/extension-text-style';  // Import TextStyle extension

const FontSelector = Extension.create({
  name: 'fontSelector',

  addOptions() {
    return {
      defaultFont: 'Arial, sans-serif',
      fonts: [
        { name: 'Arial', css: 'Arial, sans-serif' },
        { name: 'Courier New', css: 'Courier New, monospace' },
        { name: 'Georgia', css: 'Georgia, serif' },
        { name: 'Times New Roman', css: 'Times New Roman, serif' },
        { name: 'Verdana', css: 'Verdana, sans-serif' },
      ],
    };
  },

  addCommands() {
    return {
      setFont: (font) => ({ chain }) => {
        return chain().setAttributes('textStyle', { fontFamily: font }).run(); 
      },
    };
  },
});

export default FontSelector;
