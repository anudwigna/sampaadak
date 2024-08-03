import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Youtube from '@tiptap/extension-youtube';
import Image from '@tiptap/extension-image';
import ImageResize from 'tiptap-extension-resize-image';
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import { openYoutubeModal } from './integrations/youtube'; 
import { openImageModal } from './integrations/image';
import {openDistractionFreeOverlay, closeDistractionFreeOverlay} from './integrations/distraction-free';

import './styles/sampaadak.css';  
import './styles/sampaadak-youtube.css';
import './styles/sampaadak-image.css';
import './styles/sampaadak-distractionfree.css';
import './styles/sampaadak-table.css';

class SampaadakEditor {
  constructor(element, options = {}) {
    //Distraction free mode flag
    this.distractionFree = options.distractionFree || false;

    this.editor = new Editor({
      element,
      extensions: [
        StarterKit,
        Youtube,
        Image.configure({
          inline: true, 
          resizable: true, 
          alignable: true, 
        }),
        ImageResize,
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableHeader,
        TableCell,
        TextStyle.configure({
          fontFamily: 'Arial, sans-serif',
        }),
        ...(options.extensions || [])
      ],
      content: options.content || '<p style="font-family: Arial, sans-serif;">Initial content</p>'
    });

    this.createToolbar(element);
    this.createTableToolbar(element);
  }

  getEditor() {
    return this.editor;
  }

  destroy() {
    this.editor.destroy();
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
      { command: () => this.editor.commands.toggleBold(), label: 'Bold', icon: 'format_bold', name: 'bold'},
      { command: () => this.editor.commands.toggleItalic(), label: 'Italic', icon: 'format_italic', name: 'italic'},
      //{ command: () => this.editor.commands.toggleUnderline(), label: 'Underline', icon: 'format_underline' },
      { command: () => this.editor.commands.toggleStrike(), label: 'Strike', icon: 'format_strikethrough', name: 'strike'},
      //{ command: () => this.editor.commands.toggleCode(), label: 'Code', icon: 'code' },
      { command: () => this.editor.commands.toggleBulletList(), label: 'Bullet List', icon: 'format_list_bulleted', name: 'bullet_list' },
      { command: () => this.editor.commands.toggleOrderedList(), label: 'Ordered List', icon: 'format_list_numbered', name: 'ordered_list'},
      { command: () => this.editor.commands.toggleOrderedList(), label: 'Table', icon: 'tablet', name: 'table'},
      //{ command: () => this.editor.commands.toggleBlockquote(), label: 'Blockquote', icon: 'format_quote' },
      { command: () => this.editor.commands.setHorizontalRule(), label: 'Horizontal Rule', icon: 'horizontal_rule', name: 'horizontal_rule'},
      { command: () => this.editor.commands.setHardBreak(), label: 'Hard Break', icon: 'keyboard_return', name: 'hard_break'},
      { command: () => openImageModal(this.editor), label: 'Insert Image', icon: 'image', name: 'image'}, 
      { command: () => openYoutubeModal(this.editor), label: 'Insert YouTube Video', icon: 'video_library', name: 'youtube'},
      { command: () => openDistractionFreeOverlay(this.editor), label: 'Distraction Free', icon: 'fullscreen', name: 'distraction_free'},
      { command: () => closeDistractionFreeOverlay(this.editor), label: 'Distraction Free Exit', icon: 'fullscreen_exit', name: 'distraction_free_exit'},
    ];

    buttons.forEach(btn => {
      const button = document.createElement('button');
      button.innerHTML = `<span class="material-icons">${btn.icon}</span>`;
      button.title = btn.label;
      button.onclick = btn.command;
      button.setAttribute('type', 'button');
      toolbar.appendChild(button);

      if(btn.name === 'distraction_free' && this.distractionFree) {
        button.style.display = 'none';
      }

      if(btn.name === 'distraction_free_exit' && !this.distractionFree) {
        button.style.display = 'none';
      }
    });

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
      button.setAttribute('type', 'button');
      button.onclick = btn.command;
      formatDropdownContent.appendChild(button);
    });

    formatDropdown.appendChild(formatDropdownContent);
    toolbar.appendChild(formatDropdown);
  }

  createTableToolbar(containerElement) {
    const tableToolbar = document.createElement('div');
    tableToolbar.className = 'sampaadak-table-toolbar';
    containerElement.insertAdjacentElement('beforebegin', tableToolbar);
  
    const tableButtons = [
      { command: () => this.editor.commands.insertTable({ rows: 3, cols: 3, withHeaderRow: true }), label: 'Insert Table', icon: 'backup_table' },
      { command: () => this.editor.commands.addColumnBefore(), label: 'Add Column Before', icon: 'west' },
      { command: () => this.editor.commands.addColumnAfter(), label: 'Add Column After', icon: 'east' },
      { command: () => this.editor.commands.deleteColumn(), label: 'Delete Column', icon: 'remove_circle' },
      { command: () => this.editor.commands.addRowBefore(), label: 'Add Row Before', icon: 'arrow_circle_up' },
      { command: () => this.editor.commands.addRowAfter(), label: 'Add Row After', icon: 'arrow_circle_down' },
      { command: () => this.editor.commands.deleteRow(), label: 'Delete Row', icon: 'remove_circle_outline' },
    ];
  
    tableButtons.forEach(btn => {
      const button = document.createElement('button');
      button.innerHTML = `<span class="material-icons">${btn.icon}</span>`;
      button.title = btn.label;
      button.onclick = btn.command;
      button.setAttribute('type', 'button');
      button.classList.add('table-toolbar-button');
      tableToolbar.appendChild(button);
    });
  }
}

export default SampaadakEditor;
