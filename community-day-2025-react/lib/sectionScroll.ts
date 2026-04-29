/** Inline script injected before paint to match legacy `index.html` hash restore / scroll behavior. */
export const INITIAL_HASH_RESTORE_SCRIPT = `
(function() {
  var restorableHashes = {
    "#home": true,
    "#werner-vogels-keynote": true,
    "#speakers": true,
    "#agenda": true,
    "#event-archive": true,
    "#com_info": true,
    "#venues": true,
    "#workshop": true,
    "#sponsors": true,
    "#volunteers": true,
    "#subscribe": true
  };
  var hash = window.location.hash;
  var shouldRestore = !!restorableHashes[hash];

  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  window.__initialSectionRestore = {
    hash: hash,
    shouldRestore: shouldRestore,
    completed: false
  };

  if (shouldRestore) {
    document.documentElement.classList.add("is-restoring-section");
  }
})();
`;
