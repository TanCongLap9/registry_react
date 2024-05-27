import { str2bigInt } from 'BigInt';

/** @enum {string} */
export const RegistryValueType = {
  STRING: 'REG_SZ',
  DWORD: 'REG_DWORD', // Int32
  QWORD: 'REG_QWORD', // Int64
  EXPANDABLE_STRING: 'REG_EXPAND_SZ',
  MULTI_LINE_STRING: 'REG_MULTI_SZ',
  BINARY: 'REG_BINARY',
  NONE: 'REG_NONE'
};

function toBytes(hex)
{
  return new Uint8Array(
    hex.split(',')
      .map((byte) => parseInt(byte, 16))
  );
}
export function analyzeDataValue(rawValue, lines, lineNumber, skipRef)
{
  /* eslint-disable no-nested-ternary, indent */
  let [value, type] = /^".*?"/.test(rawValue)
  ? [rawValue.slice(1, -1), RegistryValueType.STRING]
  : rawValue.startsWith('dword:')
  ? [rawValue.slice(6), RegistryValueType.DWORD]
  : rawValue.startsWith('hex(b):')
  ? [rawValue.slice(7), RegistryValueType.QWORD]
  : rawValue.startsWith('hex(2):')
  ? [rawValue.slice(7), RegistryValueType.EXPANDABLE_STRING]
  : rawValue.startsWith('hex(7):')
  ? [rawValue.slice(7), RegistryValueType.MULTI_LINE_STRING]
  : rawValue.startsWith('hex:')
  ? [rawValue.slice(4), RegistryValueType.BINARY]
  : rawValue === 'hex(0):'
  ? [null, RegistryValueType.NONE]
  : [];
  /* eslint-enable no-nested-ternary, indent */
  if (!type) throw new TypeError(`Unknown value type: ${value}`);
  // Concatenate line-continuation strings
  let lineOffset = 0;
  if (value !== undefined && value !== null)
  {
    value = value.replace(/\\$/, '');
  }
  let line2 = lines[lineNumber + lineOffset];
  while (line2[line2.length - 1] === '\\') 
  {
    value += lines[lineNumber + ++lineOffset].replace(/\\$/, '');
    line2 = lines[lineNumber + lineOffset];
  }
  skipRef.current = lineOffset;
  // Process value by type
  let bytes;
  let td;
  switch (type)
  {
    case 'REG_BINARY':
      value = toBytes(value);
      break;
    case 'REG_EXPAND_SZ':
    case 'REG_MULTI_SZ':
      bytes = toBytes(value);
      // REG_MULTI_SZ value is encoded in UTF-16LE
      td = new TextDecoder('utf-16le');
      value = td.decode(bytes)
        .replace(/\0/g, '\n')
        .replace(/\n$/, ''); // Strip null-terminator char
      break;
    case 'REG_DWORD':
      value = str2bigInt(value, 16);
      break;
    case 'REG_QWORD':
      value = str2bigInt(value.split(',').reverse().join(''), 16);
      break;
    default:
      break;
  }
  return { value, type };
}
export const createKey = (path, constructed) =>
{
  let currentObj = constructed;
  path.split('\\').forEach((name) =>
  {
    if (currentObj[name] === undefined || currentObj[name] === null)
    {
      currentObj[name] = {};
    }
    currentObj = currentObj[name];
  });
  return currentObj;
};

export function interpretRegistry(content)
{
  let firstLine = true;
  let has500 = false;
  let match;
  let /** @type {'key' | 'data' | ''} */ currentType = '';
  let currentKeyObj = {};
  let lineNumDisplay = 0;
  const lines = content.split('\n').map((line) => line.trim());
  const skip = { current: 0 };
  const constructed = {};
  let line = '';
  let lineNumber = 0;
  try
  {
    for (let i = 0; i < lines.length; i++)
    {
      [line, lineNumber] = [lines[i], i];
      lineNumDisplay = lineNumber + 1;
      if (firstLine) has500 = line === 'Windows Registry Editor Version 5.00';
      if (!firstLine)
      {
        if (skip.current)
        {
          skip.current--;
          continue;
        }
        if (!has500)
        {
          throw new Error(
            "Missing version declaration 'Windows Registry Editor Version 5.00'"
          );
        }
        if (match = line.match(/^\[(.+?)\]$/))
        { // Key
          const name = match[1];
          if (currentType === 'key')
          {
            throw new Error(`Only 1 key per entry: ${name}`);
          }
          currentType = 'key';
          currentKeyObj = createKey(name, constructed);
        }
        else if (line.trim() === '')
        { // Blank line
          currentType = '';
        }
        else if (match = line.match(/^(\".+?\"|@)=(.+?)$/))
        { // Value
          let name;
          let type;
          let value;
          [name, value] = [match[1], match[2]];
          currentType = 'data';

          if (name === '@'); // Default value
          else if (name.match(/".+?"/))
          { // Named value
            name = name.slice(1, -1);
          }
          else
          {
            throw new SyntaxError(`Invalid data name: ${name}`);
          }

          ({ value, type } = analyzeDataValue(value, lines, lineNumber, skip));
          if (currentKeyObj.__data__ === undefined
            || currentKeyObj.__data__ === null)
          {
            currentKeyObj.__data__ = [];
          }
          currentKeyObj.__data__.push({ name, value, type });
        }
        else
        {
          throw new SyntaxError('Invalid syntax.');
        }
      }
      if (line.trim() !== '') firstLine = false;
    }
    console.log(constructed);
    return constructed;
  }
  catch (e)
  {
    e.lineNum = lineNumDisplay;
    e.line = line;
    throw e;
  }
}

/* $("#output").height(
      $("#output").height()
    ); // Lock height so that collapsing doesn't scroll the page */

/* $("#registry-tree").html(`<div class="error"><p>${e.message} at line ${lineNum}</p></div>`);
$("#error").html(`<p>${line2}</p>`).css("top", `${lineNum * 12}pt`); */
