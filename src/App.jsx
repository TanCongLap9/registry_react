/* eslint-disable react/function-component-definition */
import React, { useEffect, useReducer } from 'react';
import { any, objectOf, instanceOf } from 'prop-types';
import { EditorView, minimalSetup } from 'codemirror';
import {
  lineNumbers,
  highlightActiveLine,
  highlightActiveLineGutter,
  ViewPlugin
} from '@codemirror/view';
import REGISTRY_DATA_SAMPLE from './registry_data_sample';
import { ContextMenu } from './registry_context_menu';
import { RegKey } from './registry_output';
import { ReducerContext, contentReducer } from './registry_reducer';

let /** @type {EditorView} */ editor;

// import {interpretRegistry} from "./registry_algos.js";

// COMPONENTS
const RegistryTextInput = () => (
  <div id="input-content">
    <h2>Input your registry data here</h2>
    <div id="text-input" className="flex-row">
      <div id="content" />
    </div>
  </div>
);
const RegistryFileInput = () =>
{
  const handleChange = (e) =>
  {
    e.target.files[0].text()
      .then((content) =>
      {
        editor.dispatch({
          changes: {
            from: 0,
            to: editor.state.doc.length,
            insert: content
          }
        });
      });
  };
  return (
    <div id="input-file">
      <h2>Or import a file</h2>
      <input
        type="file"
        id="registry-file"
        onChange={handleChange}
      />
    </div>
  );
};

const App = () =>
{
  // <!-- Key: li.key ul -->
  // <!-- Value: li.data -->
  const [state, dispatch] = useReducer(contentReducer, {
    content: REGISTRY_DATA_SAMPLE,
    tree: null,
    context: null,
    contextType: null,
    show: false,
    error: null
  });
  function updateContent()
  {
    dispatch({
      type: 'SET_CONTENT',
      content: editor.state.doc.toString()
    });
  }
  useEffect(() =>
  {
    if (editor) return;
    editor = new EditorView({
      doc: REGISTRY_DATA_SAMPLE,
      extensions: [
        minimalSetup,
        lineNumbers(),
        highlightActiveLine(),
        highlightActiveLineGutter(),
        // Listens to changes
        ViewPlugin.fromClass(class
        {
          // eslint-disable-next-line no-useless-constructor, no-empty-function
          constructor(/** @type {EditorView} */ view) { }

          // eslint-disable-next-line class-methods-use-this
          update(/** @type {ViewUpdate} */ update)
          {
            if (update.docChanged) updateContent();
          }
        })
      ],
      parent: document.querySelector('#content')
    });
    updateContent();
  }, [editor]);
  return (
    <ReducerContext.Provider value={[state, dispatch]}>
      <div id="double-container" className="flex-row">
        <div id="editor">
          <RegistryTextInput />
          <RegistryFileInput />
        </div>
        <div id="output">
          <h1>Output</h1>
          <ErrorText error={state.error} />
          <RegistryTreeView state={state} />
        </div>
        <div
          id="context-menu-wrapper"
          tabIndex="0"
          onBlur={() => dispatch({ type: 'SET_SHOW_CONTEXT', show: false })}
        >
          <ContextMenu
            context={state.context}
            contextType={state.contextType}
          />
        </div>
      </div>
    </ReducerContext.Provider>
  );
};

const ErrorText = ({ error }) =>
{
  function format(error2)
  {
    return `${error2.message}
 ${error2.lineNum} | ${error2.line}`;
  }
  return (
    <pre id="error">
      {error !== undefined && error !== null
        && (console.error(format(error)), format(error))}
    </pre>
  );
};

ErrorText.propTypes = {
  error: instanceOf(Error).isRequired
};

export const RegistryTreeView = ({ state }) => (
  <div id="registry-tree">
    <ul id="root-path">
      {
        state.tree !== undefined && state.tree !== null
          ? Object.keys(state.tree).map(
            (name, i) => (
              <RegKey
                key={i}
                name={name}
                content={state.tree[name]}
              />
            )
          )
          : undefined
        }
    </ul>
  </div>
);

RegistryTreeView.propTypes = {
  state: objectOf(any).isRequired
};

export default App;

/* $("#output").height(
  $("#output").height()
); // Lock height so that collapsing doesn't scroll the page */