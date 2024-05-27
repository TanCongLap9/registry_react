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

export const ContextMenu = ({ context, contextType }) =>
{
  const [value, setValue] = useState([]);
  useEffect(() =>
  {
    const a = [
      [
        'Copy path', () =>
        {
          const self = $(context);
          const keyParents = self.parents('.key');
          navigator.clipboard.writeText(
            keyParents.children('.key-name')
              .toArray().map((elem) => elem.innerText).reverse()
              .join('\\')
          );
        }
      ]
    ];
    switch (contextType)
    {
      case 'key-name':
        setValue(a);
        break;
      case 'data-name':
        setValue(a);
        break;
      case 'data-type':
        break;
      case 'data-value':
        setValue(a);
        break;
      default:
        setValue([]);
    }
  }, [context, contextType]);
  return (
    <ul className="context-menu flex-col">
      {value.map(([name, callback], i) => (
        <ContextMenuItem key={i} name={name} callback={callback} />
      ))}
    </ul>
  );
};

ContextMenu.propTypes = {
  context: PropTypes.objectOf(PropTypes.any).isRequired,
  contextType: PropTypes.string.isRequired
};
