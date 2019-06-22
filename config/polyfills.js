const raf = (global.requestAnimationFrame = cb => {
  setTimeout(cb, 0);
});

module.exports = raf;
