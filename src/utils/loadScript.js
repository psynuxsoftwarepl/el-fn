// utils/loadScript.js

const scriptCache = new Map();

export function loadScript(src, attrs = {}) {
  if (scriptCache.has(src)) {
    return scriptCache.get(src);
  }

  const existingScript = document.querySelector(`script[src="${src}"]`);
  if (existingScript) {
    return Promise.resolve(true);
  }

  const promise = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    // Set optional attributes like async, defer, integrity, etc.
    for (const key in attrs) {
      if (Object.prototype.hasOwnProperty.call(attrs, key)) {
        script.setAttribute(key, attrs[key]);
      }
    }

    script.onload = () => resolve(true);
    script.onerror = () => {
      scriptCache.delete(src); // Remove from cache if it fails
      resolve(false); // Or reject(new Error("...")) if you want
    };

    document.body.appendChild(script);
  });

  scriptCache.set(src, promise);
  return promise;
}
