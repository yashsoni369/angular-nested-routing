// Use a jQuery-style ready handler when available,
// with a safe fallback that still runs in non-jQuery environments.
(function(factory) {
  if (typeof window !== 'undefined' && window.jQuery) {
    window.jQuery(factory);
  } else if (typeof $ === 'function') {
    $(factory);
  } else {
    factory();
  }
})(function() {
  console.log('Hello, World! (via jQuery-style ready handler)');
});
