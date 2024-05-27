import React, { useEffect, useReducer } from 'react';
import { instanceOf } from 'prop-types';
import { EditorView, basicSetup } from 'codemirror';
import { ViewPlugin } from '@codemirror/view';
import REGISTRY_DATA_SAMPLE from './registry_data_sample';
import { ContextMenu } from './registry_context_menu';
import { RegKey } from './registry_output';
import { ReducerContext, contentReducer } from './registry_reducer';

let /** @type {EditorView} */ editor;

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
    contextType: '',
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
        basicSetup,
        // Listens to changes
        ViewPlugin.fromClass(class
        {
          /* eslint-disable no-useless-constructor, no-empty-function,
             no-unused-vars */
          constructor(/** @type {EditorView} */ view)
          {

          }
          /* eslint-enable no-useless-constructor, no-empty-function,
             no-unused-vars */

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
          <ErrorText>{state.error}</ErrorText>
          <RegistryTreeView>{state.tree}</RegistryTreeView>
        </div>
        <div
          id="context-menu-wrapper"
          tabIndex="0"
          onBlur={() => dispatch({
            type: 'SET_SHOW_CONTEXT',
            show: false
          })}
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

const ErrorText = ({ children } = { children: null }) =>
{
  function format(error)
  {
    return `${error.message}
 ${error.lineNum} | ${error.line}`;
  }
  return (
    <pre id="error">
      {children !== undefined && children !== null
        && (console.error(format(children)), format(children))}
    </pre>
  );
};

ErrorText.propTypes = {
  children: instanceOf(Error)
};

export const RegistryTreeView = ({ children }) => (
  <div id="registry-tree">
    <ul id="root-path">
      {children !== undefined && children !== null
        ? Object.keys(children).map(
          (name) => (
            <RegKey
              key={`rk-${name}`}
              name={name}
              content={children[name]}
            />
          )
        )
        : undefined}
    </ul>
  </div>
);

RegistryTreeView.propTypes = {
  children: instanceOf(Object)
};

export default App;

/* $("#output").height(
  $("#output").height()
); // Lock height so that collapsing doesn't scroll the page */