import SampaadakEditor from "..";
import StateManager from "../helpers/stateManager";

const stateManager = new StateManager();

export function openDistractionFreeOverlay(oldEditor) {
  stateManager.setState({ editor: oldEditor });

  const overlay = document.createElement("div");
  overlay.className = "sampaadak-df-overlay";

  const editorContainer = document.createElement('div');
  editorContainer.className = 'sampaadak-df-overlay-content';
  overlay.appendChild(editorContainer);

  const overlayEditor = new SampaadakEditor(editorContainer, { 
    content: oldEditor.getHTML(),
    distractionFree: true
  });

  document.body.appendChild(overlay);
}

export function closeDistractionFreeOverlay (overlayEditor) {
  const overlayContent = overlayEditor.getHTML();
  const state = stateManager.getState();
  const oldEditor = state.editor;
  
  oldEditor.commands.setContent(overlayContent);

  const elements = document.querySelector('.sampaadak-df-overlay');
  document.body.removeChild(elements);

  overlayEditor.destroy();
}