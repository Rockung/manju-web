export async function get_file(file) {
  const res = await fetch(file);
  const text = await res.text();

  return text;
}
