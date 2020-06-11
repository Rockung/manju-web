/* eslint-disable no-undef */

export async function get_file(file) {
  const res = await fetch(file);
  const text = await res.text();

  return text;
}

export async function get_json(file) {
  const res = await fetch(file);
  const json = await res.json();

  return json;
}
