// Auto-refresh the page if accessed via back/forward cache
window.addEventListener("pageshow", function (event) {
  if (
    event.persisted ||
    (window.performance && window.performance.navigation.type === 2)
  ) {
    // Page was restored from bfcache (like back button)
    window.location.reload(); // Force reload
  }
});
