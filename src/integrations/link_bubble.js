export function createLinkOverlay(editor) {
    const overlay = document.createElement('div');
    overlay.classList.add('link-overlay');
  
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter link URL';
  
    const button = document.createElement('button');
    button.textContent = 'OK';
  
    overlay.appendChild(input);
    overlay.appendChild(button);
  
    button.onclick = () => {
      const linkUrl = input.value.trim();
      if (linkUrl) {
        editor.commands.setLink({ href: linkUrl });
        overlay.remove();
      }
    };
  
    document.body.appendChild(overlay);
  
    return overlay;
  }