/**
 * getURLSearchParams returns an array with the URI and URLSearchParams of the current location.
 * @returns {[string, URLSearchParams]} An array with the URI and URLSearchParams of the current location.
 */
export function getURLSearchParams(): [string, URLSearchParams] {
  const [uri, params] = window.location.href.split("?");
  return [uri, new URLSearchParams(params)];
}
