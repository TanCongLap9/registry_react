import React, { useEffect, useState, useContext } from 'react';
import $ from 'jquery';
import { any, instanceOf, string } from 'prop-types';
import { bigInt2str } from 'BigInt';
import { RegistryValueType } from './registry_algos';
import { ReducerContext } from './registry_reducer';

export const RegKey = ({ name, content }) =>
{
  const [state, dispatch] = useContext(ReducerContext);
  const handleClick = (e) =>
  {
    dispatch({
      type: 'SET_CONTEXT',
      context: $(e.target),
      contextType: e.target.className,
      show: true
    });
  };
  const toggleKeyContent = (e) =>
  {
    e.stopPropagation();
    const self = $(e.target);
    const parent = self.parent();
    parent
      .toggleClass('key-collapsed')
      .children('.key-icon').text(
        parent.hasClass('key-collapsed')
          ? '\u{1f4c1}'
          : '\u{1f4c2}'
      ).end()
      .children('.key-items')
      .slideToggle('fast');
  };
  return (
    <li className="key">
      <span className="key-rule" />
      <span className="key-icon" onClick={toggleKeyContent}>&#x01f4c2;</span>
      <span className="key-name" onClick={handleClick}>{name}</span>
      <ul className="key-items">
        {
          Object.keys(content).map(
            (contentName) => (
              contentName === '__data__'
                ? (
                  <RegDataList
                    key={`rdl-${name}`}
                    values={content[contentName]}
                  />
                )
                : (
                  <RegKey
                    key={`rk-${contentName}`}
                    name={contentName}
                    content={content[contentName]}
                  />
                )
            )
          )
        }
      </ul>
    </li>
  );
};

RegKey.propTypes = {
  name: string.isRequired,
  content: instanceOf(Object).isRequired
};

export const RegDataList = ({ values }) => (
  <li>
    <table className="data-list">
      <colgroup>
        <col className="name-col" />
        <col className="type-col" />
        <col className="value-col" />
      </colgroup>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {values.map((data) => (
          <RegData
            key={`kd-${data.name}`}
            name={data.name}
            type={data.type}
            value={data.value}
          />
        ))}
      </tbody>
    </table>
  </li>
);

RegDataList.propTypes = {
  values: instanceOf(Array).isRequired
};

export const RegData = ({ name, type, value }) =>
{
  const [displayValue, setDisplayValue] = useState();
  const [state, dispatch] = useContext(ReducerContext);
  function handleClick(e)
  {
    dispatch({
      type: 'SET_CONTEXT',
      context: $(e.target),
      contextType: e.target.className,
      show: true
    });
  }
  useEffect(() =>
  {
    switch (type)
    {
      case RegistryValueType.BINARY:
        setDisplayValue(Array.from(value)
          .map((v) => v.toString(16).padStart(2, '0')).join(' '));
        break;
      case RegistryValueType.DWORD:
      case RegistryValueType.QWORD:
        setDisplayValue(bigInt2str(value, 10));
        break;
      default:
        setDisplayValue(value.toString());
        break;
    }
  }, [value, type]);
  return (
    <tr className="data">
      <td className="data-name" onClick={handleClick}>{name}</td>
      <td className="data-type" onClick={handleClick}>{type}</td>
      <td className="data-value" onClick={handleClick}>{displayValue}</td>
    </tr>
  );
};

RegData.propTypes = {
  name: string.isRequired,
  type: string.isRequired,
  value: any.isRequired
};
