export function openImageModal(editorInstance) {
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';

  const modal = document.createElement('div');
  modal.id = 'sampaadak-image-modal';
  modal.className = 'modal';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';

  const widthLabel = document.createElement('label');
  widthLabel.textContent = 'Width:';
  const widthInput = document.createElement('input');
  widthInput.type = 'text';

  const heightLabel = document.createElement('label');
  heightLabel.textContent = 'Height:';
  const heightInput = document.createElement('input');
  heightInput.type = 'text';

  const alignLabel = document.createElement('label');
  alignLabel.textContent = 'Alignment:';
  const alignSelect = document.createElement('select');
  const alignments = ['Left', 'Center', 'Right'];
  alignments.forEach(alignment => {
    const option = document.createElement('option');
    option.value = alignment.toLowerCase();
    option.textContent = alignment;
    alignSelect.appendChild(option);
  });

  const okButton = document.createElement('button');
  okButton.textContent = 'Ok';
  okButton.onclick = () => {
    const file = fileInput.files[0];
    const width = widthInput.value.trim();
    const height = heightInput.value.trim();
    const alignment = alignSelect.value;
    
    if (file) {
      uploadImage(editorInstance, file, width, height, alignment);
      modalOverlay.remove();
    }
  };

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.onclick = () => {
    modalOverlay.remove();
  };

  modalContent.appendChild(fileInput);
  modalContent.appendChild(widthLabel);
  modalContent.appendChild(widthInput);
  modalContent.appendChild(heightLabel);
  modalContent.appendChild(heightInput);
  modalContent.appendChild(alignLabel);
  modalContent.appendChild(alignSelect);
  modalContent.appendChild(okButton);
  modalContent.appendChild(cancelButton);
  modal.appendChild(modalContent);

  modalOverlay.appendChild(modal);
  document.body.appendChild(modalOverlay);
}

function uploadImage(editorInstance, file, width = '', height = '', alignment = 'center') {
  const reader = new FileReader();
  reader.onload = function(event) {
    const imageUrl = event.target.result;
    insertImage(editorInstance, imageUrl, width, height, alignment);
  };
  reader.readAsDataURL(file);
}

export function insertImage(editorInstance, url, width = '', height = '', alignment = 'center') {
  console.log("INSERT_IMAGE_CALLED");
  editorInstance.chain().focus().setImage({ src: url, alt: 'Image', width, height, alignment }).run();
}
