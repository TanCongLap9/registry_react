import { createContext } from "react";
import $ from "jquery";
import { interpretRegistry } from "./registry_algos";

export const ReducerContext = createContext();

/**
 * Sets the state based on the `action` property of the passed object.
 *
 * Use the `dispatch` function returned from the `React.useReducer`,
 * don't call this directly.
 * @param {object} oldState The old state
 * @param {object} action Contains properties specified by `type` property
 * @param {'SET_CONTENT' | 'SET_CONTEXT' |
 *         'SET_SHOW_CONTEXT' | 'SET_ERROR'} action.type
 * @return {object} The new state
 */
export function contentReducer(oldState, action) {
  switch (action.type) {
    case "SET_CONTENT":
      try {
        return {
          ...oldState,
          content: action.content,
          tree: interpretRegistry(action.content),
          error: null,
        };
      } catch (e) {
        return { ...oldState, tree: null, error: e };
      }
    case "SET_CONTEXT":
      if (action.show) {
        $("#context-menu-wrapper")
          .slideDown("fast")
          .offset({
            left: $(action.context).offset().left,
            top: $(action.context).offset().top + 20,
          })
          .focus();
      } else {
        $("#context-menu-wrapper").fadeOut("fast");
      }
      return {
        ...oldState,
        context: action.context,
        contextType: action.contextType,
        show: action.show,
      };
    case "SET_SHOW_CONTEXT":
      if (action.show) {
        $("#context-menu-wrapper")
          .slideDown("fast")
          .offset({
            left: $(action.context).offset().left,
            top: $(action.context).offset().top + 20,
          })
          .focus();
      } else {
        $("#context-menu-wrapper").fadeOut("fast");
      }
      return { ...oldState, show: action.show };
    case "SET_ERROR":
      return { ...oldState, error: action.error };
    default:
      return oldState;
  }
}
