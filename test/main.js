const MyTiptapWrapper = require('./dist/bundle.js');

document.addEventListener('DOMContentLoaded', () => {
  const editorElement = document.getElementById('editor');
  
  const myEditor = MyTiptapWrapper(editorElement, {
    content: '<p>Initial content</p>'
  });

  // You can add additional tests or methods here
  console.log(myEditor.getContent());
});
