export default dig;

/**
 * A dig function that takes any object with a nested structure and a path,
 * and returns the value under that path or undefined when no value is found.
 *
 * @param {any}     source - A nested objects.
 * @param {string}  path - A path string, for example `my[1].test.field`
 * @param {boolean} [shouldThrow=false] - Optionally throw an exception when nothing found
 *
 */
function dig(source: any, path: string, shouldThrow: boolean = false) {
  if (source === null || source === undefined) {
    return undefined;
  }

  // split path: "param[3].test" => ["param", 3, "test"]
  const parts = splitPath(path);

  return parts.reduce((acc, el) => {
    if (acc === undefined) {
      if (shouldThrow) {
        throw new Error(`Could not dig the value using path: ${path}`);
      } else {
        return undefined;
      }
    }

    if (isNum(el)) {
      // array getter [3]
      const arrIndex = parseInt(el);
      if (acc instanceof Set) {
        return Array.from(acc)[arrIndex];
      } else {
        return acc[arrIndex];
      }
    } else {
      // object getter
      if (acc instanceof Map) {
        return acc.get(el);
      } else {
        return acc[el];
      }
    }
  }, source);
}

const ALL_DIGITS_REGEX = /^\d+$/;

function isNum(str: string) {
  return str.match(ALL_DIGITS_REGEX);
}

const PATH_SPLIT_REGEX = /\.|\]|\[/;

function splitPath(str: string) {
  return (
    str
      .split(PATH_SPLIT_REGEX)
      // remove empty strings
      .filter((x) => !!x)
  );
}