import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

export const ContextMenuItem = ({ name, callback }) => (
  <li>
    <button
      type="button"
      className="context-menuitem"
      onClick={callback}
    >
      {name}
    </button>
  </li>
);

ContextMenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired
};

export const ContextMenu = (
  { context, contextType } = { context: null, contextType: '' }
) =>
{
  const [value, setValue] = useState([]);
  useEffect(() =>
  {
    const menuItems = [{
      name: 'copy-path',
      display: 'Copy path',
      callback: () =>
      {
        const self = $(context);
        const keyParents = self.parents('.key');
        navigator.clipboard.writeText(
          keyParents.children('.key-name')
            .toArray().map((elem) => elem.innerText).reverse()
            .join('\\')
        );
      }
    }];
    switch (contextType)
    {
      case 'key-name':
        setValue(menuItems);
        break;
      case 'data-name':
        setValue(menuItems);
        break;
      case 'data-type':
        setValue([]);
        break;
      case 'data-value':
        setValue(menuItems);
        break;
      default:
        setValue([]);
    }
  }, [contextType]);
  return value.length !== 0 && (
    <ul className="context-menu flex-col">
      {value.map((menuItem) => (
        <ContextMenuItem
          key={`ctx-${menuItem.name}`}
          name={menuItem.display}
          callback={menuItem.callback}
        />
      ))}
    </ul>
  );
};

ContextMenu.propTypes = {
  context: PropTypes.instanceOf($),
  contextType: PropTypes.string
};
