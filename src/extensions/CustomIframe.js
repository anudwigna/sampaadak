// src/CustomIframe.js

import { Node } from '@tiptap/core';

export default Node.create({
  name: 'customIframe',
  group: 'block',
  content: 'inline*',

  parseHTML() {
    return [
      {
        tag: 'div.custom-iframe',
        contentElement: 'iframe',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['iframe', { ...HTMLAttributes, class: 'custom-iframe' }, 0];
  },

  addAttributes() {
    return {
      src: {
        default: '',
      },
      width: {
        default: '',
      },
      height: {
        default: '',
      },
    };
  },

  addCommands() {
    return {
      setIframe: attributes => ({ commands }) => {
        return commands.insertContent({
          type: 'customIframe',
          attrs: attributes,
          content: [],
        });
      },
    };
  },
});
