import { createContext } from 'react';
import $ from 'jquery';
import { interpretRegistry } from './registry_algos';

/** @enum {string} */
export const ReducerActionType = {
  SET_CONTENT: 'SET_CONTENT',
  SET_CONTEXT: 'SET_CONTEXT',
  SET_SHOW_CONTEXT: 'SET_SHOW_CONTEXT',
  SET_ERROR: 'SET_ERROR'
};

export const ReducerContext = createContext();

/**
 * Sets the state based on the `action` property of the passed object.
 *
 * Use the `dispatch` function returned from the `React.useReducer`,
 * don't call this directly.
 * @param {object} oldState The old state
 * @param {ReducerActionType} action Action type, which can be
 * @return {object} The new state
 */
export function contentReducer(oldState, action)
{
  switch (action.type)
  {
    case ReducerActionType.SET_CONTENT:
      try
      {
        return {
          ...oldState,
          content: action.content,
          tree: interpretRegistry(action.content),
          error: null
        };
      }
      catch (e)
      {
        return { ...oldState, tree: null, error: e };
      }
    case ReducerActionType.SET_CONTEXT:
      if (action.show)
      {
        $('#context-menu-wrapper')
          .slideDown('fast')
          .offset(
            {
              left: $(action.context).offset().left,
              top: $(action.context).offset().top + 20
            }
          )
          .focus();
      }
      else
      {
        $('#context-menu-wrapper').fadeOut('fast');
      }
      return {
        ...oldState,
        context: action.context,
        contextType: action.contextType,
        show: action.show
      };
    case ReducerActionType.SET_SHOW_CONTEXT:
      if (action.show)
      {
        $('#context-menu-wrapper')
          .slideDown('fast')
          .offset(
            {
              left: $(action.context).offset().left,
              top: $(action.context).offset().top + 20
            }
          )
          .focus();
      }
      else
      {
        $('#context-menu-wrapper').fadeOut('fast');
      }
      return { ...oldState, show: action.show };
    case ReducerActionType.SET_ERROR:
      return { ...oldState, error: action.error };
    default:
      return oldState;
  }
}
