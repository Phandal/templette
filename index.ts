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

// Header
import './components/logo.js';
import './components/menu-bar.js';
import './components/header.js';

// SideCard
import './components/sidecard.js';

// Builder
import './components/input.js';
import './components/document-options.js';
import './components/element.js';
import './components/segment.js';
import './components/segment-list.js';
import './components/builder.js';

// BuilderEditor
import './components/builder-editor.js';

// App
import './components/app.js';

// Footer
import './components/footer.js';
