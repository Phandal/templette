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
import './components/logo/logo.component.js';
import './components/menu-bar/menu-bar.component.js';
import './components/header/header.component.js';

// SideCard
import './components/sidecard/sidecard.component.js';

// Builder
import './components/input/input.component.js';
import './components/document-options/document-options.component.js';
import './components/element/element.component.js';
import './components/segment/segment.component.js';
import './components/segment-list/segment-list.component.js';
import './components/builder/builder.component.js';

// BuilderEditor
import './components/builder-editor/builder-editor.component.js';

// App
import './components/app/app.component.js';

// Footer
import './components/footer/footer.component.js';
