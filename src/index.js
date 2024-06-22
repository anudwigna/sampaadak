import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
//import CustomIframe from './extensions/CustomIframe';
import Youtube from '@tiptap/extension-youtube';
import { openYoutubeModal } from './integrations/youtube'; 
import './styles/sampaadak.css';  
import './styles/sampaadak-youtube.css';

class SampaadakEditor {
  constructor(element, options = {}) {
    // Create the editor
    this.editor = new Editor({
      element,
      extensions: [
        StarterKit,
        Youtube,
        //CustomIframe,
        TextStyle.configure({
          fontFamily: 'Arial, sans-serif', // Set default font
        }),
        ...(options.extensions || [])
      ],
      content: options.content || '<p style="font-family: Arial, sans-serif;">Initial content</p>'
    });

    // Create the toolbar
    this.createToolbar(element);
  }

  getEditor() {
    return this.editor;
  }

  destroy() {
    this.editor.destroy();
  }

  customMethod() {
    console.log('This is a custom method');
  }

  setContent(content) {
    this.editor.commands.setContent(content);
  }

  getContent() {
    return this.editor.getHTML();
  }

  createToolbar(containerElement) {
    const toolbar = document.createElement('div');
    toolbar.className = 'sampaadak-toolbar';
    containerElement.insertAdjacentElement('beforebegin', toolbar);

    const buttons = [
      { command: () => this.editor.commands.toggleBold(), label: 'Bold', icon: 'format_bold' },
      { command: () => this.editor.commands.toggleItalic(), label: 'Italic', icon: 'format_italic' },
      { command: () => this.editor.commands.toggleUnderline(), label: 'Underline', icon: 'format_underline' },
      { command: () => this.editor.commands.toggleStrike(), label: 'Strike', icon: 'format_strikethrough' },
      { command: () => this.editor.commands.toggleCode(), label: 'Code', icon: 'code' },
      { command: () => this.editor.commands.toggleBulletList(), label: 'Bullet List', icon: 'format_list_bulleted' },
      { command: () => this.editor.commands.toggleOrderedList(), label: 'Ordered List', icon: 'format_list_numbered' },
      { command: () => this.editor.commands.toggleBlockquote(), label: 'Blockquote', icon: 'format_quote' },
      { command: () => this.editor.commands.setHorizontalRule(), label: 'Horizontal Rule', icon: 'horizontal_rule' },
      { command: () => this.editor.commands.setHardBreak(), label: 'Hard Break', icon: 'keyboard_return' },
      { command: () => openYoutubeModal(this.editor), label: 'Insert YouTube Video', icon: 'video_library' },
    ];

    buttons.forEach(btn => {
      const button = document.createElement('button');
      button.innerHTML = `<span class="material-icons">${btn.icon}</span>`;
      button.title = btn.label;
      button.onclick = btn.command;
      toolbar.appendChild(button);
    });

    // Create dropdown button for Paragraph, Heading 1, and Heading 2
    const formatDropdown = document.createElement('div');
    formatDropdown.className = 'dropdown';

    const formatDropdownButton = document.createElement('button');
    formatDropdownButton.className = 'dropdown-button';
    formatDropdownButton.innerHTML = 'Format <span class="material-icons">arrow_drop_down</span>';
    formatDropdown.appendChild(formatDropdownButton);

    const formatDropdownContent = document.createElement('div');
    formatDropdownContent.className = 'dropdown-content';

    const formatButtons = [
      { command: () => this.editor.commands.setParagraph(), label: 'Paragraph', icon: 'format_textdirection_l_to_r' },
      { command: () => this.editor.commands.toggleHeading({ level: 1 }), label: 'Heading 1', icon: 'looks_one' },
      { command: () => this.editor.commands.toggleHeading({ level: 2 }), label: 'Heading 2', icon: 'looks_two' },
    ];

    formatButtons.forEach(btn => {
      const button = document.createElement('button');
      button.innerHTML = `<span class="material-icons">${btn.icon}</span> ${btn.label}`;
      button.title = btn.label;
      button.onclick = btn.command;
      formatDropdownContent.appendChild(button);
    });

    formatDropdown.appendChild(formatDropdownContent);
    toolbar.appendChild(formatDropdown);
  }
}

export default SampaadakEditor;