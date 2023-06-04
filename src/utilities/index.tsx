const callbacks: (() => void)[] = [];

export function init_once(callback: () => void) {
  const first_callback = callbacks.length === 0;
  callbacks.push(callback);
  if (first_callback) callback();
}
