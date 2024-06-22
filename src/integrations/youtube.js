export function openYoutubeModal(editorInstance) {
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = 'sampaadak-youtube';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  const inputLabel = document.createElement('label');
  inputLabel.textContent = 'Enter YouTube Video URL:';
  const input = document.createElement('input');
  input.type = 'text';
  input.value = '';

  // const widthLabel = document.createElement('label');
  // widthLabel.textContent = 'Width:';
  // const widthInput = document.createElement('input');
  // widthInput.type = 'text';

  const heightLabel = document.createElement('label');
  heightLabel.textContent = 'Height:';
  const heightInput = document.createElement('input');
  heightInput.type = 'text';
  heightInput.value = '500';

  const okButton = document.createElement('button');
  okButton.textContent = 'Ok';
  okButton.onclick = () => {
    const videoUrl = input.value.trim();
    const height = heightInput.value.trim();
    if (videoUrl && height) {
      insertYoutubeVideo(editorInstance, videoUrl, height);
      modalOverlay.remove();
    }
  };

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.onclick = () => {
    modalOverlay.remove();
  };

  modalContent.appendChild(inputLabel);
  modalContent.appendChild(input);
  modalContent.appendChild(heightLabel);
  modalContent.appendChild(heightInput);
  modalContent.appendChild(okButton);
  modalContent.appendChild(cancelButton);
  modal.appendChild(modalContent);

  modalOverlay.appendChild(modal);
  document.body.appendChild(modalOverlay);
}

export function insertYoutubeVideo(editorInstance, url, height) {
  if(!height) height = 500;
  editorInstance.chain().focus().setYoutubeVideo({ src: url, height: height }).run();
}
