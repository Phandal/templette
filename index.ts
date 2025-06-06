import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';

// Setting things on the window object
window.MonacoEnvironment = {
  getWorker: async (_workerId: string, label: string) => {
    switch (label) {
      case 'json':
        return new jsonWorker();
      default:
        return new editorWorker();
    }
  },
};
// @ts-expect-error
monaco.languages.json.jsonDefaults.diagnosticsOptions.enableSchemaRequest = true;

// window.onbeforeunload = (e: Event) => {
//   e.preventDefault();
// };

// Header
import './components/logo.js';
import './components/menu-bar.js';
import './components/header.js';

// Sidecards
import './components/filter.js';
import './components/repetition.js';
import './components/segment-editor.js';
import './components/element-editor.js';

// Builder
import './components/input.js';
import './components/document-options.js';
import './components/element.js';
import './components/segment.js';
import './components/element-list.js';
import './components/segment-list.js';
import './components/builder.js';

// IO
import './components/editor.js';
import './components/io.js';

// App
import './components/app.js';

// Footer
import './components/footer.js';
